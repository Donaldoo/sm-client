'use client'

import React from 'react'
import Post from '@/components/Post'
import { useQuery } from 'react-query'
import getPosts from '@/core/api/posts/getPosts'

const Posts = ({ userId }: { userId?: string }) => {
  const {
    data: posts,
    isLoading,
    error
  } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts({ userId: userId })
  })
  return (
    <div className='flex flex-col gap-[35px]'>
      {error
        ? 'Something went wrong!'
        : isLoading
          ? 'loading'
          : posts && posts.map(post => <Post post={post} key={post.id} />)}
    </div>
  )
}

export default Posts
