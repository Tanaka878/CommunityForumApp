'use client';

import React, { useState } from 'react';

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
  likes: number;
  replies: Message[];
};

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  messages: Message[];
};

const chats: Chat[] = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    time: '12:30 PM',
    messages: [
      {
        id: 1,
        sender: 'John Doe',
        text: 'Hey, how are you?',
        time: '12:30 PM',
        likes: 0,
        replies: [
          {
            id: 2,
            sender: 'Me',
            text: 'I am good, thanks!',
            time: '12:31 PM',
            likes: 0,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    lastMessage: 'Are we still on for today?',
    time: '11:45 AM',
    messages: [
      {
        id: 1,
        sender: 'Jane Smith',
        text: 'Are we still on for today?',
        time: '11:45 AM',
        likes: 0,
        replies: [],
      },
    ],
  },
];

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState<Chat | null>(chats[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleLike = (messageId: number) => {
    if (!activeChat) return;
    const updatedMessages = activeChat.messages.map((message) => {
      if (message.id === messageId) {
        return { ...message, likes: message.likes + 1 };
      }
      return message;
    });
    setActiveChat({ ...activeChat, messages: updatedMessages });
  };

  const handleReply = (messageId: number, text: string) => {
    if (!activeChat) return;
    const updatedMessages = activeChat.messages.map((message) => {
      if (message.id === messageId) {
        return {
          ...message,
          replies: [
            ...message.replies,
            {
              id: Date.now(),
              sender: 'Me',
              text,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              likes: 0,
              replies: [],
            },
          ],
        };
      }
      return message;
    });
    setActiveChat({ ...activeChat, messages: updatedMessages });
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 md:w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 text-lg font-semibold border-b border-gray-200">Chats</div>
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat)}
            className={`p-4 flex items-center justify-between hover:bg-gray-100 cursor-pointer ${
              activeChat?.id === chat.id ? 'bg-gray-200' : ''
            }`}
          >
            <div>
              <div className="font-semibold text-gray-800">{chat.name}</div>
              <div className="text-sm text-gray-600 truncate">{chat.lastMessage}</div>
            </div>
            <div className="text-xs text-gray-500">{chat.time}</div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 flex items-center justify-between bg-white border-b border-gray-200">
              <div className="text-lg font-semibold text-gray-800">{activeChat.name}</div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {activeChat.messages.map((message) => (
                <div key={message.id} className="mb-4">
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{message.sender}</span>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-gray-700">{message.text}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <button
                      className="hover:underline"
                      onClick={() => handleLike(message.id)}
                    >
                      Like ({message.likes})
                    </button>
                    <button
                      className="hover:underline"
                      onClick={() => {
                        const replyText = prompt('Enter your reply:');
                        if (replyText) handleReply(message.id, replyText);
                      }}
                    >
                      Reply
                    </button>
                  </div>
                  {/* Replies */}
                  <div className="pl-4 mt-2 border-l border-gray-300">
                    {message.replies.map((reply) => (
                      <div key={reply.id} className="mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">{reply.sender}</span>
                          <span className="text-xs text-gray-500">{reply.time}</span>
                        </div>
                        <p className="text-gray-700">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    if (newMessage) {
                      handleReply(0, newMessage);
                      setNewMessage('');
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
