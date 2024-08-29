import { httpClient } from '@/core/api/httpClient'

export interface SignUpRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthenticationInfoResponse {
  userId: string
  name: string
}

export default function postSignUp(
  data: SignUpRequest
): Promise<AuthenticationInfoResponse> {
  return httpClient.post('account/create', data)
}
