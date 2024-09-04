'use client'

import React, { ChangeEvent, useState } from 'react'
import getUserById, { User } from '@/core/api/user/getUserById'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Button, Modal } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import FormInput from '@/components/form/FormInput'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { editAccount, EditAccountRequest } from '@/core/api/user/editAccount'
import { toast } from 'sonner'
import uploadImage from '@/core/api/posts/uploadImage'
import useUserStore from '@/core/stores/store'

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().email().required('Email is required!'),
  city: yup.string().notRequired(),
  website: yup.string().notRequired(),
  profilePicture: yup.string().notRequired(),
  coverPicture: yup.string().notRequired(),
  password: yup.string().notRequired()
})

export default function Update({
  setOpenUpdate,
  user,
  open
}: {
  setOpenUpdate: any
  user?: User
  open: boolean
}) {
  const [cover, setCover] = useState<File | null>(null)
  const [profile, setProfile] = useState<File | null>(null)

  const resolver = yupResolver(schema)
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver })

  const { data, isLoading } = useQuery({
    queryKey: ['user', user!.id],
    queryFn: () => getUserById(user!.id),
    enabled: !!user!.id
  })

  const { setUser } = useUserStore()

  const editUserMutation = useMutation({
    mutationFn: (req: EditAccountRequest) => editAccount(req),
    onSuccess: () => {
      toast.success('Account updated successfully!')
      queryClient.invalidateQueries(['user', user!.id])
    }
  })

  const onSubmit = async (data: EditAccountRequest) => {
    let coverUrl
    let profileUrl
    coverUrl = cover ? await uploadImage(cover) : user!.coverPicture
    if (coverUrl?.length) {
      if (coverUrl.startsWith('"') && coverUrl.endsWith('"')) {
        coverUrl = coverUrl.slice(1, -1)
      }
    }
    profileUrl = profile ? await uploadImage(profile) : user!.profilePicture
    if (profileUrl?.length) {
      if (profileUrl.startsWith('"') && profileUrl.endsWith('"')) {
        profileUrl = profileUrl.slice(1, -1)
      }
    }
    data.profilePicture = profileUrl
    data.coverPicture = coverUrl
    editUserMutation.mutate(data)
    setCover(null)
    setProfile(null)
    setOpenUpdate(false)
  }

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile(e.target.files[0])
    }
  }

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCover(e.target.files[0])
    }
  }

  const handleClose = () => setOpenUpdate(false)
  return (
    <Modal open={open} onClose={handleClose} style={{ top: 20, left: 50 }}>
      <div className='relative m-auto flex w-2/5 flex-col gap-4 bg-white p-[30px] shadow-md shadow-gray-400'>
        <div className='mb-5 flex w-full flex-row-reverse justify-between'>
          <Button
            className='border-0 !bg-red-500 !p-[5px] !text-white hover:!bg-red-700'
            onClick={() => setOpenUpdate(false)}
          >
            Close
          </Button>
          <h1 className='flex justify-center text-2xl font-medium text-gray-700'>
            Update Your Profile
          </h1>
          <div></div>
        </div>
        {isLoading ? (
          'loading'
        ) : (
          <form
            className='flex flex-col gap-5'
            method='POST'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-wrap gap-20'>
              <label
                htmlFor='profilePicture'
                className='flex flex-col gap-2.5 text-sm font-medium leading-normal'
              >
                <span>Profile Picture</span>
                <div className='relative'>
                  <img
                    className='h-[150px] object-cover'
                    src={
                      profile
                        ? URL.createObjectURL(profile)
                        : user!.profilePicture
                    }
                    alt=''
                  />
                  <CloudUploadIcon className='text-gry-500 absolute bottom-0 left-0 right-0 top-0 m-auto cursor-pointer text-[30px]' />
                </div>
              </label>
              <input
                className='border-b border-gray-300 bg-transparent p-[5px] text-gray-700 outline-0'
                type='file'
                accept='image/*'
                id='profilePicture'
                style={{ display: 'none' }}
                onChange={e => {
                  handleProfileChange(e)
                }}
              />
              <label
                htmlFor='coverPicture'
                className='flex flex-col gap-2.5 text-sm font-medium leading-normal'
              >
                <span>Cover Picture</span>
                <div className='relative'>
                  <img
                    className='h-[150px] w-[220px] object-cover'
                    src={
                      cover ? URL.createObjectURL(cover) : user!.coverPicture
                    }
                    alt=''
                  />
                  <CloudUploadIcon className='text-gry-500 absolute bottom-0 left-0 right-0 top-0 m-auto cursor-pointer text-[30px]' />
                </div>
              </label>
              <input
                type='file'
                accept='image/*'
                id='coverPicture'
                style={{ display: 'none' }}
                className='border-b border-gray-300 bg-transparent p-[5px] text-gray-700'
                onChange={e => {
                  handleCoverChange(e)
                }}
              />
            </div>
            <FormInput
              defaultValue={data?.email}
              label={'Email'}
              control={control}
              errors={errors}
              className='w-full border-b border-gray-300 bg-transparent p-[5px] text-gray-700 outline-0'
              type='text'
              name='email'
            />
            <FormInput
              label='Password'
              errors={errors}
              control={control}
              type='password'
              name='password'
              className='w-full border-b border-gray-300 bg-transparent p-[5px] text-gray-700 outline-0'
            />
            <FormInput
              defaultValue={data?.firstName}
              label='First name'
              errors={errors}
              control={control}
              type='text'
              name='firstName'
              className='w-full border-b border-gray-300 bg-transparent p-[5px] text-gray-700 outline-0'
            />
            <FormInput
              defaultValue={data?.lastName}
              label='Last name'
              errors={errors}
              control={control}
              type='text'
              name='lastName'
              className='w-full border-b border-gray-300 bg-transparent p-[5px] text-gray-700 outline-0'
            />
            <FormInput
              defaultValue={data?.city}
              label='Country / City'
              errors={errors}
              control={control}
              type='text'
              name='city'
              className='w-full border-b border-gray-300 bg-transparent p-[5px] text-gray-700 outline-0'
            />
            <FormInput
              defaultValue={data?.website}
              label='Website'
              control={control}
              errors={errors}
              type='text'
              name='website'
              className='w-full border-b border-gray-300 bg-transparent p-[5px] text-gray-700 outline-0'
            />
            <Button
              className='w-1/4 justify-center self-center !bg-blue-500 !text-white hover:!bg-blue-700'
              type='submit'
            >
              Update
            </Button>
          </form>
        )}
      </div>
    </Modal>
  )
}
