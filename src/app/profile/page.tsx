import LeftBar from '@/components/LeftBar'
import RightBar from '@/components/RightBar'
import ProfileContent from '@/app/profile/ProfileContent'

export default function ProfilePage({
  searchParams
}: {
  searchParams: { userId: string }
}) {
  return (
    <div className='flex justify-between gap-5 overflow-hidden'>
      <LeftBar />
      <ProfileContent userId={searchParams.userId} />
      <RightBar />
    </div>
  )
}
