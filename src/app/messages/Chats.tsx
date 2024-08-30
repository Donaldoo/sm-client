const Chats = () => {
  return (
    <div className='h-full w-2/5 border-r border-gray-300'>
      <div className='my-5 flex items-center gap-5'>
        <div className='relative flex items-center gap-5'>
          <img
            className='h-24 w-24 rounded-full object-cover'
            src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
            alt=''
          />
          <div className='absolute bottom-1 right-[65px] h-6 w-6 rounded-full border-2 border-green-700 bg-green-500' />
        </div>
        <div className='flex w-3/4 flex-col border-b border-gray-300 py-5'>
          <div className='flex items-center justify-between'>
            <span className='text-2xl font-medium'>Jane Doe</span>
            <span className='text-xl font-normal'>28 November 2024</span>
          </div>
          <span className='text-xl'>Hello</span>
        </div>
      </div>

      <div className='my-5 flex items-center gap-5'>
        <div className='relative flex items-center gap-5'>
          <img
            className='h-24 w-24 rounded-full object-cover'
            src='https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600'
            alt=''
          />
          <div className='absolute bottom-1 right-[65px] h-6 w-6 rounded-full border-2 border-green-700 bg-green-500' />
        </div>
        <div className='flex w-3/4 flex-col border-b border-gray-300 py-5'>
          <div className='flex items-center justify-between'>
            <span className='text-2xl font-medium'>Jane Doe</span>
            <span className='text-xl font-normal'>28 November 2024</span>
          </div>
          <span className='text-xl'>Hello</span>
        </div>
      </div>
    </div>
  )
}

export default Chats
