import React from 'react'
import Explore from '../Explore/page'
import LastMessage from '../LastMessage/page'

const ChatDisplay = () => {
    /**For displaying non pinned chats on home page */
  return (
    <div className='flex'>
        <Explore/>
        <LastMessage/>

      
    </div>
  )
}

export default ChatDisplay
