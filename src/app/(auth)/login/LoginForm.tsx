'use client'

import FormInput from '@/components/form/FormInput'
import { Button } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import postLogin, {
  LoginRequest,
  LoginResponse
} from '@/core/api/auth/postLogin'
import { toast } from 'sonner'
import useUserStore from '@/core/stores/store'

const schema = yup.object().shape({
  email: yup.string().email().required('Email is required!'),
  password: yup.string().required('Password is required!')
})

const LoginForm = () => {
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
    onSuccess: (data: LoginResponse) => {
      setUser(data.user)
      localStorage.setItem('token', data.token)
      document.cookie = `authToken=${data.token}; path=/;`
      router.push('/')
    },
    onError: (err: TypeError) => {
      toast.error(err.message)
    }
  })

  const onSubmit = (data: LoginRequest) => {
    login.mutate(data)
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
        placeholder='Email'
        name='email'
      />
      <FormInput
        errors={errors}
        control={control}
        className='w-full border-b border-gray-300 px-3 py-5'
        type='password'
        placeholder='Password'
        name='password'
      />
      <Button
        className='w-1/2 cursor-pointer bg-purple-500 p-3 font-bold text-white hover:bg-purple-700'
        type='submit'
      >
        Login
      </Button>
    </form>
  )
}

export default LoginForm
