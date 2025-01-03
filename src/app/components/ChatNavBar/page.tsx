'use client';
import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Phone,Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';

interface ExploreProps {
  image: string | StaticImageData; 
  alt?: string; 
  groupId: number;
  groupName: string;
  descrip: string;
}

const ChatNavBar: React.FC<ExploreProps> = ({ image, alt = "", groupId, groupName, descrip })  => {
  const [isJoined, setIsJoined] = useState(false);
  const router = useRouter()

  console.log(groupId)
  console.log(descrip)
  /** */
  function handleNavigation(){
    router.push('/components/GroupsContainer/Container')

  }

  const handleJoin = () => {
    setIsJoined(true);
    // To be implemented
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-2 h-16">
      {/* Left section with back button and profile */}
      <div className="flex items-center space-x-3" onClick={handleNavigation}>
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex items-center space-x-3">
          {/* Profile Picture */}
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <Image 
              src={image} 
              alt={alt}
              height={30}
              width={30}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Chat Info */}
          <div className="flex flex-col">
            <span className="font-semibold  text-sm sm:text-base">{groupName}</span>
            <span className="text-xs text-gray-300">online</span>
          </div>
        </div>
      </div>

      {/* Right section with action buttons */}
      <div className="flex items-center space-x-2">
        {!isJoined && (
          <button 
            onClick={handleJoin}
            className="flex items-center space-x-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors text-xs sm:text-sm"
          >
            <Users size={18} />
            <span>Join Community</span>
          </button>
        )}
       {/*  <button className="p-2 hover:bg-gray-700 rounded-full">
          <Video size={24} />
        </button> */}
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
