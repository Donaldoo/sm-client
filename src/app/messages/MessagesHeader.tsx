import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined'

const MessagesHeader = () => {
  return (
    <div className='flex w-full items-center justify-between border-b border-gray-300 pb-7'>
      <div className='flex items-center gap-5'>
        <h1 className='text-3xl font-medium'>Messaging</h1>
        <div className='flex items-center gap-4 rounded border p-3'>
          <SearchOutlinedIcon />
          <input className='outline-0' type='text' placeholder='Search...' />
        </div>
      </div>
      <MapsUgcOutlinedIcon className='h-10 w-10 cursor-pointer' />
    </div>
  )
}

export default MessagesHeader
