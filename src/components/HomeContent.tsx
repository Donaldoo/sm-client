'use client'

import Stories from '@/components/Stories'
import Share from '@/components/Share'
import Posts from '@/components/Posts'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useCreateQueryString from '@/core/hooks/useCreateQueryString'

const HomeContent = ({
  category,
  workExperience,
  workIndustry
}: {
  category?: string
  workExperience?: string
  workIndustry?: string
}) => {
  const searchParams = useSearchParams()
  const { createQueryString } = useCreateQueryString(searchParams)
  const router = useRouter()
  const pathName = usePathname()

  const handleExperienceChange = (event: SelectChangeEvent) => {
    const params = createQueryString(
      'workExperience',
      event.target.value as string
    )
    router.push(pathName + '?' + params)
  }
  return (
    <div className='no-scrollbar flex max-h-[92vh] w-[110vh] flex-col overflow-scroll px-[30px] py-5'>
      <Stories />
      <Share />
      {category?.length && parseInt(category) === 1 && (
        <Box className='mb-5 w-1/4 self-end bg-white shadow-md'>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label' classes='bg-white'>
              Experience
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Experience'
              onChange={handleExperienceChange}
              value={workExperience}
            >
              <MenuItem value={1}>Full-time</MenuItem>
              <MenuItem value={2}>Part-time</MenuItem>
              <MenuItem value={3}>Internship</MenuItem>
              <MenuItem value={0}>All</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
      <Posts
        category={category}
        workExperience={workExperience}
        workIndustry={workIndustry}
      />
    </div>
  )
}

export default HomeContent
