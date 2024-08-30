import { httpClient } from '@/core/api/httpClient'

export interface MessageDto {
  id: string
  sentAt: string
  content: string
  sendId: string
}

export default function getChatHistory(chatId: string): Promise<MessageDto[]> {
  return httpClient.get(`chat/history?ChatId=${chatId}`)
}
