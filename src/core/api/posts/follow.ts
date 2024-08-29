import { httpClient } from '@/core/api/httpClient'

export function follow(userId: string) {
  return httpClient.post(`follow?userId=${userId}`)
}
