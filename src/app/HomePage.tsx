'use client'
import React from 'react'
import ProfileImage from './components/GroupsContainer/ProfileImage'
import PersonalData from './components/ProfileData/PersonalData'
import GroupCommunityCard from './components/GroupCard/CommunityCard'

const HomePage = () => {
  return (
    <div>

      <nav className='flex bg-slate-600'>
        <ProfileImage/>
        <PersonalData/>
      </nav>

      <div className='grid mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        <GroupCommunityCard/>
        <GroupCommunityCard/>
        <GroupCommunityCard/>
      </div>
      
    </div>
  )
}

export default HomePage
