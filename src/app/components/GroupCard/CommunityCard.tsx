'use client';

import React from 'react';

const GroupCommunityCard: React.FC = () => {
  // Hardcoded data
  const image = 'https://via.placeholder.com/150'; // Replace with your image URL
  const groupName = 'Tech Enthusiasts'; // Example group name
  const onJoin = () => alert('You have joined the group!'); // Example action for the button

  return (
<div className="flex flex-col items-center justify-between w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-md p-4">
<div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
        <img
          src={image}
          alt={`${groupName} image`}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mt-4">{groupName}</h3>
      <button
        onClick={onJoin}
        className="px-4 py-2 mt-auto bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
      >
        Join
      </button>
    </div>
  );
};

export default GroupCommunityCard;
