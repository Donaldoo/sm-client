import Link from 'next/link'
import './styles.css'
import { Button } from '@mui/material'
import FormInput from '@/components/form/FormInput'
import SignupForm from '@/app/(auth)/signup/SignupForm'

function SignUpPage() {
  return (
    <div className='flex h-[90vh] items-center justify-center'>
      <div className='flex min-h-[600px] w-1/2 flex-row-reverse overflow-hidden rounded-xl bg-white'>
        <div className='left'>
          <h1 className='text-[100px] leading-[100px]'>UniLink.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span className='text-sm'>Do you have an account?</span>
          <Link href='/login'>
            <Button className='w-1/2 cursor-pointer !bg-gray-200 !p-3 !font-bold !text-purple-700 hover:!bg-white'>
              Login
            </Button>
          </Link>
        </div>
        <div className='right'>
          <h1 className='text-3xl font-bold text-gray-600'>Register</h1>
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
