'use client'
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Settings = () => {
  const router = useRouter();

  function Privacy(){
    router.push('/components/Settings/Privacy');
  }

  function Profile(){
    console.log('profile tab clicked');
  }

  function AboutDev(){
    router.push('/components/Settings/AboutDev');
  }

  function AboutApp(){
    router.push('');
  }

  return (
    <div className="p-8 bg-gray-200 h-full">
      <h1 className="text-center font-bold text-4xl text-gray-800 mb-8">Settings</h1>
      <nav className="space-y-6">
        {/* Profile Tab */}
        <div className="flex justify-between items-center border border-gray-300 p-5 rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300">
          <h2 className="font-semibold text-2xl text-gray-700 cursor-pointer" onClick={Profile}>Profile</h2>
          <ArrowRight className="text-gray-600 w-6 h-6 transition-transform duration-300 hover:translate-x-2" />
        </div>

        {/* Privacy Tab */}
        <div className="flex justify-between items-center border border-gray-300 p-5 rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300" onClick={Privacy}>
          <h2 className="font-semibold text-2xl text-gray-700 cursor-pointer">Privacy</h2>
          <ArrowRight className="text-gray-600 w-6 h-6 transition-transform duration-300 hover:translate-x-2" />
        </div>

        {/* About Developer Tab */}
        <div className="flex justify-between items-center border border-gray-300 p-5 rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300">
          <h2 className="font-semibold text-2xl text-gray-700 cursor-pointer" onClick={AboutDev}>About Developer</h2>
          <ArrowRight className="text-gray-600 w-6 h-6 transition-transform duration-300 hover:translate-x-2" />
        </div>

        {/* About App Tab */}
        <div className="flex justify-between items-center border border-gray-300 p-5 rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300">
          <h2 className="font-semibold text-2xl text-gray-700 cursor-pointer" onClick={AboutApp}>About App</h2>
          <ArrowRight className="text-gray-600 w-6 h-6 transition-transform duration-300 hover:translate-x-2" />
        </div>
      </nav>
    </div>
  );
};

export default Settings;
