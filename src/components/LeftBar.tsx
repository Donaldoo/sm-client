'use client'

import Friends from '../../public/1.png'
import Groups from '../../public/2.png'
import Market from '../../public/3.png'
import Watch from '../../public/4.png'
import Memories from '../../public/5.png'
import Events from '../../public/6.png'
import Gaming from '../../public/7.png'
import Gallery from '../../public/8.png'
import Videos from '../../public/9.png'
import Messages from '../../public/10.png'
import Tutorials from '../../public/11.png'
import Courses from '../../public/12.png'
import Fund from '../../public/13.png'
import Image from 'next/image'
import useUserStore from '@/core/stores/store'
import { useQuery } from 'react-query'
import getUserById from '@/core/api/user/getUserById'

const LeftBar = () => {
  const { user } = useUserStore()
  const { data, isLoading } = useQuery({
    queryKey: ['user', user?.userId],
    queryFn: () => getUserById(user!.userId),
    enabled: !!user?.userId
  })

  return (
    <div className='sticky top-[70px] hidden w-1/6 bg-white sm:flex'>
      <div className='p-5'>
        <div className='flex flex-col gap-5 text-sm'>
          <div className='flex items-center gap-3'>
            <img
              src={data?.profilePicture}
              alt=''
              width={30}
              height={30}
              className='rounded-full object-cover'
            />
            <span className='text-sm'>
              {data?.firstName} {data?.lastName}
            </span>
          </div>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Friends as string} alt='something' />
            <span>Friends</span>
          </div>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Groups as string} alt='' />
            <span>Groups</span>
          </div>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Market as string} alt='' />
            <span>Marketplace</span>
          </div>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Watch as string} alt='' />
            <span>Watch</span>
          </div>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Memories as string} alt='' />
            <span>Memories</span>
          </div>
        </div>
        <hr className='my-5 h-[0.5px] w-full bg-gray-500' />
        <div className='flex flex-col gap-5 text-sm'>
          <span>Your shortcuts</span>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Events as string} alt='' />
            <span>Events</span>
          </div>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Gaming as string} alt='' />
            <span>Gaming</span>
          </div>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Gallery as string} alt='' />
            <span>Gallery</span>
          </div>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Videos as string} alt='' />
            <span>Videos</span>
          </div>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Messages as string} alt='' />
            <span>Messages</span>
          </div>
        </div>
        <hr className='my-5 h-[0.5px] w-full bg-gray-500' />
        <div className='flex flex-col gap-5 text-sm'>
          <span>Others</span>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Fund as string} alt='' />
            <span>Fundraiser</span>
          </div>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Tutorials as string} alt='' />
            <span>Tutorials</span>
          </div>
          <div className='flex items-center gap-3'>
            <Image width={30} src={Courses as string} alt='' />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftBar
