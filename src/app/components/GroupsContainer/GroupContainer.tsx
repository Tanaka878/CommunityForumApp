'use client'

import React from 'react'
import ProfileImage from './ProfileImage'
import Communities from './Communities'

const GroupContainer = () => {
  return (
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar (Profile & Communities) */}
      <div className="w-1/4 bg-white p-6 shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <ProfileImage />
        </div>
        <hr className="my-4 border-gray-300" />
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Communities</h2>
        <Communities />
      </div>

      {/* Divider between sidebar and main content */}
      <div className="border-l-4 border-gray-300 mx-4" />

      {/* Main Chat Area */}
      <div className="w-3/4 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Select a Community</h1>
        <p className="text-gray-500">Start chatting with your community by selecting one from the sidebar.</p>
      </div>

    </div>
  )
}

export default GroupContainer
