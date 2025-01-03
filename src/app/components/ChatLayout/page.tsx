'use client';
import { useSearchParams } from 'next/navigation';
import ChatArea from '../ChatData/Post';
import ChatNavBar from '../ChatNavBar/page';

const ChatLayout = () => {
  // Fetching the user details from the router
  const searchParams = useSearchParams();

  const id = searchParams.get("id") || 90;
  const description = searchParams.get("description") || "No description available.";
  const groupName = searchParams.get("groupName") || "Unnamed Group";

  // Basic error handling for missing data
  if (!id || !groupName || !description) {
    return <div>Error: Missing required data.</div>;
  }

  return (
    <div className="flex flex-col h-screen py-5">
      {/* Navigation Bar */}
      <ChatNavBar groupName={groupName} description={description} image={'/Images/music-lover.webp'} groupId={0}  />

      {/* Chat Area */}
      <div className="">
        <ChatArea />
      </div>
    </div>
  );
};

export default ChatLayout;
