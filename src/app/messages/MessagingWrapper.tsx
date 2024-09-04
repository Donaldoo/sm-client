'use client'

import { useState, useEffect, useRef } from 'react'
import ChatComponent from './ChatComponent'
import useUserStore from '@/core/stores/store'
import { useMutation } from 'react-query'
import { createChat } from '@/core/api/chat/createChat'
import { CircularProgress } from '@mui/material'

const MessagingWrapper = ({ targetUserId }: { targetUserId: string }) => {
  const [chatId, setChatId] = useState<string | null>(null)

  const getOrCreateChat = useMutation({
    mutationFn: (userId: string) => createChat(userId),
    onSuccess: (res: string) => setChatId(res)
  })

  useEffect(() => {
    getOrCreateChat.mutate(targetUserId)
  }, [targetUserId])

  if (!chatId) {
    return <CircularProgress />
  }

  return <ChatComponent chatId={chatId} targetUserId={targetUserId} />
}

export default MessagingWrapper
