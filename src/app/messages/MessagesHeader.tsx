import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

const MessagesHeader = () => {
  return (
    <div className='flex w-full items-center justify-between border-b border-gray-300 pb-7'>
      <div className='flex items-center gap-5'>
        <h1 className='text-3xl font-medium'>Messages</h1>
      </div>
      <div className='flex w-[400px] items-center gap-4 rounded border p-3 text-xl'>
        <SearchOutlinedIcon />
        <input className='outline-0' type='text' placeholder='Search...' />
      </div>
    </div>
  )
}

export default MessagesHeader
