import { httpClient } from '@/core/api/httpClient'

export interface Comment {
  commentId: string
  description: string
  createdAt: string
  canBeDeleted: string
  userImage: string
  userName: string
}

export default function getComments(postId: string): Promise<Comment[]> {
  return httpClient.get(`comments?PostId=${postId}`)
}
