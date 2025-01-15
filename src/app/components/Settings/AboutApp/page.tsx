'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const AboutApp = () => {
    const router = useRouter();
    function NavigateBack(): void {
        router.push('/components/Settings/HomePage')
    }
  return (
    <div className="p-7 bg-gray-100 h-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Community Forum Application</h2>
      <p className="text-lg text-gray-700">
        Our Community Forum Application has officially launched! 🎉 It&apos;s designed to connect like-minded individuals in a space where discussions, knowledge-sharing, and collaboration can thrive. Whether you&apos;re here to ask questions, share insights, or debate the latest trends, we&apos;ve got you covered!
      </p>
      <p className="text-lg text-gray-700 mt-4">
        **Features include:**
        - Simple, intuitive design
        - Secure and private discussions
        - Real-time updates for an interactive experience
        - Easy navigation for a smooth user journey
      </p>
      <p className="text-lg text-gray-700 mt-4">
        Join the community today and start connecting with people who share your interests! We can’t wait to see the conversations unfold. 🚀
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

export default AboutApp;
