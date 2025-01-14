'use client'
import Image from 'next/image';
import React from 'react'
import { MdEmail } from 'react-icons/md';


const page = () => {
    function handleMail(){
        window.location.href ="mailto:musungaretanaka@gmail.com"
    }
  return (
    <div className='bg-slate-600'>
        <Image
        src={'/Images/header.png'}
        height={150}
        width={120}
        alt='Dev Image'
        className='rounded-full text-center justify-center'
        />
        <h1 className='text-5xl p-4 text-center first-letter:text-rose-700 '>Hi MATE .</h1>
        <p className='text-pretty tracking-tight'> My name is Tanaka Musungare an INFORMATION SYSTEMS Student at Midlands State University</p>
        <nav  className='flex'>
            <button type="button" onClick={handleMail} className=''>
                <MdEmail className='h-14 w-11'/>
            </button>

        </nav>
        
        
      
    </div>
  )
}

export default page
