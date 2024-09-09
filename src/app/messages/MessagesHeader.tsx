'use client'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import searchUsers from '@/core/api/user/searchUsers'
import SearchResults from '@/components/SearchResults'

const MessagesHeader = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    setShowSearch(!!value)
  }

  const { data: searchedUser } = useQuery({
    queryKey: ['searchedUser', search],
    queryFn: () => searchUsers(search),
    enabled: !!search
  })

  console.log(search)
  return (
    <div className='flex w-full items-center justify-between border-b border-gray-300 pb-7'>
      <div className='flex items-center gap-5'>
        <h1 className='text-3xl font-medium'>Messages</h1>
      </div>
      <div className='flex w-[400px] items-center gap-4 rounded border p-3 text-xl'>
        <SearchOutlinedIcon />
        <input
          className='outline-0'
          type='text'
          placeholder='Search...'
          onChange={handleSearchChange}
        />
      </div>
      {showSearch && (
        <SearchResults
          setShowSearch={setShowSearch}
          data={searchedUser}
          fromMessages={true}
        />
      )}
    </div>
  )
}

export default MessagesHeader
