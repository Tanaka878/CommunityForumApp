'use client'
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ExploreProps {
  image: string | StaticImageData;
  alt?: string;
  groupId: number;
  groupName: string;
  description: string;
}


const PinnedChat: React.FC<ExploreProps> = ({ image, alt = "Image", groupId, groupName, description }) => {
  const router= useRouter()

  function handleClick() {
    console.log("The group name:", groupName);
    console.log("Description:", description);
    console.log("Explore Div clicked:", groupId);

    
    router.push(
      `/components/ChatLayout?id=${groupId}&description=${encodeURIComponent(
        description
      )}&groupName=${encodeURIComponent(groupName)}`
    );
  }
    /**Containong icons for pinned chats a little bit bigger */
  return (
    <div
  className="p-1 bg-gray-400 rounded-lg h-36 w-1/3 flex items-center justify-center min-w-[20%] sm:w-[30%] md:w-[200px]"
  onClick={handleClick}
>
  <button className="h-full w-full">
    <Image
      src={image}
      alt={alt}
      height={300}
      width={200}
      className="rounded-lg object-cover h-full w-full"
    />
  </button>
</div>

  )
}

export default PinnedChat
