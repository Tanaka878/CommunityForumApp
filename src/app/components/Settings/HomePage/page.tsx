'use client';
import React, { Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const SettingsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Retrieve `id` from search parameters
  const id = searchParams.get('id');

  const NavigateBack = () => {
    router.push('/components/GroupsContainer/Container');
  };

  const Privacy = () => {
    if (id) {
      router.push(`/components/Settings/Privacy?id=${id}`);
    } else {
      console.error('ID parameter is missing');
    }
  };

  const Profile = () => {
    console.log('Profile tab clicked');
  };

  const AboutDev = () => {
    router.push('/components/Settings/AboutDev');
  };

  const AboutApp = () => {
    router.push('/components/Settings/AboutApp');
  };

  return (
    <div className="p-8 bg-gray-200 h-full">
      <h1 className="text-center font-bold text-4xl text-gray-800 mb-8">Settings</h1>
      <nav className="space-y-6">
        {/* Profile Tab */}
        <div
          className="flex justify-between items-center border border-gray-300 p-5 rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300"
          onClick={Profile}
        >
          <h2 className="font-semibold text-2xl text-gray-700 cursor-pointer">Profile</h2>
          <ArrowRight className="text-gray-600 w-6 h-6 transition-transform duration-300 hover:translate-x-2" />
        </div>

        {/* Privacy Tab */}
        <div
          className="flex justify-between items-center border border-gray-300 p-5 rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300"
          onClick={Privacy}
        >
          <h2 className="font-semibold text-2xl text-gray-700 cursor-pointer">Privacy</h2>
          <ArrowRight className="text-gray-600 w-6 h-6 transition-transform duration-300 hover:translate-x-2" />
        </div>

        {/* About Developer Tab */}
        <div
          className="flex justify-between items-center border border-gray-300 p-5 rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300"
          onClick={AboutDev}
        >
          <h2 className="font-semibold text-2xl text-gray-700 cursor-pointer">About Developer</h2>
          <ArrowRight className="text-gray-600 w-6 h-6 transition-transform duration-300 hover:translate-x-2" />
        </div>

        {/* About App Tab */}
        <div
          className="flex justify-between items-center border border-gray-300 p-5 rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300"
          onClick={AboutApp}
        >
          <h2 className="font-semibold text-2xl text-gray-700 cursor-pointer">About App</h2>
          <ArrowRight className="text-gray-600 w-6 h-6 transition-transform duration-300 hover:translate-x-2" />
        </div>
      </nav>

      <nav className="flex justify-center items-center h-20 p-4 bg-gray-100 shadow-md">
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-slate-50 rounded-lg hover:bg-gray-800 transition-all"
          onClick={NavigateBack}
        >
          <FaArrowLeft className="w-6 h-6 text-slate-50" />
          Back
        </button>
      </nav>
    </div>
  );
};

const Settings: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading Settings...</div>}>
      <SettingsContent />
    </Suspense>
  );
};

export default Settings;
