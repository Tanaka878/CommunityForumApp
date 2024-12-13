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
    <div className="flex flex-col items-center justify-between w-full h-64 bg-white border border-gray-300 rounded-lg shadow-md p-4">
      {/* Image Section */}
      <div className="w-full h-28 bg-gray-100 rounded-full overflow-hidden">
        <img
          src={image}
          alt={`${groupName} image`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Group Name */}
      <h3 className="text-sm font-semibold text-gray-800 mt-4 text-center">
        {groupName}
      </h3>
      {/* Join Button */}
      <button
        onClick={onJoin}
        className="px-4 py-1 mt-auto bg-blue-500 text-white text-xs font-medium rounded-md hover:bg-blue-600 transition"
      >
        Join
      </button>
    </div>
  );
};

export default CommunityCard;
