'use client'

import { useState } from 'react'

import ImageImg from '../../public/img.png'
import Map from '../../public/map.png'
import Friend from '../../public/friend.png'
import Image from 'next/image'
import { Button } from '@mui/material'
import useUserStore from '@/core/stores/store'
import uploadImage from '@/core/api/posts/uploadImage'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  createPost,
  CreatePostRequest,
  PostCategory
} from '@/core/api/posts/createPost'
import { toast } from 'sonner'
import PersonIcon from '@mui/icons-material/Person'
import getUserById from '@/core/api/user/getUserById'

const Share = () => {
  const [file, setFile] = useState(null)
  const [desc, setDesc] = useState('')

  const upload = async () => {
    try {
      return await uploadImage(file)
    } catch (err) {
      console.log(err)
    }
  }

  const queryClient = useQueryClient()

  const { user } = useUserStore()

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', user?.userId],
    queryFn: () => getUserById(user!.userId),
    enabled: !!user?.userId
  })

  const mutation = useMutation({
    mutationFn: (post: CreatePostRequest) => createPost(post),
    onSuccess: () => {
      toast.success('Post successfully created!')
      queryClient.invalidateQueries(['posts'])
    }
  })

  const handleClick = async e => {
    e.preventDefault()
    let imgUrl = ''
    if (file) imgUrl = await upload()
    if (imgUrl.startsWith('"') && imgUrl.endsWith('"')) {
      imgUrl = imgUrl.slice(1, -1)
    }
    mutation.mutate({
      description: desc,
      image: imgUrl,
      category: PostCategory.Work
    })
    setDesc('')
    setFile(null)
  }

  return (
    <div className='mb-10 rounded-2xl bg-white shadow-md shadow-gray-400'>
      <div className='p-5'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-[3] items-center'>
            {userData?.profilePicture?.length ? (
              <img
                className='h-10 w-10 rounded-full object-cover'
                src={userData?.profilePicture}
                alt=''
              />
            ) : (
              <PersonIcon className='h-10 w-10 rounded-full object-cover' />
            )}
            <input
              name='description'
              className='w-full px-2.5 py-5 outline-0'
              type='text'
              onChange={e => setDesc(e.target.value)}
              value={desc}
              placeholder={`What's on your mind ${userData?.firstName}?`}
            />
          </div>
          <div className='flex flex-1 justify-end'>
            {file && (
              <img
                className='h-[100px] w-[100px] object-cover'
                alt=''
                src={URL.createObjectURL(file)}
              />
            )}
          </div>
        </div>
        <hr className='my-5 h-[0.5px] bg-gray-500' />
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-5 text-xs text-gray-400'>
            <input
              type='file'
              id='file'
              style={{ display: 'none' }}
              onChange={e => {
                handleFileChange(e)
              }}
            />
            <label htmlFor='file'>
              <div className='flex cursor-pointer items-center gap-2.5'>
                <Image width={20} height={20} src={ImageImg as string} alt='' />
                <span>Add Image</span>
              </div>
            </label>
            <div className='flex cursor-pointer items-center gap-2.5'>
              <Image width={20} height={20} src={Map as string} alt='' />
              <span>Add Place</span>
            </div>
            <div className='flex cursor-pointer items-center gap-2.5'>
              <Image width={20} height={20} src={Friend as string} alt='' />
              <span>Tag Friends</span>
            </div>
          </div>
          <div>
            <Button
              className='bg-blue-500 text-sm text-white hover:bg-blue-700'
              style={{ textTransform: 'none' }}
              onClick={handleClick}
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share
