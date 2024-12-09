'use client'
import Image from "next/image";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const ProfileImage = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="relative w-32 h-32">
      {/* Profile Image */}
      <div className="w-full h-full rounded-full border-2 border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100">
        {image ? (
          <Image
            src={image}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      {/* Add/Change Icon */}
      <label
        htmlFor="fileInput"
        className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600"
      >
        <FaPlus />
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ProfileImage;
