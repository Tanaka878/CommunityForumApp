'use client';

import React from 'react';

const PersonalData = (props) => {
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        {/* Profile Image */}
       

        {/* User Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{props.name}</h2>
          <p className="text-sm text-gray-400">{props.joinDate}</p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800">Intrest</h3>
        <p className="text-gray-600 mt-2">
          Lorem ipsum dolor sit amet,.
        </p>
      </div>

     
        
        
    
    </div>
  );
};

export default PersonalData;

