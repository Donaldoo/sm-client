'use client'

import Link from 'next/link'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ExitToAppIcon from '@mui/icons-material/ExitToAppOutlined'
import useUserStore from '@/core/stores/store'
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query'
import getUserById from '@/core/api/user/getUserById'
import PersonIcon from '@mui/icons-material/Person'

function Navbar() {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.clear()
    document.cookie =
      'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    router.push('/login')
  }

  const { user } = useUserStore()

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['user', user?.userId],
    queryFn: () => getUserById(user!.userId),
    enabled: !!user?.userId
  })

  return (
    <div className='sticky top-0 z-[999] flex items-center justify-between border-b bg-white px-5 py-3 shadow-sm shadow-gray-400'>
      <div className='flex items-center gap-8'>
        <Link href='/' style={{ textDecoration: 'none' }}>
          <span className='text-4xl font-bold'>UniLink</span>
        </Link>
        <HomeOutlinedIcon
          fontSize='large'
          className='cursor-pointer'
          onClick={() => router.push('/')}
        />
        <div className='flex items-center gap-4 rounded border p-3'>
          <SearchOutlinedIcon />
          <input className='outline-0' type='text' placeholder='Search...' />
        </div>
      </div>
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-3 font-medium'>
          {currentUser?.profilePicture?.length ? (
            <img
              className='h-8 w-8 rounded-full object-cover'
              src={currentUser?.profilePicture}
              alt=''
            />
          ) : (
            <PersonIcon className='h-8 w-8 rounded-full bg-gray-200 object-cover' />
          )}
          <span
            className='cursor-pointer text-xl font-bold'
            onClick={() => router.push(`/profile?userId=${user?.userId}`)}
          >
            {currentUser?.firstName} {currentUser?.lastName}
          </span>
        </div>
        <PersonOutlinedIcon />
        <EmailOutlinedIcon
          onClick={() => router.push('/messages')}
          className='cursor-pointer'
        />
        <NotificationsOutlinedIcon />
        <ExitToAppIcon onClick={handleLogout} className='cursor-pointer' />
      </div>
    </div>
  )
}

export default Navbar
