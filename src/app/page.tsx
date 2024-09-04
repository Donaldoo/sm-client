import LeftBar from '@/components/LeftBar'
import RightBar from '@/components/RightBar'
import HomeContent from '@/components/HomeContent'
import Post from '@/components/Post'
import SinglePost from '@/components/SinglePost'

export default function Home({
  searchParams
}: {
  searchParams: {
    category?: string
    workExperience?: string
    workIndustry?: string
    postId?: string
  }
}) {
  if (searchParams.postId) {
    return (
      <div className='flex justify-between gap-5'>
        <LeftBar />
        <SinglePost postId={searchParams.postId} />
        <RightBar />
      </div>
    )
  }

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
