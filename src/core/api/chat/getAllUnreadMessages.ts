import { httpClient } from '@/core/api/httpClient'

export interface UnreadMessageDto {
  id: string
  sentAt: string
  content: string
  senderId: string
  senderDisplayName: string
  senderProfilePicture: string
  unreadMessageCount: number
}

export default function getAllUnreadMessages(
  userId: string
): Promise<UnreadMessageDto[]> {
  return httpClient.get(`chats/unread-messages?UserId=${userId}`)
}
