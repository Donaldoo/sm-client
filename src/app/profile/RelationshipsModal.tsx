'use client'

import { Box, Modal } from '@mui/material'
import { useQuery } from 'react-query'
import getUserFollowers from '@/core/api/user/getUserFollowers'
import getUserFollowing from '@/core/api/user/getUserFollowing'
import { useRouter } from 'next/navigation'

export default function RelationshipsModal({
  openModal,
  setOpenModal,
  following,
  setFollowing
}: {
  openModal: boolean
  setOpenModal: Function
  following: boolean
  setFollowing: Function
}) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2
  }

  const { data: followersData } = useQuery({
    queryKey: ['followers'],
    queryFn: () => getUserFollowers(),
    enabled: !following
  })

  const { data: followingData } = useQuery({
    queryKey: ['following'],
    queryFn: () => getUserFollowing(),
    enabled: following
  })

  const router = useRouter()

  const data = following ? followingData : followersData

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box className='max-h-[500px]' sx={style}>
        <div className='flex items-center justify-around text-lg font-medium'>
          <span
            className={
              following
                ? 'cursor-pointer'
                : 'cursor-pointer rounded-2xl border border-gray-400 bg-gray-200 p-2'
            }
            onClick={() => setFollowing(false)}
          >
            Followers
          </span>
          <span
            className={
              following
                ? 'cursor-pointer rounded-2xl border border-gray-400 bg-gray-200 p-2'
                : 'cursor-pointer'
            }
            onClick={() => setFollowing(true)}
          >
            Following
          </span>
        </div>
        <div className='no-scrollbar mt-3 flex h-[400px] max-h-[500px] w-full flex-col gap-2 overflow-scroll'>
          {data && data.length ? (
            data?.map(user => (
              <div
                key={user.id}
                className='flex w-full cursor-pointer flex-row items-center self-center rounded-2xl border-b border-gray-200 bg-gray-50 p-2'
                onClick={() => {
                  setOpenModal(false)
                  router.push(`/profile?userId=${user.id}`)
                }}
              >
                <img
                  alt='profilePicture'
                  src={user.profilePicture}
                  className='h-16 w-16 rounded-full object-cover'
                />
                <div className='flex flex-col gap-0.5 pl-2.5'>
                  <p className='text-sm font-semibold text-gray-900'>
                    {user.displayName}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className='self-center'>No users.</div>
          )}
        </div>
      </Box>
    </Modal>
  )
}
