'use client'

import React from 'react'
import { UnreadMessageDto } from '@/core/api/chat/getAllUnreadMessages'
import { useRouter } from 'next/navigation'

const UnreadMessages = ({
  messages,
  setShowMessages
}: {
  messages: UnreadMessageDto[]
  setShowMessages: (arg: boolean) => void
}) => {
  const router = useRouter()
  return (
    <div className='fixed right-[50px] top-[55px] flex max-h-96 w-[400px] flex-col gap-4 overflow-auto rounded-b-2xl bg-gray-100 p-4 shadow-md'>
      <div className='flex w-full items-center justify-between'>
        <p className='pb-1.5 text-sm font-bold'>New messages</p>
        <button
          className='w-1/4 rounded-md bg-blue-500 px-3 py-1 text-white'
          onClick={() => {
            router.push('/messages')
            setShowMessages(false)
          }}
        >
          View all
        </button>
      </div>
      {messages && messages.length ? (
        messages?.map(message => (
          <div
            onClick={() => {
              setShowMessages(false)
              router.push(`/messages?userId=${message.senderId}`)
            }}
            key={message.id}
            className='flex cursor-pointer flex-row items-center rounded-2xl border-b border-gray-200 bg-gray-50 p-2'
          >
            <img
              src={message.senderProfilePicture}
              className='rounded-full object-cover sm:h-10 sm:w-10'
            />
            <div className='flex w-full items-center justify-between px-2.5'>
              <div>
                <p className='text-lg font-semibold text-gray-900'>
                  {message.senderDisplayName}
                </p>
                <p className='text-sm font-semibold text-gray-700'>
                  {message.content}
                </p>
              </div>
              <p className='flex h-8 w-8 items-center justify-center rounded-full bg-red-500 p-2 text-sm font-semibold text-white'>
                {message.unreadMessageCount}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div>No unread messages.</div>
      )}
    </div>
  )
}

export default UnreadMessages
