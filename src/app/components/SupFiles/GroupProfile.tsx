import Image from "next/image";
import React from "react";

const GroupProfile = () => {
  // Path to the image
  const imagePath = "/images/group-profile.jpg"; // Replace with your image path

  return (
    <div className="relative w-2 h-2 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32">
      {/* Profile Image */}
      <div className="w-full h-full rounded-full border border-gray-300 overflow-hidden bg-gray-100">
        <Image
          src={imagePath}
          alt="Group Profile"
          className="object-cover w-full h-full"
          width={20} // Optimal resolution for small screens
          height={20}
        />
      </div>
    </div>
  );
};

export default GroupProfile;
