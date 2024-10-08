'use client'

import React from 'react'
import Post from '@/components/Post'
import { useQuery } from 'react-query'
import getPosts from '@/core/api/posts/getPosts'
import { CircularProgress } from '@mui/material'

const Posts = ({
  userId,
  category,
  workExperience,
  workIndustry
}: {
  userId?: string
  category?: string
  workExperience?: string
  workIndustry?: string
}) => {
  const {
    data: posts,
    isLoading,
    error
  } = useQuery({
    queryKey: ['posts', userId, category, workExperience, workIndustry],
    queryFn: () =>
      getPosts({
        userId: userId,
        workExperience: parseInt(workExperience ?? ''),
        workIndustry: parseInt(workIndustry ?? ''),
        category: parseInt(category ?? '')
      }),
    onSuccess: () => {
      window.requestAnimationFrame(() => {
        window.scrollTo(0, window.scrollY)
      })
    }
  })
  return (
    <div className='flex flex-col gap-[35px]'>
      {posts && posts.length > 0 ? (
        posts.map(post => <Post post={post} key={post.id} />)
      ) : (
        <div className='self-center p-5 text-lg font-medium text-gray-600'>
          No posts yet!
        </div>
      )}
    </div>
  )
}

export default Posts
