import { httpClient } from '@/core/api/httpClient'

export interface EditAccountRequest {
  email: string
  firstName: string
  lastName: string
  password?: string | null
  profilePicture?: string | null
  coverPicture?: string | null
  city?: string | null
  website?: string | null
}

export function editAccount(req: EditAccountRequest): Promise<string> {
  return httpClient.post('account/edit', req)
}
