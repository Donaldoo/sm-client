'use client'

import { useState, useEffect } from 'react'
import ChatComponent from './ChatComponent'
import useUserStore from '@/core/stores/store'
import { useMutation } from 'react-query'
import { createChat } from '@/core/api/chat/createChat'

const MessagingWrapper = ({ targetUserId }: { targetUserId: string }) => {
  const [chatId, setChatId] = useState<string | null>(null)
  const { user } = useUserStore()

  const getOrCreateChat = useMutation({
    mutationFn: (userId: string) => createChat(userId),
    onSuccess: (res: string) => setChatId(res)
  })

  useEffect(() => {
    getOrCreateChat.mutate(targetUserId)
  }, [targetUserId, user?.userId])

  if (!chatId) {
    return <div>Loading chat...</div>
  }

  return <ChatComponent chatId={chatId} />
}

export default MessagingWrapper
