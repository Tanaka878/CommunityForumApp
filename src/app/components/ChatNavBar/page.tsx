// src/app/components/ChatNavBar/page.tsx

'use client';

import React, { useState } from 'react';
import { ArrowLeft, MoreVertical, Phone, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';

// Interface for props
interface ChatNavBarProps {
  image: string | StaticImageData;
  alt: string;
  groupId: number;
  groupName: string;
  description: string;
}

const ChatNavBar: React.FC<ChatNavBarProps> = ({ image, alt, groupId, groupName, description }) => {
  const [isJoined, setIsJoined] = useState(false);
  const router = useRouter();

  function handleNavigation() {
    console.log(description, groupId);
    router.push(`/groups/${groupId}`); // Dynamic routing based on groupId
  }

  const handleJoin = () => {
    setIsJoined(true);
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-2 h-16">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={handleNavigation}>
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <Image
              src={image}
              alt={alt}
              height={30}
              width={30}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base">{groupName}</span>
            <span className="text-xs text-gray-300">online</span>
          </div>
        </div>
      </div>
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
