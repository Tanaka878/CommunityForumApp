import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

interface ExploreProps {
  image: string | StaticImageData; 
  alt?: string; 
  groupId:number
  groupName:string
  
}

const Explore: React.FC<ExploreProps> = ({ image, alt = '' , groupId}, groupName) => {

  const router = useRouter()
  function handleClick(){
    console.log("the group Name : " , groupName)
    console.log("Explore Div clicked  :" , groupId)

    router.push('/components/ChatLayout')


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
