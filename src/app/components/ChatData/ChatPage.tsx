'use client';

import React, { useState } from 'react';
import { FaImage, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
  likes: number;
  replies: Message[];
  imageUrl?: string;
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
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [messages, setMessages] = useState(chat.messages);

  const handleLike = (messageId: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === messageId
          ? { ...message, likes: message.likes + 1 }
          : {
              ...message,
              replies: updateLikes(message.replies, messageId),
            }
      )
    );
  };

  const updateLikes = (replies: Message[], messageId: number): Message[] => {
    return replies.map((reply) =>
      reply.id === messageId
        ? { ...reply, likes: reply.likes + 1 }
        : { ...reply, replies: updateLikes(reply.replies, messageId) }
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
                createReply(text),
              ],
            }
          : {
              ...message,
              replies: updateReplies(message.replies, messageId, text),
            }
      )
    );
  };

  const updateReplies = (replies: Message[], messageId: number, text: string): Message[] => {
    return replies.map((reply) =>
      reply.id === messageId
        ? {
            ...reply,
            replies: [...reply.replies, createReply(text)],
          }
        : { ...reply, replies: updateReplies(reply.replies, messageId, text) }
    );
  };

  const createReply = (text: string): Message => {
    return {
      id: Date.now(),
      sender: 'Me',
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      likes: 0,
      replies: [],
    };
  };

  const handleSend = () => {
    if (newMessage || newImage) {
      const reader = new FileReader();
  
      const processMessage = (imageData?: string) => {
        setMessages((prevMessages) => [
          ...prevMessages,
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
            imageUrl: imageData,
          },
        ]);
        setNewMessage('');
        setNewImage(null);
        setImagePreview(null);
      };
  
      if (newImage) {
        reader.onload = () => processMessage(reader.result as string);
        reader.readAsDataURL(newImage);
      } else {
        processMessage(); // No image, just process the text message
      }
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b border-gray-200 flex items-center">
        <button className="mr-4 text-gray-600 hover:text-gray-800">
          <FaArrowLeft size={20} />
        </button>
        <div className="text-lg font-semibold text-gray-800">{chat.name}</div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className="mb-4 border border-gray-300 rounded-lg p-4 bg-white">
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">{message.sender}</span>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt="User upload"
                  className="w-full max-w-xs mb-2 rounded-lg border"
                />
              )}
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
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <button
                      className="hover:underline"
                      onClick={() => handleLike(reply.id)}
                    >
                      Like ({reply.likes})
                    </button>
                    <button
                      className="hover:underline"
                      onClick={() => {
                        const replyText = prompt('Enter your reply:');
                        if (replyText) handleReply(reply.id, replyText);
                      }}
                    >
                      Reply
                    </button>
                  </div>
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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="p-2 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-200"
          >
            <FaImage size={20} />
          </label>
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <FaPaperPlane size={20} />
          </button>
        </div>
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-w-xs rounded-lg border"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
