'use client'
import Image from 'next/image';
import React from 'react'
import { MdEmail } from 'react-icons/md';
import { FaLinkedin ,FaFacebook,FaWhatsapp, FaPhone} from 'react-icons/fa';

const page = () => {
    function handleMail(){
        window.location.href ="mailto:musungaretanaka@gmail.com"
    }
  return (
    <div className='bg-slate-600 min-h-full max-h-screen'>
        <div className='flex justify-center text-center'>
            <Image
            src={'/Images/header.png'}
            height={150}
            width={120}
            alt='Dev Image'
            className='rounded-full text-center justify-center animate-spin'
            />
        </div>
        
        <h1 className='text-5xl p-4 text-center first-letter:text-rose-700 '>Hi MATE .</h1>
        <p className='text-pretty tracking-tight font-extrabold flex justify-center  animate-pulse'> My name is Tanaka Musungare an INFORMATION SYSTEMS Student at Midlands State University</p>
        <nav  className='flex justify-center items-center'>
            <button type="button" onClick={handleMail} className=''>
                <MdEmail className=' p-2 h-14 w-11 hover:scale-105 transition duration-300 ease-in-out'/>
            </button>

            <button>
            <FaLinkedin  className=' p-2 h-14 w-11 hover:scale-105 transition duration-300 ease-in-out'/>
            </button>

            <button>
            <FaFacebook  className=' p-2 h-14 w-11 hover:scale-105 transition duration-300 ease-in-out'/>
            </button>

            <button>
            <FaWhatsapp  className=' p-2 h-14 w-11 hover:scale-105 transition duration-300 ease-in-out'/>
            </button>

            <button>
            <FaPhone  className=' p-2 h-14 w-11 hover:scale-105 transition duration-300 ease-in-out'/>
            </button>

        </nav>
        
        
      
    </div>
  )
}

export default page
