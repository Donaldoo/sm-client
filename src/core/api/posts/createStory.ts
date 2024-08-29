import { httpClient } from '@/core/api/httpClient'

export function createStory(image: string): Promise<string> {
  return httpClient.post(`story/create?image=${image}`)
}
