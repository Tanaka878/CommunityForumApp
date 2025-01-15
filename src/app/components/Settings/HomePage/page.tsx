'use client'
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Settings = () => {
  const router = useRouter();

  function Privacy(){
    console.log('privacy tab clicked')
  }
   
  function Profile(){
    console.log('profile tab clicked')
  }

  function AboutDev(){
    router.push('/components/Settings/AboutDev')


  }
  return (
    <div className="p-7 bg-gray-500 h-full">
      <h1 className="text-center font-bold text-5xl text-black mb-6 p-11">Settings</h1>
      <nav className="space-y-4">
        {/* Profile Tab */}
        <div className="flex justify-between items-center border p-4 rounded-lg hover:bg-gray-100 transition duration-300">
          <h2 className="font-extrabold text-3xl" onClick={Profile}>Profile</h2>
          <ArrowRight className="text-black w-6 h-6 transition-transform duration-300 hover:translate-x-1" />
        </div>

        {/* Privacy Tab */}
        <div className="flex justify-between items-center border p-4 rounded-lg hover:bg-gray-100 transition duration-300" onClick={Privacy}>
          <h2 className="font-extrabold text-3xl">Privacy</h2>
          <ArrowRight className="text-black w-6 h-6 transition-transform duration-300 hover:translate-x-1" />
        </div>

        {/* About Developer Tab */}
        <div className="flex justify-between items-center border p-4 rounded-lg hover:bg-gray-100 transition duration-300">
          <h2 className="font-extrabold text-3xl" onClick={AboutDev}>About Developer</h2>
          <ArrowRight className="text-black w-6 h-6 transition-transform duration-300 hover:translate-x-1" />
        </div>
      </nav>
    </div>
  );
};

export default Settings;
