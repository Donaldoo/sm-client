import { useEffect, useRef, useState, useCallback } from 'react'
import * as signalR from '@microsoft/signalr'
import { useQueryClient } from 'react-query'

const useChatHub = (userId: string, token: string | null) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [isConnectionReady, setIsConnectionReady] = useState(false)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!token) {
      if (connectionRef.current) {
        connectionRef.current.stop().then(() => {
          console.log('SignalR connection stopped')
          connectionRef.current = null
          setIsConnectionReady(false)
        })
      }
      return
    }

    if (!connectionRef.current) {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl(`http://localhost:5031/chathub`, {
          accessTokenFactory: () => token ?? '',
          transport: signalR.HttpTransportType.WebSockets,
          withCredentials: true
        })
        .withAutomaticReconnect()
        .build()

      connection
        .start()
        .then(() => {
          console.log('Connected to ChatHub')
          connectionRef.current = connection
          setIsConnectionReady(true)
        })
        .catch(err => {
          console.error('SignalR connection error: ', err)
          setIsConnectionReady(false)
        })

      connection.on('ReceiveMessage', data => {
        const { newMessage } = data
        setMessages(prevMessages => [
          ...prevMessages,
          {
            ...newMessage,
            sentAt: new Date(newMessage.sentAt)
          }
        ])
      })

      connection.on('ReceiveChatHistory', chatMessages => {
        const parsedMessages = chatMessages.map((m: any) => ({
          ...m,
          sentAt: new Date(m.sentAt)
        }))
        setMessages(parsedMessages)
      })

      connection.on('ReceiveNotification', message => {
        const audio = new Audio('/notification.mp3')
        audio.play()
        queryClient.invalidateQueries(['unreadMessages'])
        queryClient.invalidateQueries(['chats'])
      })
      connectionRef.current = connection
    }

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop()
        setIsConnectionReady(false)
      }
    }
  }, [token, queryClient, userId])

  const joinChat = useCallback(
    async (chatId: string) => {
      if (
        connectionRef.current &&
        connectionRef.current.state === signalR.HubConnectionState.Connected
      ) {
        try {
          console.log(`Joining chat ${chatId} for user ${userId}`)
          await connectionRef.current.invoke('JoinChat', chatId, userId)
          await connectionRef.current.invoke('GetChatHistory', chatId)

          queryClient.invalidateQueries(['unreadMessages'])
        } catch (error) {
          console.error('Error joining chat:', error)
        }
      } else {
        console.warn(
          'Connection is not in the connected state when joining chat.'
        )
      }
    },
    [queryClient, userId]
  )

  const leaveChat = useCallback(async (chatId: string) => {
    if (
      connectionRef.current &&
      connectionRef.current.state === signalR.HubConnectionState.Connected
    ) {
      try {
        await connectionRef.current.invoke('LeaveChat', chatId)
        console.log(`Left chat ${chatId}`)
      } catch (error) {
        console.error('Error leaving chat:', error)
      }
    }
  }, [])

  const sendMessage = async (
    chatId: string,
    senderId: string,
    messageContent: string
  ) => {
    if (connectionRef.current) {
      await connectionRef.current.invoke(
        'SendMessage',
        chatId,
        senderId,
        messageContent
      )
      queryClient.invalidateQueries(['chats'])
    }
  }

  return {
    messages,
    joinChat,
    leaveChat,
    sendMessage,
    isConnectionReady,
    connection: connectionRef.current
  }
}

export default useChatHub
