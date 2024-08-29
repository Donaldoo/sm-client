import { httpClient } from '@/core/api/httpClient'

export default function deleteComment(commentId: string): Promise<boolean> {
  return httpClient.delete(`delete/comment?CommentId=${commentId}`)
}
