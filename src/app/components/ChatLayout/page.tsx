'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ChatArea from '../ChatData/Post';
import ChatNavBar from '../ChatNavBar/ChatNavBar';

const ChatLayoutContent = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "90";
  const description = searchParams.get("description") || "No description available.";
  const groupName = searchParams.get("groupName") || "Unnamed Group";

  if (!id || !groupName || !description) {
    return <div>Error: Missing required data.</div>;
  }

  return (
    <div className="flex flex-col h-screen py-5">
      {/* Navigation Bar */}
      <ChatNavBar
        groupName={groupName}
        description={description}
        image={'/Images/music-lover.webp'}
        groupId={parseInt(id, 10)}
        alt="Image"
      />

      {/* Chat Area */}
      <div className="">
        <ChatArea />
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
