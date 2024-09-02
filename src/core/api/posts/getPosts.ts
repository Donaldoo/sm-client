import { httpClient } from '@/core/api/httpClient'
import {
  PostCategory,
  WorkExperience,
  WorkIndustry
} from '@/core/api/posts/createPost'

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
  workExperience?: WorkExperience
  workIndustry?: WorkIndustry
}

export default function getPosts(req: GetPostsRequest): Promise<Post[]> {
  let query = ''
  const params = new URLSearchParams()

  if (req.category) params.append('category', req.category.toString())
  if (req.userId && req.userId.length) params.append('userId', req.userId)
  if (req.workIndustry)
    params.append('workIndustry', req.workIndustry.toString())
  if (req.workExperience)
    params.append('workExperience', req.workExperience.toString())

  query = params.toString()

  return httpClient.get('posts' + (query ? '?' + query : ''))
}
