import { httpClient } from '@/core/api/httpClient'

export interface User {
  id: string
  firstName: string
  lastName: string
  website: string
  city: string
  profilePicture: string
  coverPicture: string
  password: string
  email: string
}

export default function getUserById(userId: string): Promise<User> {
  return httpClient.get(`user?UserId=${userId}`)
}
