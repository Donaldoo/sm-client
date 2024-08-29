import { httpClient } from '@/core/api/httpClient'

export interface LoginRequest {
  email: string
  password: string
}

export interface UserData {
  userId: string
  firstName: string
  lastName: string
  profilePicture: string
}

export interface LoginResponse {
  token: string
  user: UserData
}

export default async function postLogin(
  data: LoginRequest
): Promise<LoginResponse> {
  return await httpClient.post('auth', data)
}
