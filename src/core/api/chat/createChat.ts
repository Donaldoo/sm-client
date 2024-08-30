import { httpClient } from '@/core/api/httpClient'

export function createChat(userId: string) {
  return httpClient.post(`chat?UserId=${userId}`)
}
