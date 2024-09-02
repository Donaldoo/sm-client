'use client'

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, Popover } from '@mui/material'
import type { Post } from '@/core/api/posts/getPosts'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import getLikes from '@/core/api/posts/getLikes'
import useUserStore from '@/core/stores/store'
import Comments from '@/components/Comments'
import moment from 'moment'
import deleteLike from '@/core/api/posts/deleteLike'
import { createLike } from '@/core/api/posts/createLike'
import deletePost from '@/core/api/posts/deletePost'
import { toast } from 'sonner'
import PersonIcon from '@mui/icons-material/Person'

export default function Post({ post }: { post: Post }) {
  const [commentOpen, setCommentOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const { user } = useUserStore()

  const { data, isLoading } = useQuery({
    queryKey: ['likes', post.id],
    queryFn: () => getLikes(post.id),
    retry: 1,
    enabled: !!post.id
  })

  const queryClient = useQueryClient()

  const hasLiked = data?.some(like => like.userId === user?.userId)

  const canDelete = post.userId === user?.userId

  const toggleLike = useMutation({
    mutationFn: (postId: string) =>
      hasLiked ? deleteLike(postId) : createLike(postId),
    onSuccess: () => queryClient.invalidateQueries(['likes', post.id])
  })

  const handleLike = () => {
    toggleLike.mutate(post.id)
  }

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      toast.success('Post deleted!')
      queryClient.invalidateQueries(['posts'])
    }
  })

  return (
    <div className='rounded-2xl bg-white shadow-md shadow-gray-400'>
      <div className='p-5'>
        <div className='relative flex items-center justify-between'>
          <div className='flex gap-5'>
            {post.profilePicture?.length ? (
              <img
                className='h-10 w-10 rounded-full object-cover'
                src={post.profilePicture}
                alt=''
              />
            ) : (
              <PersonIcon className='h-10 w-10 rounded-full object-cover' />
            )}
            <div className='flex flex-col'>
              <Link
                href={`/profile?userId=${post.userId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className='font-medium'>{post.fullName}</span>
              </Link>
              <span className='text-xs'>
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
          </div>
          {canDelete && (
            <Button
              style={{ textTransform: 'none' }}
              className='px-0 text-sm text-black hover:bg-transparent'
              size='small'
              aria-describedby={id}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </Button>
          )}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Button
              style={{ textTransform: 'none' }}
              className='bg-red-500 text-white hover:bg-red-700'
              onClick={() => deletePostMutation.mutate(post.id)}
            >
              Delete
            </Button>
          </Popover>
        </div>
        <div className='my-5'>
          <p>{post.description}</p>
          <img
            className='mt-5 max-h-[550px] w-full object-cover'
            src={post.image}
            alt=''
          />
        </div>
        <div className='flex items-center gap-5'>
          <div className='flex cursor-pointer items-center gap-1.5 text-sm'>
            {isLoading ? (
              'loading'
            ) : hasLiked ? (
              <FavoriteOutlinedIcon
                style={{ color: 'red' }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div
            className='flex cursor-pointer items-center gap-1.5 text-sm'
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className='flex cursor-pointer items-center gap-1.5 text-sm'>
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  )
}
