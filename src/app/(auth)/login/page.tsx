import Link from 'next/link'
import { Button } from '@mui/material'
import './styles.css'
import LoginForm from '@/app/(auth)/login/LoginForm'

const LoginPage = () => {
  return (
    <div className='flex h-[90vh] items-center justify-center'>
      <div className='flex min-h-[600px] w-1/2 overflow-hidden rounded-3xl bg-white shadow'>
        <div className='leftLogin'>
          <h1 className='text-[100px] leading-[100px] text-white'>UniLink.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span className='text-sm'>Don&apos;t you have an account?</span>
          <Link href='/signup'>
            <Button className='w-1/2 cursor-pointer !bg-gray-200 !p-3 !font-bold !text-purple-700 hover:!bg-white'>
              Register
            </Button>
          </Link>
        </div>
        <div className='flex flex-1 flex-col justify-center gap-12 p-12'>
          <h1 className='text-3xl font-bold text-gray-600'>Login</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
