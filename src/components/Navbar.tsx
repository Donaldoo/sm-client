'use client'

import Link from 'next/link'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ExitToAppIcon from '@mui/icons-material/ExitToAppOutlined'
import useUserStore from '@/core/stores/store'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import getUserById from '@/core/api/user/getUserById'
import PersonIcon from '@mui/icons-material/Person'
import React, { useEffect, useState } from 'react'
import searchUsers from '@/core/api/user/searchUsers'
import SearchResults from '@/components/SearchResults'
import useNotificationHub from '@/core/hooks/useNotificationHub'
import getAllUnreadMessages from '@/core/api/chat/getAllUnreadMessages'
import UnreadMessages from '@/components/UnreadMessages'
import useChatHub from '@/core/hooks/useChatHub'

function Navbar() {
  const router = useRouter()
  const { user, setUser } = useUserStore()

  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token')
    setToken(tokenFromStorage)
  }, [user])

  const handleLogout = () => {
    localStorage.clear()
    document.cookie =
      'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    setUser(null)
    setToken(null)
    router.push('/login')
  }

  const [search, setSearch] = useState('')

  const { data: searchedUser } = useQuery({
    queryKey: ['searchedUser', search],
    queryFn: () => searchUsers(search),
    enabled: !!search
  })

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['user', user?.userId],
    queryFn: () => getUserById(user!.userId),
    enabled: !!user?.userId
  })

  const [showSearch, setShowSearch] = useState(false)
  const [showMessages, setShowMessages] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    setShowSearch(!!value)
  }

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token')
    setToken(tokenFromStorage)
  }, [user])

  useNotificationHub(user?.userId ?? '', token)
  useChatHub(user?.userId ?? '', token)

  const { data: unreadMessages } = useQuery({
    queryKey: ['unreadMessages'],
    queryFn: () => getAllUnreadMessages(user!.userId),
    enabled: !!user?.userId
  })

  const totalUnreadMessages =
    unreadMessages && Array.isArray(unreadMessages)
      ? unreadMessages.reduce(
          (sum, message) => sum + (message.unreadMessageCount || 0),
          0
        )
      : 0

  return (
    !!user?.userId && (
      <div className='sticky top-0 z-[999] flex items-center justify-between border-b bg-white px-5 py-3 shadow-sm shadow-gray-400'>
        <div className='flex items-center gap-8'>
          <Link href='/' style={{ textDecoration: 'none' }}>
            <span className='text-4xl font-bold'>UniLink</span>
          </Link>
          <HomeOutlinedIcon
            fontSize='large'
            className='cursor-pointer'
            onClick={() => router.push('/')}
          />

          <div className='flex w-[300px] flex-col'>
            <div className='flex items-center gap-4 rounded border p-3'>
              <SearchOutlinedIcon />
              <input
                className='outline-0'
                type='text'
                value={search}
                onChange={handleSearchChange}
                placeholder='Search...'
              />
            </div>
            {showSearch && (
              <SearchResults
                setShowSearch={setShowSearch}
                data={searchedUser}
              />
            )}
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='flex items-center gap-3 font-medium'>
            {currentUser?.profilePicture?.length ? (
              <img
                className='h-8 w-8 rounded-full object-cover'
                src={currentUser?.profilePicture}
                alt=''
              />
            ) : (
              <PersonIcon className='h-8 w-8 rounded-full bg-gray-200 object-cover' />
            )}
            <span
              className='cursor-pointer text-xl font-bold'
              onClick={() => router.push(`/profile?userId=${user?.userId}`)}
            >
              {currentUser?.firstName} {currentUser?.lastName}
            </span>
          </div>
          {/*<PersonOutlinedIcon />*/}
          <EmailOutlinedIcon
            onClick={() => setShowMessages(!showMessages)}
            className='cursor-pointer'
          />
          {totalUnreadMessages > 0 && (
            <span className='absolute right-14 top-5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 p-2 text-xs text-white'>
              {totalUnreadMessages}
            </span>
          )}
          {showMessages && (
            <UnreadMessages
              messages={unreadMessages || []}
              setShowMessages={setShowMessages}
            />
          )}
          {/*<NotificationsOutlinedIcon />*/}
          <ExitToAppIcon onClick={handleLogout} className='cursor-pointer' />
        </div>
      </div>
    )
  )
}

export default Navbar
