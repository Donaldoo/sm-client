import { httpClient } from '@/core/api/httpClient'

export interface CreatePostRequest {
  image: string
  description: string
  category: PostCategory
}

export enum PostCategory {
  Work = 1,
  Entertainment
}

export function createPost(req: CreatePostRequest): Promise<string> {
  return httpClient.post('posts', req)
}
