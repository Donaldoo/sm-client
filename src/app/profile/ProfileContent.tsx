'use client'

import PlaceIcon from '@mui/icons-material/Place'
import LanguageIcon from '@mui/icons-material/Language'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import getUserById from '@/core/api/user/getUserById'
import useUserStore from '@/core/stores/store'
import { useState } from 'react'
import Update from '@/components/Update'
import { Button } from '@mui/material'
import getPosts from '@/core/api/posts/getPosts'
import Posts from '@/components/Posts'
import PersonIcon from '@mui/icons-material/Person'
import getUserFollowing from '@/core/api/user/getUserFollowing'
import { follow } from '@/core/api/posts/follow'
import { unfollow } from '@/core/api/posts/unfollow'

export default function ProfileContent({ userId }: { userId: string }) {
  const [openUpdate, setOpenUpdate] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId
  })

  const { user } = useUserStore()
  const queryClient = useQueryClient()

  const { data: followingData } = useQuery({
    queryKey: ['followingData'],
    queryFn: () => getUserFollowing(),
    enabled: !!userId
  })

  const isFollowing = followingData?.some(following => following === userId)

  const handleFollow = useMutation({
    mutationFn: (userId: string) =>
      isFollowing ? unfollow(userId) : follow(userId),
    onSuccess: () => {
      queryClient.invalidateQueries(['followingData'])
      queryClient.invalidateQueries(['suggestedUsers'])
    }
  })

  return (
    <div className='no-scrollbar max-h-[92vh] w-2/3 overflow-scroll bg-gray-50'>
      {isLoading ? (
        'loading'
      ) : (
        <>
          <div className='relative h-[350px] w-full'>
            <img
              src={data?.coverPicture ?? ''}
              alt=''
              className='h-full w-full bg-gray-100 object-cover'
            />
            {data?.profilePicture && data.profilePicture.length ? (
              <img
                src={data?.profilePicture}
                alt=''
                className='absolute left-0 right-0 top-[220px] m-auto h-[250px] w-[250px] rounded-full object-cover shadow-sm shadow-gray-600'
              />
            ) : (
              <PersonIcon className='absolute left-0 right-0 top-[250px] m-auto h-[200px] w-[200px] rounded-full bg-gray-200 object-cover' />
            )}
          </div>
          <div className='space-y-[35px] px-[70px] py-5'>
            <div className='flex h-[180px] items-center justify-between rounded-2xl bg-white p-12 text-gray-700 shadow-md shadow-gray-400'>
              <div className='flex flex-col items-center gap-2.5'>
                <span className='text-3xl font-medium'>
                  {data?.firstName} {data?.lastName}
                </span>
                <div className='flex w-full items-center gap-5'>
                  <div className='flex items-center gap-0.5 text-gray-500'>
                    <PlaceIcon />
                    <span className='text-xs'>{data?.city}</span>
                  </div>
                  <div className='flex items-center gap-0.5 text-gray-500'>
                    <LanguageIcon />
                    <span className='text-xs'>{data?.website}</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-end gap-2.5'>
                {isLoading ? (
                  'loading'
                ) : userId === user?.userId ? (
                  <Button
                    className='cursor-pointer rounded-[5px] bg-blue-500 px-4 py-2.5 text-white hover:bg-blue-700'
                    onClick={() => setOpenUpdate(true)}
                  >
                    update
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleFollow.mutate(userId)}
                    className='cursor-pointer rounded-[5px] bg-blue-500 px-4 py-2.5 text-white hover:bg-blue-700'
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                )}
                {/*<EmailOutlinedIcon />*/}
                {userId !== user?.userId && <MoreVertIcon />}
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && (
        <Update open={openUpdate} setOpenUpdate={setOpenUpdate} user={data} />
      )}
    </div>
  )
}
