import { httpClient } from '@/core/api/httpClient'

export interface StoryDto {
  id: string
  image: string
  fullName: string
  createdAt: string
}

export default function getStories(): Promise<StoryDto[]> {
  return httpClient.get(`stories`)
}
