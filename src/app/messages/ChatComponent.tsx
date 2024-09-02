'use client'

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { FormEvent, useEffect, useRef, useState } from 'react'
import useUserStore from '@/core/stores/store'
import { Button } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useQuery, useQueryClient } from 'react-query'
import getUserById from '@/core/api/user/getUserById'

const ChatComponent = ({
  chatId,
  targetUserId
}: {
  chatId: string
  targetUserId: string
}) => {
  const [connection, setConnection] = useState<HubConnection>()
  const [messages, setMessages] = useState<
    { senderId: string; content: string; sentAt: string }[]
  >([])
  const { user } = useUserStore()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const { data: targetUser } = useQuery({
    queryKey: ['targetUser', targetUserId],
    queryFn: () => getUserById(targetUserId),
    enabled: !!targetUserId
  })

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5031/chathub', {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build()

    setConnection(newConnection)
  }, [])

  const queryClient = useQueryClient()

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(async () => {
          console.log('Connected!')

          await connection.send('JoinChat', chatId)

          await connection.send('GetChatHistory', chatId)

          connection.on(
            'ReceiveMessage',
            (message: {
              senderId: string
              content: string
              sentAt: string
            }) => {
              if (message.senderId !== user?.userId) {
                const audio = new Audio('/notification.mp3')
                audio.play()
              }
              queryClient.invalidateQueries(['chats'])
              setMessages(prevMessages => [...prevMessages, message])
            }
          )

          connection.on(
            'ReceiveChatHistory',
            (
              chatMessages: {
                senderId: string
                content: string
                sentAt: string
              }[]
            ) => {
              console.log('Received Chat History:', chatMessages)
              setMessages(chatMessages)
            }
          )
        })
        .catch(e => console.log('Connection failed: ', e))
    }
  }, [connection, chatId])

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    if (connection && message) {
      await connection.send('SendMessage', chatId, user?.userId, message)
      setMessage('')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage()
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='no-scrollbar flex h-full max-h-[75vh] w-3/5 flex-col justify-between overflow-scroll'>
      <div className='mb-5 flex items-center justify-between border-b border-gray-300 p-3'>
        <span className='text-2xl font-medium'>
          {targetUser?.firstName} {targetUser?.lastName}
        </span>
        <MoreVertIcon className='h-10 w-10' />
      </div>
      <div className='mt-10 flex flex-col items-center justify-between space-y-10 bg-white px-10 py-6'>
        <div className='no-scrollbar flex w-full flex-col gap-5 overflow-scroll'>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.senderId === user?.userId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`space-y-2 rounded-lg py-1 pl-2 pr-5 text-xl ${
                  m.senderId === user?.userId
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                <div>{m.content}</div>
                <div className='text-sm'>
                  {new Date(m.sentAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Empty div for scrolling */}
        </div>
        <form onSubmit={handleSubmit} className='flex w-full justify-between'>
          <input
            type='text'
            value={message}
            className='w-full border-t border-gray-300 px-2.5 py-5 outline-0'
            onChange={e => setMessage(e.target.value)}
            placeholder='Type your message...'
          />
          <Button
            className='bg-blue-500 text-white hover:bg-blue-700'
            type='submit'
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ChatComponent
