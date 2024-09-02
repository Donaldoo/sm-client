import Chats from '@/app/messages/Chats'
import MessagesHeader from '@/app/messages/MessagesHeader'
import MessagingWrapper from '@/app/messages/MessagingWrapper'

export default function MessagesPage({
  searchParams
}: {
  searchParams: { userId: string }
}) {
  console.log(searchParams.userId)
  return (
    <div className='m-auto mt-5 flex h-[87vh] max-h-[87vh] w-[80%] flex-col rounded-3xl bg-white px-10 py-5 shadow-md shadow-gray-400'>
      <MessagesHeader />
      <div className='flex h-full'>
        <Chats />
        {searchParams?.userId?.length && (
          <MessagingWrapper targetUserId={searchParams.userId} />
        )}
      </div>
    </div>
  )
}
