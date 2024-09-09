import { httpClient } from '@/core/api/httpClient'

export interface User {
  id: string
  firstName: string
  lastName: string
  bio: string
  city: string
  profilePicture: string
  coverPicture: string
  password: string
  email: string
  followingCount: number
  followersCount: number
}

export default function getUserById(userId: string): Promise<User> {
  return httpClient.get(`user?UserId=${userId}`)
}
