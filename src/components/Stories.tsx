'use client'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import getStories from '@/core/api/posts/getStories'
import { ChangeEvent, MouseEventHandler, useState } from 'react'
import UploadIcon from '@mui/icons-material/Upload'
import { createStory } from '@/core/api/posts/createStory'
import uploadImage from '@/core/api/posts/uploadImage'
import useUserStore from '@/core/stores/store'
import Image from 'next/image'
import getUserById from '@/core/api/user/getUserById'

const Stories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['stories'],
    queryFn: () => getStories()
  })

  const { user } = useUserStore()
  const { data: userr } = useQuery({
    queryKey: ['user', user?.userId],
    queryFn: () => getUserById(user!.userId),
    enabled: !!user?.userId
  })

  const [file, setFile] = useState<File | null>(null)
  const queryClient = useQueryClient()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const shareStory = useMutation({
    mutationFn: (image: string) => createStory(image),
    onSuccess: () => queryClient.invalidateQueries(['stories'])
  })

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    let imgUrl = ''
    if (file) imgUrl = await uploadImage(file)
    if (imgUrl.startsWith('"') && imgUrl.endsWith('"')) {
      imgUrl = imgUrl.slice(1, -1)
    }
    shareStory.mutate(imgUrl)
    setFile(null)
  }

  return (
    <div className='mb-0 flex h-[50px] gap-[10px] sm:mb-[30px] sm:h-[250px]'>
      <div className='relative w-[200px] overflow-hidden rounded-[10px]'>
        <img
          className='h-full w-full bg-gray-400 object-cover opacity-60'
          src={file ? URL.createObjectURL(file) : userr?.profilePicture}
          alt=''
        />
        <span className='absolute bottom-2.5 left-2.5 hidden font-medium text-white sm:block'>
          {userr?.firstName} {userr?.lastName}
        </span>
        {file && (
          <button
            onClick={handleClick}
            className='absolute bottom-10 right-5 rounded bg-blue-500 px-2 py-1 text-white'
          >
            <UploadIcon />
          </button>
        )}
        <input
          type='file'
          id='image'
          style={{ display: 'none' }}
          onChange={e => {
            handleFileChange(e)
          }}
        />
        <label htmlFor='image'>
          <button
            onClick={() => document.getElementById('image')!.click()}
            className='absolute bottom-10 left-2.5 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-blue-500 pb-1 text-3xl text-white'
          >
            +
          </button>
        </label>
      </div>
      {error
        ? 'Something went wrong'
        : isLoading
          ? 'loading'
          : data?.length
            ? data?.map(story => (
                <div
                  className='relative flex w-[200px] overflow-hidden rounded-[10px] border-0'
                  key={story.id}
                >
                  <Image
                    width={200}
                    height={200}
                    unoptimized
                    className='h-full w-full object-cover'
                    src={story.image}
                    alt=''
                  />
                  <span className='absolute bottom-2.5 left-2.5 hidden font-medium text-white sm:block'>
                    {story.fullName}
                  </span>
                </div>
              ))
            : null}
    </div>
  )
}

export default Stories
