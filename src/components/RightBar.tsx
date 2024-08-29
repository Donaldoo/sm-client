'use client'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import getSuggestedUsers from '@/core/api/user/getSuggestedUsers'
import { useRouter } from 'next/navigation'
import { follow } from '@/core/api/posts/follow'
import { useState } from 'react'

const RightBar = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['suggestedUsers'],
    queryFn: () => getSuggestedUsers()
  })

  const router = useRouter()
  const queryClient = useQueryClient()

  const handleFollow = useMutation({
    mutationFn: (userId: string) => follow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['suggestedUsers'])
      queryClient.invalidateQueries(['posts'])
    }
  })

  const [dismissedUsers, setDismissedUsers] = useState<string[]>([])
  const handleDismiss = (userId: string) => {
    setDismissedUsers(prev => [...prev, userId])
  }
  const filteredUsers =
    data && data.filter(user => !dismissedUsers.includes(user.id as string))

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
                <img
                  className='h-10 w-10 rounded-full object-cover'
                  src={user.profilePicture}
                  alt=''
                />
                <span>{user.displayName}</span>
              </div>
              <div className='flex items-center gap-[10px]'>
                <button
                  onClick={() => handleFollow.mutate(user.id)}
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
          <div className='my-5 flex items-center justify-between'>
            <div className='relative flex items-center gap-5'>
              <img
                className='h-10 w-10 rounded-full object-cover'
                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                alt=''
              />
              <div className='absolute left-[30px] top-0 h-3 w-3 rounded-full bg-green-400' />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className='my-5 flex items-center justify-between'>
            <div className='relative flex items-center gap-5'>
              <img
                className='h-10 w-10 rounded-full object-cover'
                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                alt=''
              />
              <div className='absolute left-[30px] top-0 h-3 w-3 rounded-full bg-green-400' />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className='my-5 flex items-center justify-between'>
            <div className='relative flex items-center gap-5'>
              <img
                className='h-10 w-10 rounded-full object-cover'
                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                alt=''
              />
              <div className='absolute left-[30px] top-0 h-3 w-3 rounded-full bg-green-400' />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className='my-5 flex items-center justify-between'>
            <div className='relative flex items-center gap-5'>
              <img
                className='h-10 w-10 rounded-full object-cover'
                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                alt=''
              />
              <div className='absolute left-[30px] top-0 h-3 w-3 rounded-full bg-green-400' />
              <span>Jane Doe</span>
            </div>
          </div>
          <div className='my-5 flex items-center justify-between'>
            <div className='relative flex items-center gap-5'>
              <img
                className='h-10 w-10 rounded-full object-cover'
                src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
                alt=''
              />
              <div className='absolute left-[30px] top-0 h-3 w-3 rounded-full bg-green-400' />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightBar
