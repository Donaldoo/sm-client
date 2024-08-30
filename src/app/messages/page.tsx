import Chats from '@/app/messages/Chats'
import MessagesHeader from '@/app/messages/MessagesHeader'
import MessagingWrapper from '@/app/test/MessagingWrapper'

const MessagesPage = () => {
  return (
    <div className='m-auto mt-5 flex h-[87vh] max-h-[87vh] w-3/4 flex-col rounded-3xl bg-white px-10 py-5 shadow-md shadow-gray-400'>
      <MessagesHeader />
      <div className='flex h-full'>
        <Chats />
        <MessagingWrapper
          targetUserId={'66992f72-f878-4740-8c62-3b02328b116e'}
        />
      </div>
    </div>
  )
}

export default MessagesPage
