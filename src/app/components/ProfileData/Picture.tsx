'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Picture = () => {
  const [image, setImage] = useState<string | null>(null);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Profile Image */}
      <div className="relative mb-4">
        <Image
          src={image || '/default-profile.jpg'} // Fallback image if no upload
          alt="Profile"
          width={128} // Set width for image optimization
          height={128} // Set height for image optimization
          className="rounded-full object-cover border-4 border-white shadow-lg"
        />
        {/* Upload Button */}
        <label
          htmlFor="file-upload"
          className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

    
    </div>
  );
};

export default Picture;
