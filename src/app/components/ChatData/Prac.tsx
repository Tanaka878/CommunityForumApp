'use client';

import React, { useState } from 'react';

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  messages: { sender: string; text: string; time: string }[];
};

const chats: Chat[] = [
  {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    time: '12:30 PM',
    messages: [
      { sender: 'John Doe', text: 'Hey, how are you?', time: '12:30 PM' },
      { sender: 'Me', text: 'I am good, thanks!', time: '12:31 PM' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    lastMessage: 'Are we still on for today?',
    time: '11:45 AM',
    messages: [
      { sender: 'Jane Smith', text: 'Are we still on for today?', time: '11:45 AM' },
      { sender: 'Me', text: 'Yes, see you at 5!', time: '11:46 AM' },
    ],
  },
];

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState<Chat | null>(chats[0]);

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
              <button className="text-blue-500 hover:underline">Options</button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {activeChat.messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.sender === 'Me' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
                      message.sender === 'Me'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {message.text}
                    <div className="text-xs text-gray-500 mt-1 text-right">
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
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

