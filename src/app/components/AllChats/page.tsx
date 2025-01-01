'use client'
import React from 'react'
import Explore from '../Explore/page'
import LastMessage from '../LastMessage/page'
import { useRouter } from 'next/navigation'

const ChatDisplay = () => {

  const router = useRouter()

  function OpenCummunity(): void {
    router.push('/components/ChatLayout')
    
  }

    /**For displaying non pinned chats on home page */
  return (
    <div className='flex' onClick={OpenCummunity}>
        <Explore groupId={1} 
        image={''}/>
        <LastMessage/>

      
    </div>
  )
}

export default ChatDisplay
