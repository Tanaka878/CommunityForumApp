import React from 'react'
import { FaUser } from 'react-icons/fa'

const PinnedChat = () => {
    /**Containong icons for pinned chats a little bit bigger */
  return (
    <div className='p-4 bg-gray-400 rounded-lg  h-18 w-14'>
        <button className=''>
            <FaUser/>
        </button>
      
    </div>
  )
}

export default PinnedChat
