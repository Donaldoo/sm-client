import { httpClient } from '@/core/api/httpClient'
import { UserDto } from '@/core/api/user/getSuggestedUsers'

export default function getUserFollowers(): Promise<UserDto[]> {
  return httpClient.get(`user/followers`)
}
