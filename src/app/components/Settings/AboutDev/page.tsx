'use client'
import React from 'react'
import { MdEmail } from 'react-icons/md';


const page = () => {
    function handleMail(){
        window.location.href ="mailto:musungaretanaka@gmail.com"
    }
  return (
    <div>
        <nav  className='flex'>
            <button type="button" onClick={handleMail} className=''>
                <MdEmail className='h-14 w-11'/>
            </button>

        </nav>
        
        
      
    </div>
  )
}

export default page
