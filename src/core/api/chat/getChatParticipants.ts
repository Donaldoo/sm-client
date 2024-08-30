import { httpClient } from '@/core/api/httpClient'
import { UserDto } from '@/core/api/user/getSuggestedUsers'

export default function getChatHistory(chatId: string): Promise<UserDto[]> {
  return httpClient.get(`chat/participants?ChatId=${chatId}`)
}
