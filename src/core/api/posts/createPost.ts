import { httpClient } from '@/core/api/httpClient'

export interface CreatePostRequest {
  image: string
  description: string
  category: PostCategory
  workExperience?: WorkExperience
  workIndustry?: WorkIndustry
}

export enum PostCategory {
  Work = 1,
  Entertainment
}

export enum WorkExperience {
  fullTime = 1,
  partTime,
  internship
}

export enum WorkIndustry {
  technology = 1,
  finance,
  marketing,
  healthcare,
  education,
  legal,
  engineering,
  retail,
  hospitality,
  government
}

export function createPost(req: CreatePostRequest): Promise<string> {
  return httpClient.post('posts', req)
}
