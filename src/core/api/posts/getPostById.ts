import { httpClient } from '@/core/api/httpClient'
import { Post } from '@/core/api/posts/getPosts'

export default function getPostById(postId: string): Promise<Post> {
  return httpClient.get(`post?PostId=${postId}`)
}
