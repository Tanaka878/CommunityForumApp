'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BASE_URL from '@/app/config/api';
import { useRouter } from 'next/navigation';

// Define the type to match CommunityData
interface CommunityData {
  id: number;
  communityName: string;
  communityDescription: string;
  communitySize: number;
  userIds: number[];
}

interface GroupPreviewProps {
  id: number; 
  imageUrl?: string; 
  name: string;
  lastMessage: string;
  //timestamp: string;
  description: string; 
}

const GroupPreview = ({
  id,
  imageUrl = '/Images/placeholder-image.jpeg', 
  name,
  lastMessage,
 // timestamp,
  description, // Destructure description
}: GroupPreviewProps) => {
  const router = useRouter();

  const handleGroupClick = () => {
    console.log(`Group ID: ${id}`);
    router.push(
      `/components/ChatLayout?id=${id}&description=${encodeURIComponent(
        description
      )}&groupName=${encodeURIComponent(name)}`
    );
  };

  return (
    <div
      className="group border-b last:border-b-0 border-gray-100"
      onClick={handleGroupClick}
    >
      <div className="flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-all duration-200 transform hover:scale-[1.01]">
        {/* Group Image */}
        <div className="flex-shrink-0 relative">
          <Image
            src={imageUrl}
            alt={name}
            width={50}
            height={50}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-blue-100 transition-all"
          />
        </div>

        {/* Group Info */}
        <div className="flex-grow min-w-0 py-1">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            <span className="text-sm text-gray-500 flex-shrink-0"></span>
          </div>
          <p className="text-sm text-gray-500 truncate group-hover:text-gray-600">
            {lastMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

const GroupList = () => {
  const [communities, setCommunities] = useState<CommunityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function pictureSelection(communityId: number): string {
    switch (communityId) {
      case 1:
        return "/Images/web dev.jpg";

      case 2:
        return "/Images/gamers.jpeg";

      case 3:
        return "/Images/career.png";

      case 4:
        return "/Images/music-lover.webp";

      case 5:
        return "/Images/jsscript.png";

      case 6:
        return "/Images/javaImg0.png";

      case 7 :
        return "/Images/hiking.jpeg";

      case 8 :
        return "/Images/food-lover.png";

      case 9 : 
        return "/Images/animal-lover.jpeg";

      default:
        return "/Images/noImage.jpeg"
    }
  }

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const storedEmail =
          typeof window !== 'undefined' ? localStorage.getItem('email') : null;

        if (!storedEmail) {
          setError('Email not found in localStorage.');
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${BASE_URL}/api/communities/getCommunities/${storedEmail}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch communities. Status: ${response.status}`);
        }

        const data: CommunityData[] = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error('Error fetching communities:', error);
        setError('Failed to fetch communities.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  return (
    <section className="mt-6 px-4 flex-grow">
      <div className="w-full max-w-3xl mx-auto p-2">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : communities.length === 0 ? (
          <div className="flex items-center justify-center">
            <NoData />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            {communities.map((community) => (
              <GroupPreview
                key={community.id}
                id={community.id}
                name={community.communityName}
                lastMessage={community.communityDescription} // You can replace this with actual last message logic
               // timestamp={`${community.communitySize} members`}
                imageUrl={pictureSelection(community.id)}
                description={community.communityDescription} // Pass the description here
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const NoData = () => (
  <div className="text-center text-gray-500">
    <p>No communities found. Join or create a community to get started!</p>
  </div>
);

export default GroupList;
