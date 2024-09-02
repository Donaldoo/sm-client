'use client'

import { useQuery } from 'react-query'
import getAllChats from '@/core/api/chat/getAllChats'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useCreateQueryString from '@/core/hooks/useCreateQueryString'
import moment from 'moment'
import PersonIcon from '@mui/icons-material/Person'

const Chats = () => {
  const { data: chats, isLoading } = useQuery({
    queryKey: ['chats'],
    queryFn: () => getAllChats('string')
  })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { createQueryString } = useCreateQueryString(searchParams)

  function setUserId(value: string) {
    const params = createQueryString('userId', value)
    router.push(pathname + '?' + params)
  }

  return (
    <div className='no-scrollbar max-h-[60vh] w-2/5 overflow-scroll border-r border-gray-300'>
      {chats?.map(chat => (
        <div
          key={chat.userId}
          className='my-5 flex cursor-pointer items-center gap-5'
          onClick={() => setUserId(chat.userId)}
        >
          <div className='relative flex items-center gap-5'>
            {chat.profilePicture?.length ? (
              <img
                className='h-24 w-24 rounded-full object-cover'
                src={chat.profilePicture}
                alt=''
              />
            ) : (
              <PersonIcon className='h-24 w-24 rounded-full bg-gray-200' />
            )}
            <div className='absolute bottom-1 right-[1px] h-6 w-6 rounded-full border-2 border-green-700 bg-green-500' />
          </div>
          <div className='flex w-3/4 flex-col border-b border-gray-300 py-5'>
            <div className='flex items-center justify-between'>
              <span className='text-2xl font-medium'>{chat.userName}</span>
              <span className='text-xl font-normal'>
                {moment(chat.lastMessageSentAt).fromNow()}
              </span>
            </div>
            <span className='text-xl'>{chat.lastMessage}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats
