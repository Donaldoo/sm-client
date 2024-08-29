import { httpClient } from '@/core/api/httpClient'
import { PostCategory } from '@/core/api/posts/createPost'

export interface Post {
  id: string
  description: string
  createdAt: string
  image: string
  userId: string
  fullName: string
  profilePicture: string
}

export interface GetPostsRequest {
  category?: PostCategory
  userId?: string
}

export default function getPosts(req: GetPostsRequest): Promise<Post[]> {
  let query = ''
  if (req.category) query += `?category=${req.category}`
  if (req.userId && req.userId.length) query += `?userId=${req.userId}`
  return httpClient.get('posts' + query)
}
