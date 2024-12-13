/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';

type CommunityCardProps = {
  image?: string;
  groupName?: string;
  onJoin?: () => void;
};

const CommunityCard: React.FC<CommunityCardProps> = ({
  image = 'https://via.placeholder.com/150',
  groupName = 'Community Name',
  onJoin = () => console.log('Join clicked!'),
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-sm h-72 bg-white border border-gray-300 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
      {/* Image Section */}
      <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-200">
        <img
          src={image}
          alt={`Community: ${groupName}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Group Name */}
      <h3 className="mt-4 text-lg font-medium text-gray-800 text-center line-clamp-2">
        {groupName}
      </h3>

      {/* Join Button */}
      <button
        onClick={onJoin}
        className="mt-auto px-6 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
      >
        Join
      </button>
    </div>
  );
};

export default CommunityCard;
