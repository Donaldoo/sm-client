import { httpClient } from '@/core/api/httpClient'

export default function getUserFollowing(): Promise<string[]> {
  return httpClient.get(`user/following`)
}
