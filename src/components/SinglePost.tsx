'use client'

import React from 'react'
import Post from '@/components/Post'
import { useQuery } from 'react-query'
import getPostById from '@/core/api/posts/getPostById'
import { CircularProgress } from '@mui/material'

export default function SinglePost({ postId }: { postId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId
  })

  return (
    <div className='no-scrollbar flex max-h-[92vh] w-[110vh] flex-col overflow-scroll px-[30px] py-5'>
      {isLoading ? (
        <CircularProgress className='self-center' />
      ) : data ? (
        <Post post={data} />
      ) : (
        <div className='self-center text-lg font-medium'>
          Post might have been deleted!
        </div>
      )}
    </div>
  )
}
