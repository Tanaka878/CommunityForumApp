'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, MoreVertical, Phone, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import BASE_URL from '@/app/config/api';

interface ChatData {
  isMember: boolean;
  usersCount: number;
}

interface ApiResponse {
  status: number;
  message: string;
  data?: ChatData;
}

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
  onExit?: (groupId: number) => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState<ChatData>({
    isMember: false,
    usersCount: 0
  });

  const handleNavigation = () => {
    router.push(`/components/GroupsContainer/Container`);
  };

  console.log(description)

  const checkUserMembership = useCallback(async (groupId: number): Promise<ApiResponse> => {
    const email = localStorage.getItem('email');

    if (!email) {
      throw new Error('Email not found in local storage');
    }

    const endpoint = `${BASE_URL}/api/communities/isMember/${email}/${groupId}`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        return {
          status: response.status,
          message: "Success",
          data: {
            isMember: data.isMember,
            usersCount: data.usersCount
          }
        };
      }

      return {
        status: response.status,
        message: data.message || "An error occurred",
      };
    } catch (error) {
      console.error('Error checking user membership:', error);
      throw new Error('Failed to check membership status');
    }
  }, []);

  const updateMembershipStatus = useCallback(async () => {
    try {
      const response = await checkUserMembership(groupId);
      
      if (response.status === 200 && response.data) {
        setUserData(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [groupId, checkUserMembership]);

  useEffect(() => {
    updateMembershipStatus();
  }, [updateMembershipStatus]);

  const handleJoin = async () => {
    if (onJoin) {
      onJoin(groupId);
      // Update the local state after successful join
      setUserData(prev => ({ ...prev, isMember: true }));
    }
  };

  const handleConfirmExit = () => {
    if (onExit) {
      onExit(groupId);
      // Update the local state after successful exit
      setUserData(prev => ({ ...prev, isMember: false }));
    }
    setIsModalVisible(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-16 bg-gray-800 text-white">
      Loading...
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-16 bg-gray-800 text-white">
      Error: {error}
    </div>;
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
            <span className="text-xs text-gray-300">{userData.isMember} members</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {!userData.isMember && (
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
          onClick={() => setIsModalVisible(true)}
        >
          <MoreVertical size={24} />
        </button>

        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full sm:w-1/3 p-6 text-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Are you sure you want to exit?</h2>
              <p className="text-gray-600 mb-6">Any unsaved changes will be lost.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmExit}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setIsModalVisible(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatNavBar;