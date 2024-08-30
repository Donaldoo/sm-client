import { httpClient } from '@/core/api/httpClient'

export interface CreateMessageRequest {
  chatId: string
  content: string
}

export interface MessageResponse {
  id: string
  content: string
  sendId: string
  sentAt: string
}

export function createMessage(
  req: CreateMessageRequest
): Promise<MessageResponse> {
  return httpClient.post('chat/message', req)
}
