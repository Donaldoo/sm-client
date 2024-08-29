import { httpClient } from '@/core/api/httpClient'

export interface EditAccountRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  profilePicture: string
  coverPicture: string
  city: string
  website: string
}

export function editAccount(req: EditAccountRequest): Promise<string> {
  return httpClient.post('account/edit', req)
}
