import { httpClient } from '@/core/api/httpClient'

export interface UserDto {
  id: string
  displayName: string
  profilePicture: string
}

export default function getSuggestedUsers(): Promise<UserDto[]> {
  return httpClient.get('user/suggested')
}
