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
  const [joinCallback, setJoinCallback] = useState<(() => void) | null>(null);
  const [messageToChild, setMessageToChild] = useState<string>("");

    
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
  

  function pictureSelection(communityId: number): string {
    switch (communityId) {
      case 1:
        return "/Images/web dev.jpg";

      case 2:
        return "/Images/gamers.jpeg";

      case 3:
        return "/Images/career.png";

      case 4:
        return "/Images/music-lover.webp";

      case 5:
        return "/Images/jsscript.png";

      case 6:
        return "/Images/javaImg0.png";

      case 7 :
        return "/Images/hiking.jpeg";

      case 8 :
        return "/Images/food-lover.png";

      case 9 : 
        return "/Images/animal-lover.jpeg";

      default:
        return "/Images/noImage.jpeg"
    }
  }

  function isJoined(){
    console.log("Function activated")
  }

  const handleJoinCallback = (callback: () => void) => {
    setJoinCallback(callback);
  };

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
        setMessageToChild("join_notification_" + Date.now());
        if (joinCallback) {
          joinCallback(); // This will trigger handleParentCall in child
        }

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

  async function handleExit(groupId: number): Promise<void> {
    

    const response = await fetch(`${BASE_URL}/api/communities/exitGroup/${groupId}/${userId}`);
    //console.log(response)
    if(response.ok){
      console.log(" Exiing group with this id",groupId)
    }
    else{
      console.log('failed to exit group')
    }
  }

  return (
    <div className="flex flex-col h-screen py-5">
      {/* Navigation Bar */}
      <ChatNavBar
        onJoin={handleJoinGroup}
        groupName={groupName}
        description={description}
        image={pictureSelection(Number.parseInt(id))}
        groupId={parseInt(id, 10)}
        alt="Image"
        onExit={handleExit}
      />

      {/* Chat Area */}
      <div className="">
        <ChatArea userId={userId!} communityId={id} username={nickname} nickname={nickname} isJoined={isJoined}
      onJoin={handleJoinCallback}  parentMessage={messageToChild}/>
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
