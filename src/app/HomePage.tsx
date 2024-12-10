'use client'

import React from 'react'
import Picture from './components/ProfileData/Picture'
import PersonalData from './components/ProfileData/PersonalData'

const HomePage = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-center p-4 bg-white shadow-md">
        {/* For containing the top corner */}
        <div className="flex items-center space-x-6">
          <Picture />
          <PersonalData />
        </div>
      </div>
    </div>
  )
}

export default HomePage
