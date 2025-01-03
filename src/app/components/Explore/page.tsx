'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

// Renaming the interface to match the component
interface ExploreProps {
  image: string | StaticImageData;
  alt?: string;
  groupId: number;
  groupName: string;
  description: string;
}

const Explore: React.FC<ExploreProps> = ({ image, alt = "Image", groupId, groupName, description }) => {
  const router = useRouter();

  function handleClick() {
    console.log("The group name:", groupName);
    console.log("Description:", description);
    console.log("Explore Div clicked:", groupId);

    // Navigate to a specific route with query parameters
    router.push(
      `/components/ChatLayout?id=${groupId}&description=${encodeURIComponent(
        description
      )}&groupName=${encodeURIComponent(groupName)}`
    );
  }

  return (
    <div className=" bg-gray-400 rounded-lg h-12 w-12 relative" onClick={handleClick}>
      <button className="relative h-full w-full">
        <Image
          src={image}
          alt={alt}
          fill
          className="rounded-full object-cover"
        />
      </button>
    </div>
  );
};

export default Explore;
