'use client'

import { useEffect, useRef } from 'react'
import * as signalR from '@microsoft/signalr'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const useNotificationHub = (userId: string) => {
  const router = useRouter()
  const tokenRef = useRef('')
  useEffect(() => {
    tokenRef.current = localStorage.getItem('token') ?? ''
  }, [])
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5031/notificationHub', {
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => tokenRef.current ?? '',
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build()

    connection
      .start()
      .then(() => console.log('Connected to SignalR'))
      .catch(err => console.error('SignalR connection error: ', err))

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

    return () => {
      connection.stop()
    }
  }, [userId])
}

export default useNotificationHub
