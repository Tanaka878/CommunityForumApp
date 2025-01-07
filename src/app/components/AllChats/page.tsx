import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BASE_URL from '@/app/config/api';

// Define the type to match CommunityData
interface CommunityData {
  id: number;
  communityName: string;
  communityDescription: string;
  communitySize: number;
  userIds: number[];
}

interface GroupPreviewProps {
  id: number; // Attach the unique group ID
  imageUrl?: string; // Optional: Placeholder image URL
  name: string;
  lastMessage: string;
  timestamp: string;
}

const GroupPreview = ({
  id,
  imageUrl = '/Images/placeholder-image.jpeg', // Default image
  name,
  lastMessage,
  timestamp,
}: GroupPreviewProps) => {
  const handleGroupClick = () => {
    console.log(`Group ID: ${id}`);
    // You can navigate to a group-specific page or perform any action
    // Example: router.push(`/group/${id}`);
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
            <span className="text-sm text-gray-500 flex-shrink-0">{timestamp}</span>
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

  // Replace with actual email or dynamically fetch it
  const email = localStorage.getItem("email") 

  function pictureSelection(communityId: number): string {
    switch (communityId) {
      case 1:
        return "/Images/music-lover.webp";
      case 2:
        return "/Images/food-lover.png";
      default:
        return "/Images/animal-lover.jpeg";
    }
  }

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/communities/getCommunities/${email}`, // Adjust URL and port if needed
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch communities. Status: ${response.status}`);
        }

        const data: CommunityData[] = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error("Error fetching communities:", error);
        setError("Failed to fetch communities.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [email]);

  const desc = 'Hello';

  return (
    <section className="mt-6 px-4 flex-grow">
      <h1 className="text-lg font-semibold mb-4">My Communities</h1>
      <div className="w-full max-w-3xl mx-auto p-2">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : communities.length === 0 ? (
          <div className="flex items-center justify-center">
            <NoData /> {/* Render when no communities are available */}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            {communities.map((community) => (
              <GroupPreview
                key={community.id}
                id={community.id} // Attach the unique ID
                name={community.communityName}
                lastMessage={desc}
                timestamp={`${community.communitySize} members`}
                imageUrl={pictureSelection(community.id)} // Adjust to a real image if available
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
