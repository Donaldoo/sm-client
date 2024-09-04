import { httpClient } from '@/core/api/httpClient'
import { UserDto } from '@/core/api/user/getSuggestedUsers'

export default function searchUsers(search: string): Promise<UserDto[]> {
  return httpClient.get(`search/user?Search=${search}`)
}
