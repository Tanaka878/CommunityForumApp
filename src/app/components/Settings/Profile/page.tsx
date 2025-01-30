import Image from 'next/image'
import React from 'react'

const Profile = () => {
  return (
    <div className='text-black p-4'>
      <nav className='flex text-center justify-center'>
        <h1 className='text-black'>Profile</h1>
      </nav>
      <div className='flex justify-center text-center'>

        <div>
          <Image src={'/Image/'} alt={''} className='rounded-lg w-1/6'/>
        </div>
       
        <div className='grid-cols-1'>
          <h3 className='font-extrabold'>James Musungare</h3>
          <h3>musungaretanaka@gmail.com</h3>
        </div>

      </div>

      
      



      
    </div>
  )
}

export default Profile
