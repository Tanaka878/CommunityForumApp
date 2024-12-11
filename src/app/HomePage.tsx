'use client'
import React from 'react'
import ProfileImage from './components/GroupsContainer/ProfileImage'
import PersonalData from './components/ProfileData/PersonalData'
import GroupCommunityCard from './components/GroupCard/CommunityCard'
import SearchBar from './components/SearchBar/SearchBar'

const HomePage = () => {

  
    function handleSearch(): void {
      throw new Error('Function not implemented.')
    }

  return (
    <div>

      <nav className='flex bg-slate-600'>
        <ProfileImage/>
        <PersonalData/>
      </nav>

      <nav className='mt-2'>
        <h1 className='border-l-fuchsia-500 mt-2 font-extrabold justify-center mx-auto'>Communites</h1>
      </nav>

      <SearchBar onSearch={handleSearch}/>

      <div className='grid mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        <GroupCommunityCard/>
        <GroupCommunityCard/>
        <GroupCommunityCard/>
        <GroupCommunityCard/>
        <GroupCommunityCard/>

      </div>
      
    </div>
  )
}

export default HomePage
