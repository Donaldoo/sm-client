import { httpClient } from '@/core/api/httpClient'
import { UserDto } from '@/core/api/user/getSuggestedUsers'

export default function getUserFollowing(): Promise<UserDto[]> {
  return httpClient.get(`user/following`)
}
