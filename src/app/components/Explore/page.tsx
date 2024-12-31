import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface ExploreProps {
  image: string | StaticImageData; // Accepts either a string or StaticImageData
  alt?: string; // Optional alt text
}

const Explore: React.FC<ExploreProps> = ({ image, alt = 'Explore icon' }) => {
  return (
    <div className="p-4 bg-gray-400 rounded-lg h-12 w-12 relative">
      <button className="relative h-full w-full">
        <Image
          src={image} // Dynamic image URL from props
          alt={alt} // Use the provided alt text or default value
          fill // Makes the image fill its container
          className="rounded-full object-cover" // Ensures the image is circular and cropped properly
        />
      </button>
    </div>
  );
};

export default Explore;
