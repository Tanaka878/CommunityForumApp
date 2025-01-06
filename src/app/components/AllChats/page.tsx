'use client'
import React from 'react'
import Explore from '../Explore/Explore'
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
      image={'/Images/animal-lover.jpeg'} groupName={'Tanaka'} description={'Hello'}/>
        <LastMessage/>

      
    </div>
  )
}

export default ChatDisplay
