'use client'

import { useRouter } from 'next/navigation'
import { UserDto } from '@/core/api/user/getSuggestedUsers'

export default function SearchResults({
  data,
  setShowSearch
}: {
  data?: UserDto[]
  setShowSearch: (arg: boolean) => void
}) {
  const router = useRouter()
  return (
    <div className='fixed top-[55px] flex max-h-96 w-[300px] flex-col gap-4 overflow-auto rounded-b-2xl bg-white p-4 shadow-md'>
      <p className='pb-1.5 text-sm font-bold'>Search Results</p>
      {data && data.length ? (
        data?.map(user => (
          <div
            onClick={() => {
              setShowSearch(false)
              router.push(`/profile?userId=${user.id}`)
            }}
            key={user.id}
            className='flex cursor-pointer flex-row items-center rounded-2xl border-b border-gray-200 bg-gray-50 p-2'
          >
            <img
              src={user.profilePicture}
              className='rounded-full object-cover sm:h-10 sm:w-10'
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
