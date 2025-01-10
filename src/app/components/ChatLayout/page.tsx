'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatArea from '../ChatData/Post';
import ChatNavBar from '../ChatNavBar/ChatNavBar';
import BASE_URL from '@/app/config/api';

const ChatLayoutContent = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "90";
  const description = searchParams.get("description") || "No description available.";
  const groupName = searchParams.get("groupName") || "Unnamed Group";

  if (!id || !groupName || !description) {
    return <div>Error: Missing required data.</div>;
  }
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
        <ChatArea userId={`${id}`} communityId={''} />
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
