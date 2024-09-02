import { httpClient } from '@/core/api/httpClient'

export interface ChatDto {
  chatId?: string
  userId: string
  userName: string
  profilePicture: string
  lastMessage: string
  lastMessageSentAt: string
}

export default function getAllChats(search?: string): Promise<ChatDto[]> {
  let query = ''
  if (search?.length) query += `?search=${search}`
  return httpClient.get(`chats` + query)
}
