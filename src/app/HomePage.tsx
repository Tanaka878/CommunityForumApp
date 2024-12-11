'use client';

import React from 'react';
import Picture from './components/ProfileData/Picture';
import PersonalData from './components/ProfileData/PersonalData';
import SearchBar from './components/SearchBar/SearchBar';
import CommunityCard from './components/GroupCard/CommunityCard';

const HomePage = () => {
  function handleSearch() {
    console.log('Searching...');
  }

  return (
    <div>
      {/* Fixed header with centered content */}
      <div className=" fixed top-0 left-0 right-0 z-10 flex justify-center items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-6">
          <Picture />
          <PersonalData />
        </div>
      </div>

      {/* Main Content Section */}
      <div className="mt-24 p-4 space-y-6">  {/* Adjusted top margin to offset the fixed header */}
        {/* Navigation Buttons */}
        <nav className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Update Profile
          </button>
          <button className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
            Complete Profile
          </button>
        </nav>

        <hr />

       
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Communities</h2>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />

          {/* Community Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6 mt-20 p-4 space-y-6">
            {/* Hard-coded Community Cards */}
            <CommunityCard />
            <CommunityCard />
            <CommunityCard />
            <CommunityCard />
            <CommunityCard />
            <CommunityCard />
          </div>
      
      </div>
    </div>
  );
};

export default HomePage;
