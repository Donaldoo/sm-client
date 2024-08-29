import { httpClient } from '@/core/api/httpClient'

export default function deletePost(postId: string): Promise<boolean> {
  return httpClient.delete(`delete/post?PostId=${postId}`)
}
