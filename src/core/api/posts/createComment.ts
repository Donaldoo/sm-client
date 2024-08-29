import { httpClient } from '@/core/api/httpClient'

export interface CreateCommentRequest {
  postId: string
  description: string
}

export function createComment(req: CreateCommentRequest) {
  return httpClient.post('posts/comment', req)
}
