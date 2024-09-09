'use client'

import { usePathname, useRouter } from 'next/navigation'
import { UserDto } from '@/core/api/user/getSuggestedUsers'

export default function SearchResults({
  data,
  setShowSearch,
  fromMessages
}: {
  data?: UserDto[]
  setShowSearch: (arg: boolean) => void
  fromMessages?: boolean
}) {
  const router = useRouter()

  return (
    <div
      className={`${fromMessages ? 'right-[227px] top-[150px] w-[400px]' : 'top-[55px] w-[300px]'} no-scrollbar fixed flex max-h-[500px] flex-col gap-4 overflow-auto rounded-b-2xl bg-white p-4 shadow-md`}
    >
      <p className='pb-1.5 text-sm font-bold'>Search Results</p>
      {data && data.length ? (
        data?.map(user => (
          <div
            onClick={() => {
              setShowSearch(false)
              fromMessages
                ? router.push(`?userId=${user.id}`)
                : router.push(`/profile?userId=${user.id}`)
            }}
            key={user.id}
            className='flex cursor-pointer flex-row items-center rounded-2xl border-b border-gray-200 bg-gray-50 p-2'
          >
            <img
              alt=''
              src={user.profilePicture}
              className='h-10 w-10 rounded-full object-cover'
            />
            <div className='flex flex-col gap-0.5 pl-2.5'>
              <p className='text-sm font-semibold text-gray-900'>
                {user.displayName}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div>No users found.</div>
      )}
    </div>
  )
}
