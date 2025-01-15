'use client'
import Image from 'next/image';
import React from 'react'
import { MdEmail } from 'react-icons/md';
import { FaLinkedin ,FaFacebook,FaWhatsapp, FaPhone,FaGithub, FaArrowLeft} from 'react-icons/fa';
import { useRouter } from 'next/navigation';


const AboutDev = () => {
    const router = useRouter()
    function handleMail(){
        window.location.href ="mailto:musungaretanaka@gmail.com"
    }

    function LinkedIn(){
        window.open("https://www.linkedin.com/in/tanaka-musungare-26668a295/", "_blank");
    }

    function FaceBook(){
        window.open("https://www.facebook.com/maxwell.musungare", "_blank");
    }

    function WhatsApp(){
        window.open("https://wa.me/message/6JACSMJBJ7DOA1");
    }

    function Phone(){
        window.location.href = "tel:+26378001324";}

        function GitHub(){
            window.open("https://github.com/Tanaka878", "_blank");


        }

        function NavigateBack(){
            router.push('/components/Settings/HomePage')

        }

  return (
    <div className='bg-slate-600  h-screen'>
        <div className='flex justify-center text-center'>
            <Image
            src={'/Images/header.png'}
            height={150}
            width={120}
            alt='Dev Image'
            className='rounded-full text-center justify-center animate-bounce'
            />
        </div>
        
        <h1 className='text-5xl p-4 text-center first-letter:text-rose-700 '>Hi MATE .</h1>
        <p className='text-pretty tracking-tight font-extrabold flex justify-center items-center  animate-pulse text-slate-100 p-3'> My name is Tanaka Musungare an INFORMATION SYSTEMS Student at Midlands State University</p>
        <div className='flex justify-center items-center pt-4'>
            <h1 className='animate-bounce text-slate-200 text-3xl'>Let`s Connect</h1>
        </div>
        <nav  className='flex justify-center items-center'>
            <button type="button" onClick={handleMail} className=''>
                <MdEmail className=' p-2 h-14 w-11 hover:scale-105 transition duration-300 ease-in-out'/>
            </button>

            <button onClick={LinkedIn}>
            <FaLinkedin  className=' p-2 h-14 w-11 hover:scale-105 transition duration-300 ease-in-out'/>
            </button>

            <button onClick={FaceBook}>
            <FaFacebook  className=' p-2 h-14 w-11 hover:scale-105 transition duration-300 ease-in-out'/>
            </button>

            <button onClick={WhatsApp}>
            <FaWhatsapp  className=' p-2 h-14 w-11 hover:scale-105 transition duration-300 ease-in-out'/>
            </button>

            <button onClick={Phone}>
            <FaPhone  className=' p-2 h-14 w-11 hover:scale-105 transition duration-300 ease-in-out'/>
            </button>

            <button onClick={GitHub}>
            <FaGithub  className=' p-2 h-14 w-11 hover:scale-105 transition duration-300 ease-in-out'/>
            </button>


        </nav>

        <nav className="flex justify-center items-center h-20 p-4 bg-gray-100 shadow-md">
            <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-slate-50 rounded-lg hover:bg-gray-800 transition-all" onClick={NavigateBack}>
                <FaArrowLeft className="w-6 h-6 text-slate-50" />
                Back
            </button>
        </nav>

        
        
      
    </div>
  )
}

export default AboutDev
