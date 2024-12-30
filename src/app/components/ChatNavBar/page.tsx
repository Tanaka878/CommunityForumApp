import React from 'react';
import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';

const ChatNavBar = () => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-2 h-16">
      {/* Left section with back button and profile */}
      <div className="flex items-center space-x-3">
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex items-center space-x-3">
          {/* Profile Picture */}
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img 
              src="/api/placeholder/40/40" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Chat Info */}
          <div className="flex flex-col">
            <span className="font-semibold text-base">Chat Name</span>
            <span className="text-xs text-gray-300">online</span>
          </div>
        </div>
      </div>

      {/* Right section with action buttons */}
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <Video size={24} />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <Phone size={24} />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <MoreVertical size={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatNavBar;