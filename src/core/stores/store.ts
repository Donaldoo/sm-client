import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { UserData } from '@/core/api/auth/postLogin'

interface UserStore {
  user: UserData | null
  setUser: (user: UserData) => void
  messageCount: number
  setMessageCount: (count: number) => void
}

const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: null,
      setUser: (user: UserData) =>
        set(() => ({
          user: user
        })),
      messageCount: 0,
      setMessageCount: (count: number) =>
        set(() => ({
          messageCount: count
        }))
    }),
    {
      name: 'user'
    }
  )
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('User store', useUserStore)
}
export default useUserStore
