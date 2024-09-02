'use client'

import Education from '../../public/education.png'
import Engineering from '../../public/engineering.png'
import Finance from '../../public/finance.png'
import Government from '../../public/government.png'
import Healthcare from '../../public/healthcare.png'
import Hospitality from '../../public/hospitality.png'
import Legal from '../../public/legal.png'
import Marketing from '../../public/marketing.png'
import Retail from '../../public/retail.png'
import Technology from '../../public/technology.png'
import Entertainment from '../../public/entertainment.png'
import Image from 'next/image'
import useUserStore from '@/core/stores/store'
import { useQuery } from 'react-query'
import getUserById from '@/core/api/user/getUserById'
import PersonIcon from '@mui/icons-material/Person'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useCreateQueryString from '@/core/hooks/useCreateQueryString'

const LeftBar = () => {
  const { user } = useUserStore()
  const { data, isLoading } = useQuery({
    queryKey: ['user', user?.userId],
    queryFn: () => getUserById(user!.userId),
    enabled: !!user?.userId
  })

  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearExcept } = useCreateQueryString(searchParams)

  function handleWorkCategory(workIndustryValue: string) {
    const finalParams = new URLSearchParams() // Start with a fresh URLSearchParams instance
    finalParams.set('category', '1')
    finalParams.set('workIndustry', workIndustryValue)

    const workExperience = searchParams.get('workExperience')
    if (workExperience) {
      finalParams.set('workExperience', workExperience)
    }

    router.push('/' + '?' + finalParams.toString())
  }

  function handleEntertainmentCategory(value: string) {
    const params = clearExcept('category', value)
    router.push('/' + '?' + params)
  }

  return (
    <div className='sticky top-[70px] hidden w-1/6 bg-white sm:flex'>
      <div className='p-5'>
        <div className='flex flex-col gap-5 text-sm'>
          <div className='flex items-center gap-3'>
            {data?.profilePicture?.length ? (
              <img
                src={data?.profilePicture}
                alt=''
                width={30}
                height={30}
                className='rounded-full object-cover'
              />
            ) : (
              <PersonIcon className='rounded-full bg-gray-200 object-cover' />
            )}
            <span className='text-sm'>
              {data?.firstName} {data?.lastName}
            </span>
          </div>
        </div>
        <hr className='my-5 h-[0.5px] w-full bg-gray-500' />
        <div className='flex flex-col gap-5 text-sm'>
          <span className='text-lg font-medium'>Work posts</span>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => handleWorkCategory('1')}
          >
            <Image width={30} src={Technology} alt='' />
            <span>Technology</span>
          </div>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => handleWorkCategory('2')}
          >
            <Image width={30} src={Finance} alt='' />
            <span>Finance</span>
          </div>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => handleWorkCategory('3')}
          >
            <Image width={30} src={Marketing} alt='' />
            <span>Marketing</span>
          </div>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => handleWorkCategory('4')}
          >
            <Image width={30} src={Healthcare} alt='' />
            <span>Healthcare</span>
          </div>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => handleWorkCategory('5')}
          >
            <Image width={30} src={Education} alt='something' />
            <span>Education</span>
          </div>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => handleWorkCategory('6')}
          >
            <Image width={30} src={Legal} alt='' />
            <span>Legal</span>
          </div>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => handleWorkCategory('7')}
          >
            <Image width={30} src={Engineering} alt='' />
            <span>Engineering</span>
          </div>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => handleWorkCategory('8')}
          >
            <Image width={30} src={Retail} alt='' />
            <span>Retail</span>
          </div>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => handleWorkCategory('9')}
          >
            <Image width={30} src={Hospitality} alt='' />
            <span>Hospitality</span>
          </div>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => handleWorkCategory('10')}
          >
            <Image width={30} src={Government} alt='' />
            <span>Government</span>
          </div>
        </div>
        <hr className='my-5 h-[0.5px] w-full bg-gray-500' />
        <div className='flex flex-col gap-5 text-sm'>
          <span>Others</span>
          <div
            className='flex cursor-pointer items-center gap-3'
            onClick={() => {
              handleEntertainmentCategory('2')
            }}
          >
            <Image width={30} src={Entertainment} alt='' />
            <span>Entertainment</span>
          </div>
          {/*<div className='flex items-center gap-3'>*/}
          {/*  <Image width={30} src={Tutorials} alt='' />*/}
          {/*  <span>Tutorials</span>*/}
          {/*</div>*/}
          {/*<div className='flex items-center gap-3'>*/}
          {/*  <Image width={30} src={Courses} alt='' />*/}
          {/*  <span>Courses</span>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  )
}

export default LeftBar
