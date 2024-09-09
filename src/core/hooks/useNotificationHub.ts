import { useEffect, useRef } from 'react'
import * as signalR from '@microsoft/signalr'
import { toast } from 'sonner'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/navigation'

const useNotificationHub = (userId: string, token: string | null) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const connectionRef = useRef<signalR.HubConnection | null>(null)

  useEffect(() => {
    if (!token) {
      if (connectionRef.current) {
        connectionRef.current.stop().then(() => {
          console.log('SignalR connection stopped')
          connectionRef.current = null
        })
      }
      return
    }

    if (!connectionRef.current) {
      const connection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5031/notificationHub', {
          transport: signalR.HttpTransportType.WebSockets,
          accessTokenFactory: () => token ?? '',
          withCredentials: true
        })
        .withAutomaticReconnect()
        .build()

      connection
        .start()
        .then(() => console.log('Connected to NotificationHub'))
        .catch(err => console.error('SignalR connection error: ', err))

      connection.on('UserStatusChanged', (userId, isOnline) => {
        queryClient.invalidateQueries(['chats'])
        queryClient.invalidateQueries(['onlineUsers'])
      })

      connection.on('ReceiveNotification', ({ type, message, postId }) => {
        const audio = new Audio('/notification.mp3')
        audio.play()
        type === 'post'
          ? toast.message(message, {
              action: {
                label: 'View post',
                onClick: () => router.push(`/?postId=${postId}`)
              }
            })
          : toast.message(message)
      })

      connectionRef.current = connection
    }

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop()
      }
    }
  }, [userId, token, queryClient, router])

  return null
}

export default useNotificationHub
