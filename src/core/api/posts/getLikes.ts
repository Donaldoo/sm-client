import { httpClient } from '@/core/api/httpClient'

export interface Like {
  likeId: string
  userId: string
  createdAt: string
}

export default function getLikes(postId: string): Promise<Like[]> {
  return httpClient.get(`likes?PostId=${postId}`)
}
