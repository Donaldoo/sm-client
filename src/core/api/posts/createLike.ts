import { httpClient } from '@/core/api/httpClient'

export function createLike(postId: string) {
  return httpClient.post(`posts/like?PostId=${postId}`)
}
