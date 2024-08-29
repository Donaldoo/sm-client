import Stories from '@/components/Stories'
import Share from '@/components/Share'
import Posts from '@/components/Posts'

const HomeContent = () => {
  return (
    <div className='no-scrollbar flex max-h-[92vh] w-[110vh] flex-col overflow-scroll px-[30px] py-5'>
      <Stories />
      <Share />
      <Posts />
    </div>
  )
}

export default HomeContent
