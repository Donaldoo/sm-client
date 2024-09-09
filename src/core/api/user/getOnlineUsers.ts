import { httpClient } from '@/core/api/httpClient'
import { UserDto } from '@/core/api/user/getSuggestedUsers'

export default function getOnlineUsers(): Promise<UserDto[]> {
  return httpClient.get(`users/online`)
}
