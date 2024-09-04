import create from 'zustand'
import { persist } from 'zustand/middleware'

interface Message {
  senderId: string
  content: string
  sentAt: string
  isRead: boolean
}

interface MessageStore {
  messages: Message[]
  addMessage: (message: Message) => void
}

const useMessageStore = create<MessageStore>()(
  persist(
    set => ({
      messages: [],
      addMessage: message =>
        set(state => ({ messages: [...state.messages, message] }))
    }),
    {
      name: 'user'
    }
  )
)
export default useMessageStore
