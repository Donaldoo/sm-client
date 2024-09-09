import React, { useState } from 'react'
import { Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import getComments from '@/core/api/posts/getComments'
import moment from 'moment'
import {
  createComment,
  CreateCommentRequest
} from '@/core/api/posts/createComment'
import deleteComment from '@/core/api/posts/deleteComment'
import useUserStore from '@/core/stores/store'
import getUserById from '@/core/api/user/getUserById'
import PersonIcon from '@mui/icons-material/Person'

const Comments = ({ postId }: { postId: string }) => {
  const { user } = useUserStore()
  const { data: fetchedUser } = useQuery({
    queryKey: ['user', user?.userId],
    queryFn: () => getUserById(user!.userId),
    enabled: !!user?.userId
  })
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
    enabled: !!postId
  })
  const queryClient = useQueryClient()
  const [desc, setDesc] = useState('')

  const postComment = useMutation({
    mutationFn: (newComment: CreateCommentRequest) => createComment(newComment),
    onSuccess: () => queryClient.invalidateQueries(['comments'])
  })

  const handleClick = async (e: any) => {
    e.preventDefault()
    postComment.mutate({ postId: postId, description: desc })
    setDesc('')
  }

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => queryClient.invalidateQueries(['comments', postId])
  })

  return (
    <div>
      <div className='my-5 flex items-center justify-between gap-5'>
        {fetchedUser?.profilePicture ? (
          <img
            className='h-10 w-10 rounded-full object-cover'
            src={fetchedUser?.profilePicture}
            alt=''
          />
        ) : (
          <PersonIcon className='h-10 w-10 rounded-full bg-gray-200' />
        )}
        <input
          className='flex-[5] border border-gray-300 bg-transparent p-2.5 text-gray-700 outline-0'
          type='text'
          placeholder='write a comment'
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <Button
          disabled={!desc.length}
          onClick={handleClick}
          className={
            !desc.length ? 'hidden' : 'bg-blue-500 text-white hover:bg-blue-700'
          }
        >
          Send
        </Button>
      </div>
      {error
        ? 'Something went wrong'
        : isLoading
          ? 'loading'
          : data &&
            data.map(comment => (
              <div
                key={comment.commentId}
                className='my-[30px] flex justify-between gap-5'
              >
                {comment.userImage ? (
                  <img
                    className='h-10 w-10 rounded-full object-cover'
                    src={comment.userImage}
                    alt=''
                  />
                ) : (
                  <PersonIcon className='h-10 w-10 rounded-full bg-gray-200' />
                )}
                <div className='flex flex-[5] flex-col items-start gap-[3px]'>
                  <span className='font-medium'>{comment.userName}</span>
                  <p className='text-gray-500'>{comment.description}</p>
                </div>
                <span className='self-center text-xs text-gray-700'>
                  <div className='flex items-center justify-between gap-4'>
                    {moment(comment.createdAt).fromNow()}
                    {comment.canBeDeleted && (
                      <DeleteOutlineIcon
                        className='cursor-pointer text-red-500 hover:text-red-700'
                        onClick={() =>
                          deleteCommentMutation.mutate(comment.commentId)
                        }
                      />
                    )}
                  </div>
                </span>
              </div>
            ))}
    </div>
  )
}

export default Comments
