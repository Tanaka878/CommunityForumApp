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
  messages: Message[];
};

const chat: Chat = {
  id: 1,
  name: 'John Doe',
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
    {
      id: 3,
      sender: 'Jane Smith',
      text: 'What are your plans for today?',
      time: '12:45 PM',
      likes: 0,
      replies: [],
    },
  ],
};

const ChatPage = () => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(chat.messages);

  const handleLike = (messageId: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId
          ? { ...message, likes: message.likes + 1 }
          : {
              ...message,
              replies: message.replies.map((reply) =>
                reply.id === messageId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              ),
            }
      )
    );
  };

  const handleReply = (messageId: number, text: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId
          ? {
              ...message,
              replies: [
                ...message.replies,
                {
                  id: Date.now(),
                  sender: 'Me',
                  text,
                  time: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                  likes: 0,
                  replies: [],
                },
              ],
            }
          : {
              ...message,
              replies: message.replies.map((reply) =>
                reply.id === messageId
                  ? {
                      ...reply,
                      replies: [
                        ...reply.replies,
                        {
                          id: Date.now(),
                          sender: 'Me',
                          text,
                          time: new Date().toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          }),
                          likes: 0,
                          replies: [],
                        },
                      ],
                    }
                  : reply
              ),
            }
      )
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Chat Header */}
     

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
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
                setMessages([
                  ...messages,
                  {
                    id: Date.now(),
                    sender: 'Me',
                    text: newMessage,
                    time: new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                    likes: 0,
                    replies: [],
                  },
                ]);
                setNewMessage('');
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
