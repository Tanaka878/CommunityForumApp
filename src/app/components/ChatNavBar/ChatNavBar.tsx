'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, MoreVertical, Phone, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import BASE_URL from '@/app/config/api';

function ChatNavBar({
  image,
  alt,
  groupId,
  groupName,
  description,
  onJoin,
  onExit,
}: {
  image: string | StaticImageData;
  alt: string;
  groupId: number;
  groupName: string;
  description: string;
  onJoin?: (groupId: number) => void;
  onExit? :(groupId :number) =>void;
}) {
  const [isJoined, setIsJoined] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisble] = useState(false)

  const handleNavigation = () => {
    console.log(description, groupId,loading,error);
    router.push(`/components/GroupsContainer/Container`);
  };

  //checking if user is part of the group
  interface ApiResponse {
    status: number;
    message: string;
  }

  // Function to check user membership
  async function checkUserMembership(groupId: number): Promise<ApiResponse> {
    const email = localStorage.getItem("email");

    if (!email) {
      return {
        status: 400,
        message: "Email not found in local storage",
        
      };
    }
    console.log('check for user membership')

    const endpoint = `${BASE_URL}/api/communities/isMember/${encodeURIComponent(email)}/${groupId}`;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const message = await response.text(); // Assuming the backend sends plain text as the message body.

      return {
        status: response.status,
        message: message,
      };
    } catch (error) {
      console.error("Error checking user membership:", error);
      return {
        status: 500,
        message: "An error occurred while connecting to the server.",
      };
    }
  }

  // Memoize the updateMembershipStatus function to avoid unnecessary re-renders
  const updateMembershipStatus = useCallback(async (groupId: number) => {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      const response = await checkUserMembership(groupId);

      if (response.status === 200) {
        setIsJoined(true); // User is part of the group
      } else if (response.status === 403) {
        setIsJoined(false); // User is not part of the group
      } else {
        setError(response.message); // Handle unexpected responses
      }
    } catch (error) {
      console.error("Error updating membership status:", error);
      setError("Failed to update membership status.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  }, []);

  // Trigger membership status update on groupId change
  useEffect(() => {
    updateMembershipStatus(groupId);
  }, [groupId, updateMembershipStatus]);

  const handleJoin = () => {
    setIsJoined(true);
    onJoin?.(groupId);
  };

  //code to exit the group
  function changeModal(){
    console.log("Modal changed")
    setIsModalVisble(true)
  }
 
  function handleCloseModal(): void {
    setIsModalVisble(false)
  }

  function handleConfirmExit(): void {
    console.log("User Exited the group")
    onExit?.(groupId,)
    setIsModalVisble(false)
    
  }

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-2 h-16">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={handleNavigation}>
        <button
          className="p-2 hover:bg-gray-700 rounded-full"
          type="button"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <Image
              src={image}
              alt={alt}
              height={40}
              width={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base">{groupName}</span>
            <span className="text-xs text-gray-300">online</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {!isJoined && (
          <button
            onClick={handleJoin}
            className="flex items-center space-x-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors text-xs sm:text-sm"
            type="button"
            aria-label="Join Community"
          >
            <Users size={18} />
            <span>Join</span>
          </button>
        )}
        <button
          className="p-2 hover:bg-gray-700 rounded-full"
          type="button"
          aria-label="Start call"
        >
          <Phone size={24} />
        </button>

        <button
          className="p-2 hover:bg-gray-700 rounded-full"
          type="button"
          aria-label="More options"
          onClick={changeModal}
        >
          <MoreVertical size={24} />
        </button>

         {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to exit?</h2>
            <p className="text-gray-600 mb-6">Any unsaved changes will be lost.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmExit}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                Confirm
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

        {/** */}
      </div>
    </div>
  );
}

export default ChatNavBar;
