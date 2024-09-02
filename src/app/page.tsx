import LeftBar from '@/components/LeftBar'
import RightBar from '@/components/RightBar'
import HomeContent from '@/components/HomeContent'

export default function Home({
  searchParams
}: {
  searchParams: {
    category?: string
    workExperience?: string
    workIndustry?: string
  }
}) {
  return (
    <div className='flex justify-between gap-5'>
      <LeftBar />
      <HomeContent
        workExperience={searchParams.workExperience}
        workIndustry={searchParams.workIndustry}
        category={searchParams.category}
      />
      <RightBar />
    </div>
  )
}
