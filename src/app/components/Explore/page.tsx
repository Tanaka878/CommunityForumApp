import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface ExploreProps {
  image: string | StaticImageData; 
  alt?: string; 
}

const Explore: React.FC<ExploreProps> = ({ image, alt = '' }) => {
  function handleClick(){
    console.log("Explore Div clicked")
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
