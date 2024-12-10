'use client';

import React from 'react';

const PersonalData = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        {/* Profile Image */}
       

        {/* User Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Jane Doe</h2>
          <p className="text-gray-500">Community Member</p>
          <p className="text-sm text-gray-400">Joined: January 2021</p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Intrest</h3>
        <p className="text-gray-600 mt-2">
          Lorem ipsum dolor sit amet,.
        </p>
      </div>

      {/* Location & Contact */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Location</h3>
          <p className="text-gray-600">New York, USA</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
          <p className="text-gray-600">jane.doe@example.com</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="mt-6 flex gap-6">
        <a href="https://twitter.com" target="_blank" className="text-blue-500 hover:text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M23 3a10.92 10.92 0 0 1-3.14 1.04A5.47 5.47 0 0 0 22.46 1a10.9 10.9 0 0 1-3.47 1.3A5.42 5.42 0 0 0 16.87 0a5.42 5.42 0 0 0-5.42 5.42c0 .43.05.85.14 1.25a15.31 15.31 0 0 1-11.08-5.6A5.42 5.42 0 0 0 3.59 5.3a5.4 5.4 0 0 0 2.2-.61c-1.19 4.15 2.63 8.01 6.55 8.86a5.45 5.45 0 0 1-2.48.09c.68 2.12 2.64 3.67 5.03 3.72A10.92 10.92 0 0 1 1 19.29a15.26 15.26 0 0 0 8.24 2.41c9.91 0 15.31-8.21 15.31-15.31 0-.23 0-.46-.02-.69A10.92 10.92 0 0 0 23 3z"
            />
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" className="text-blue-700 hover:text-blue-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 8a6 6 0 1 0-12 0 6 6 0 0 0 12 0ZM0 20a8 8 0 1 1 16 0H0z"
            />
          </svg>
        </a>
        <a href="https://github.com" target="_blank" className="text-gray-700 hover:text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PersonalData;

