'use client'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import getSuggestedUsers from '@/core/api/user/getSuggestedUsers'
import { useRouter } from 'next/navigation'
import { follow } from '@/core/api/posts/follow'
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import getOnlineUsers from '@/core/api/user/getOnlineUsers'
import useUserStore from '@/core/stores/store'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

const RightBar = () => {
  const { data } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: () => getSuggestedUsers()
  })

  const router = useRouter()
  const queryClient = useQueryClient()

  const { user } = useUserStore()

  const handleFollow = useMutation({
    mutationFn: (userId: string) => follow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      queryClient.invalidateQueries(['user', user?.userId])
    }
  })

  const [dismissedUsers, setDismissedUsers] = useState<string[]>([])
  const handleDismiss = (userId: string) => {
    setDismissedUsers(prev => [...prev, userId])
  }
  const filteredUsers =
    data && data.filter(user => !dismissedUsers.includes(user.id as string))

  const { data: onlineUsers } = useQuery({
    queryKey: ['onlineUsers'],
    queryFn: () => getOnlineUsers()
  })

  return (
    <div className='sticky hidden h-4/5 w-1/4 sm:flex'>
      <div className='w-full p-5 font-medium text-gray-500'>
        <div className='mb-5 bg-white p-5 shadow-md shadow-gray-300'>
          <span className='font-semibold text-gray-700'>Suggested For You</span>
          {filteredUsers?.map(user => (
            <div
              key={user.id}
              className='my-5 flex items-center justify-between'
            >
              <div
                className='relative flex cursor-pointer items-center gap-2 hover:text-gray-800'
                onClick={() => router.push(`profile?userId=${user.id}`)}
              >
                {user.profilePicture?.length ? (
                  <img
                    className='h-10 w-10 rounded-full object-cover'
                    src={user.profilePicture}
                    alt=''
                  />
                ) : (
                  <PersonIcon className='h-10 w-10 rounded-full bg-gray-200 object-cover' />
                )}
                <span>{user.displayName}</span>
              </div>
              <div className='flex items-center gap-[10px]'>
                <button
                  onClick={() => {
                    handleFollow.mutate(user.id)
                    handleDismiss(user.id)
                  }}
                  className='cursor-pointer rounded-sm bg-blue-500 p-[5px] text-white hover:bg-blue-700'
                >
                  Follow
                </button>
                <button
                  onClick={() => handleDismiss(user.id)}
                  className='cursor-pointer rounded-sm bg-red-500 p-[5px] text-white hover:bg-red-700'
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='no-scrollbar mb-5 overflow-scroll bg-white p-5 shadow-md shadow-gray-300'>
          <span>Online Friends</span>
          {onlineUsers?.length ? (
            onlineUsers?.map(user => (
              <div
                key={user.id}
                className='my-5 flex cursor-pointer items-center justify-between'
              >
                <div className='relative flex items-center gap-5'>
                  {user.profilePicture ? (
                    <img
                      className='h-10 w-10 rounded-full object-cover'
                      src={user.profilePicture}
                      alt=''
                    />
                  ) : (
                    <PersonIcon className='h-10 w-10 rounded-full object-cover' />
                  )}
                  <div className='absolute left-[30px] top-0 h-3 w-3 rounded-full bg-green-400' />
                  <span
                    onClick={() => router.push(`/profile?userId=${user.id}`)}
                  >
                    {user.displayName}
                  </span>
                </div>
                <EmailOutlinedIcon
                  onClick={() => router.push(`/messages?userId=${user.id}`)}
                />
              </div>
            ))
          ) : (
            <div className='my-5 text-sm font-normal text-gray-500'>
              No online friends.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RightBar
