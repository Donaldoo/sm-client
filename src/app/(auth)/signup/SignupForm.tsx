'use client'

import React from 'react'
import FormInput from '@/components/form/FormInput'
import { Button } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import postSignUp, { SignUpRequest } from '@/core/api/auth/postSignUp'
import { toast } from 'sonner'
import postLogin, { LoginRequest } from '@/core/api/auth/postLogin'
import useUserStore from '@/core/stores/store'

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().email().required('Email is required!'),
  password: yup.string().required('Password is required!')
})

const SignupForm = () => {
  const resolver = yupResolver(schema)
  const router = useRouter()
  const { setUser } = useUserStore()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver })

  const login = useMutation({
    mutationFn: (data: LoginRequest) => postLogin(data),
    onSuccess: data => {
      setUser(data.user)
      localStorage.setItem('token', data.token)
      document.cookie = `authToken=${data.token}; path=/;`
      router.push('/')
    },
    onError: () => {
      toast.error('Could not authenticate!!')
    }
  })

  const signup = useMutation({
    mutationFn: (data: SignUpRequest) => postSignUp(data),
    onSuccess: (data, variables) => {
      toast.success('Account created successfully!')
      login.mutate({ email: variables.email, password: variables.password })
    },
    onError: (err: TypeError) => {
      toast.error(err.message)
    }
  })

  const onSubmit = (data: SignUpRequest) => {
    signup.mutate(data)
  }

  return (
    <form
      method='POST'
      className='flex flex-col gap-8'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        control={control}
        errors={errors}
        className='w-full border-b border-gray-300 px-3 py-5'
        type='text'
        placeholder='First name'
        name='firstName'
      />
      <FormInput
        control={control}
        errors={errors}
        type='text'
        placeholder='Last name'
        name='lastName'
        className='w-full border-b border-gray-300 px-3 py-5'
      />
      <FormInput
        control={control}
        errors={errors}
        className='w-full border-b border-gray-300 px-3 py-5'
        type='email'
        placeholder='Email'
        name='email'
      />
      <FormInput
        control={control}
        errors={errors}
        type='password'
        placeholder='Password'
        name='password'
        className='w-full border-b border-gray-300 px-3 py-5'
      />
      <Button
        type='submit'
        className='w-1/2 cursor-pointer bg-purple-500 p-3 font-bold text-white hover:bg-purple-700'
      >
        Register
      </Button>
    </form>
  )
}

export default SignupForm
