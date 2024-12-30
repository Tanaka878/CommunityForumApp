'use client'
import ChatArea from '../ChatData/Post';
import ChatNavBar from '../ChatNavBar/page';


const ChatLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navigation Bar */}
      <ChatNavBar />
      
      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ChatArea/>
      </div>
    </div>
  );
};

export default ChatLayout;