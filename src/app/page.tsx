import LeftBar from '@/components/LeftBar'
import RightBar from '@/components/RightBar'
import HomeContent from '@/components/HomeContent'

export default function Home() {
  return (
    <div className='flex justify-between gap-5'>
      <LeftBar />
      <HomeContent />
      <RightBar />
    </div>
  )
}
