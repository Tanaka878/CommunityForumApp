'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatArea from '../ChatData/Post';
import ChatNavBar from '../ChatNavBar/ChatNavBar';
import BASE_URL from '@/app/config/api';

const ChatLayoutContent = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "90";
  const description = searchParams.get("description") || "No description available.";
  const groupName = searchParams.get("groupName") || "Unnamed Group";

  const [userId, setUserId] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState<boolean>(true);

  // Effect to load userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("No user ID found in localStorage.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchNickname = async () => {
        try {
          // Check localStorage for an existing nickname
          const storedNickname = localStorage.getItem('nickname');
          if (storedNickname) {
            console.log("Nickname found in localStorage:", storedNickname);
            setNickname(storedNickname);
            return;
          }
  
          // Fetch nickname from the backend if not in localStorage
          const response = await fetch(`${BASE_URL}/api/communities/getNickname/${userId}`);
          if (response.ok) {
            const data = await response.json();
            console.log("API Response:", data);
  
            // Extract and store the fetched nickname
            const fetchedNickname = data.nickname; // Assuming backend sends { "nickname": "..." }
            setNickname(fetchedNickname);
            localStorage.setItem('nickname', fetchedNickname);
          } else if (response.status === 404) {
            console.error("User not found. Setting default nickname.");
            setNickname("Guest");
          } else {
            console.error("Failed to fetch nickname:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Error fetching nickname:", error);
        }
      };
  
      // Call the async function
      fetchNickname();
    }
  }, [userId]);
  

  // Function to join a group
  const handleJoinGroup = async (groupId: number) => {
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("Email not found in localStorage.");
      return;
    }

    try {
      console.log(`Attempting to join group with ID: ${groupId} using email: ${email}`);

      const response = await fetch(`${BASE_URL}/api/communities/join/${email}/${groupId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Successfully joined group with ID: ${groupId}`, data);
      } else if (response.status === 404) {
        console.error("User not found. Unable to join group.");
      } else {
        console.error("Failed to join group. Server responded with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while attempting to join the group:", error);
    }
  };

  // Show loading state while initializing
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen py-5">
      {/* Navigation Bar */}
      <ChatNavBar
        onJoin={handleJoinGroup}
        groupName={groupName}
        description={description}
        image={'/Images/music-lover.webp'}
        groupId={parseInt(id, 10)}
        alt="Image"
      />

      {/* Chat Area */}
      <div className="">
        <ChatArea userId={userId!} communityId={id} username={nickname} nickname={nickname} />
      </div>
    </div>
  );
};

const ChatLayout = () => {
  return (
    <Suspense fallback={<div>Loading Chat...</div>}>
      <ChatLayoutContent />
    </Suspense>
  );
};

export default ChatLayout;
