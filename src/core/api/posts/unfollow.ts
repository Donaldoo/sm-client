import { httpClient } from '@/core/api/httpClient'

export function unfollow(userId: string) {
  return httpClient.post(`unfollow?userId=${userId}`)
}
