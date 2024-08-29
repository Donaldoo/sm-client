import { httpClient } from '@/core/api/httpClient'

export default function deleteLike(postId: string): Promise<boolean> {
  return httpClient.delete(`delete/like?PostId=${postId}`)
}
