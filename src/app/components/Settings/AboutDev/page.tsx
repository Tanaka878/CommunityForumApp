'use client'
import Image from 'next/image';
import React from 'react';
import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaFacebook, FaWhatsapp, FaPhone, FaGithub, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const AboutDev = () => {
  const router = useRouter();

  function handleMail() {
    window.location.href = "mailto:musungaretanaka@gmail.com";
  }

  function LinkedIn() {
    window.open("https://www.linkedin.com/in/tanaka-musungare-26668a295/", "_blank");
  }

  function FaceBook() {
   // window.open("https://www.facebook.com/maxwell.musungare", "_blank");
  }

  function WhatsApp() {
    window.open("https://wa.me/message/6JACSMJBJ7DOA1");
  }

  function Phone() {
    window.location.href = "tel:+26378001324";
  }

  function GitHub() {
    window.open("https://github.com/Tanaka878", "_blank");
  }

  function NavigateBack() {
    router.push('/components/Settings/HomePage');
  }

  return (
    <div className='bg-slate-600 h-screen'>
      <div className='flex justify-center text-center'>
        <Image
          src={'/Images/header.png'}
          height={150}
          width={120}
          alt='Dev Image'
          className='rounded-full animate-bounce'
        />
      </div>

      <h1 className='text-5xl p-4 text-center text-rose-700'>Hi MATE .</h1>
      <p className='text-white tracking-tight font-extrabold flex justify-center items-center animate-pulse p-3'>
        My name is Tanaka Musungare, an INFORMATION SYSTEMS Student at Midlands State University
      </p>
      <div className='flex justify-center items-center pt-4'>
        <h1 className='animate-bounce text-slate-200 text-3xl'>Let’s Connect</h1>
      </div>

      <nav className='flex justify-center items-center space-x-4 py-4'>
        <button onClick={handleMail} className='transition-transform transform hover:scale-110'>
          <MdEmail className='p-2 h-14 w-14 text-white hover:text-blue-500 transition duration-300 ease-in-out' />
        </button>

        <button onClick={LinkedIn} className='transition-transform transform hover:scale-110'>
          <FaLinkedin className='p-2 h-14 w-14 text-white hover:text-blue-600 transition duration-300 ease-in-out' />
        </button>

        <button onClick={FaceBook} className='transition-transform transform hover:scale-110'>
          <FaFacebook className='p-2 h-14 w-14 text-white hover:text-blue-700 transition duration-300 ease-in-out' />
        </button>

        <button onClick={WhatsApp} className='transition-transform transform hover:scale-110'>
          <FaWhatsapp className='p-2 h-14 w-14 text-white hover:text-green-500 transition duration-300 ease-in-out' />
        </button>

        <button onClick={Phone} className='transition-transform transform hover:scale-110'>
          <FaPhone className='p-2 h-14 w-14 text-white hover:text-yellow-500 transition duration-300 ease-in-out' />
        </button>

        <button onClick={GitHub} className='transition-transform transform hover:scale-110'>
          <FaGithub className='p-2 h-14 w-14 text-white hover:text-black transition duration-300 ease-in-out' />
        </button>
      </nav>

      <nav className="flex justify-center items-center h-20 p-4 bg-gray-100 shadow-md">
        <button
          className="flex items-center justify-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
          onClick={NavigateBack}
        >
          <FaArrowLeft className="w-6 h-6 text-white" />
          Back
        </button>
      </nav>
    </div>
  );
};

export default AboutDev;
