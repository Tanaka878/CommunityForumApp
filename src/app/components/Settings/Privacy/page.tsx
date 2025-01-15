
'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const Privacy = () => {

    const router = useRouter();
    function NavigateBack(): void {
        router.push('/components/Settings/HomePage')
    }

  return (
    <div className="p-6 bg-slate-600 text-slate-200">
      <h2 className="text-2xl font-bold mb-4">Privacy Policy of Using the Community Forum App</h2>
      <p className="mb-2">
        We value your privacy. This app collects minimal data necessary for providing its services, such as your username, messages, and basic usage logs.
      </p>
      <p className="mb-2">
        All personal data is securely stored and will not be shared with third parties without your consent, except as required by law.
      </p>
      <p className="mb-2">
        By using this app, you agree to our data collection and usage practices. For questions, please contact me on musungaretanaka@gmail.com.
      </p>

      <nav className="flex justify-center items-center h-20 p-4 bg-gray-100 shadow-md">
            <button
                className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-slate-50 rounded-lg hover:bg-gray-800 transition-all" onClick={NavigateBack}>
                <FaArrowLeft className="w-6 h-6 text-slate-50" />
                Back
            </button>
        </nav>
    </div>
  );
};

export default Privacy;
