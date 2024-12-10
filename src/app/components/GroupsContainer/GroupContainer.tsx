'use client';

import React from 'react';
import ProfileImage from './ProfileImage';
import Communities from './Communities';

const GroupContainer = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar (Profile & Communities) */}
      <div className="w-1/4 bg-white p-6 shadow-md overflow-y-auto">
        <div className="flex flex-col items-center mb-6">
          <ProfileImage />
        </div>
        <hr className="my-4 border-gray-300" />
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Communities
        </h2>
        <Communities />
      </div>

      {/* Divider */}
      <div className="border-l-2 border-gray-200"></div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-white shadow-md rounded-lg overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-left">
          Select a Community
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Start chatting with your community by selecting one from the sidebar.
        </p>
      </div>
    </div>
  );
};

export default GroupContainer;
