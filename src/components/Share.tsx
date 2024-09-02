'use client'

import { ChangeEvent, MouseEventHandler, useState } from 'react'

import ImageImg from '../../public/img.png'
import Map from '../../public/map.png'
import Friend from '../../public/friend.png'
import Image from 'next/image'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  SelectChangeEvent
} from '@mui/material'
import useUserStore from '@/core/stores/store'
import uploadImage from '@/core/api/posts/uploadImage'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  createPost,
  CreatePostRequest,
  PostCategory,
  WorkExperience,
  WorkIndustry
} from '@/core/api/posts/createPost'
import { toast } from 'sonner'
import PersonIcon from '@mui/icons-material/Person'
import getUserById from '@/core/api/user/getUserById'

const Share = () => {
  const [file, setFile] = useState<File | null>(null)
  const [desc, setDesc] = useState('')

  const upload = async () => {
    try {
      return await uploadImage(file!)
    } catch (err) {
      console.log(err)
    }
  }

  const queryClient = useQueryClient()

  const { user } = useUserStore()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    let imgUrl = ''
    if (file) {
      const uploadResult = await upload()
      imgUrl = uploadResult || ''
    }
    if (imgUrl.startsWith('"') && imgUrl.endsWith('"')) {
      imgUrl = imgUrl.slice(1, -1)
    }
    mutation.mutate({
      description: desc,
      image: imgUrl,
      category: category,
      workIndustry: workIndustry,
      workExperience: workExperience
    })
    setDesc('')
    setFile(null)
  }

  const [category, setCategory] = useState(1)
  const [workExperience, setWorkExperience] = useState(1)
  const [workIndustry, setWorkIndustry] = useState(1)

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(parseInt(event.target.value))
  }

  const handleWorkIndustryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setWorkIndustry(parseInt(event.target.value))
  }

  const handleExperienceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setWorkExperience(parseInt(event.target.value))
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
                <Image width={20} height={20} src={ImageImg} alt='' />
                <span>Add Image</span>
              </div>
            </label>

            <NativeSelect
              className='text-xs text-gray-400'
              defaultValue={1}
              inputProps={{
                name: 'postCategory',
                id: 'uncontrolled-native'
              }}
              onChange={handleCategoryChange}
            >
              <option value={1}>Work & Internships</option>
              <option value={2}>Fun & Entertainment</option>
            </NativeSelect>

            {category === 1 && (
              <>
                {' '}
                <NativeSelect
                  className='text-xs text-gray-400'
                  defaultValue={1}
                  inputProps={{
                    name: 'workExperience',
                    id: 'uncontrolled-native'
                  }}
                  onChange={handleExperienceChange}
                >
                  {Object.keys(WorkExperience)
                    .filter(key => isNaN(Number(key))) // Filter out the numeric keys (enum values) and only keep string keys (enum names)
                    .map(key => (
                      <option
                        key={WorkExperience[key as keyof typeof WorkExperience]}
                        value={
                          WorkExperience[key as keyof typeof WorkExperience]
                        }
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </option>
                    ))}
                </NativeSelect>
                <NativeSelect
                  className='text-xs text-gray-400'
                  inputProps={{
                    name: 'workIndustry',
                    id: 'uncontrolled-native'
                  }}
                  onChange={handleWorkIndustryChange}
                >
                  {Object.keys(WorkIndustry)
                    .filter(key => isNaN(Number(key))) // Filter out the numeric keys (enum values) and only keep string keys (enum names)
                    .map(key => (
                      <option
                        key={WorkIndustry[key as keyof typeof WorkIndustry]}
                        value={WorkIndustry[key as keyof typeof WorkIndustry]}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </option>
                    ))}
                </NativeSelect>
              </>
            )}
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
