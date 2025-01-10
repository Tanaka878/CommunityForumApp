'use client';
import React, { useState, useEffect } from 'react';

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
  likes: number;
  replies: Message[];
  mentions?: string[];
  tags?: string[];
};

type Props = {
  userId: string; // ID of the logged-in user
  communityId: string; // ID of the current community
};

const ChatArea: React.FC<Props> = ({ userId, communityId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  // Fetch messages from the server when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `/api/messages?communityId=${communityId}&userId=${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to fetch messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [communityId, userId]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // Send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const mentions = newMessage.match(/@\w+/g)?.map((mention) => mention.slice(1)) || [];
    const tags = newMessage.match(/#\w+/g)?.map((tag) => tag.slice(1)) || [];

    const newMsg = {
      sender: userId,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      likes: 0,
      replies: [],
      mentions,
      tags,
      communityId,
    };

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });

      if (response.ok) {
        const savedMessage = await response.json();
        setMessages((prev) => [...prev, savedMessage]);
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setNewMessage('');
    setReplyingTo(null);
  };

  // Like a message
  const handleLike = async (messageId: number) => {
    try {
      const response = await fetch(`/api/messages/${messageId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === messageId ? { ...message, likes: message.likes + 1 } : message
          )
        );
      } else {
        console.error('Failed to like message:', response.statusText);
      }
    } catch (error) {
      console.error('Error liking message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div className="mb-2 bg-gray-800 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{message.sender}</span>
                <span className="text-xs text-gray-400">{message.time}</span>
              </div>
              <p className="text-gray-300 mt-1">{message.text}</p>
              {message.mentions && message.mentions.length > 0 && (
                <div className="text-sm text-purple-400 mt-1">
                  Mentions: {message.mentions.join(', ')}
                </div>
              )}
              {message.tags && message.tags.length > 0 && (
                <div className="text-sm text-blue-400 mt-1">
                  Tags: {message.tags.join(', ')}
                </div>
              )}
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                <button
                  className="hover:text-blue-400 transition-colors"
                  onClick={() => handleLike(message.id)}
                >
                  Like ({message.likes})
                </button>
                <button
                  className="hover:text-blue-400 transition-colors"
                  onClick={() => setReplyingTo(message.id)}
                >
                  Reply
                </button>
              </div>
            </div>
            {message.replies.length > 0 && (
              <div className="pl-4 mt-2 border-l border-gray-700">
                {message.replies.map((reply) => (
                  <div key={reply.id} className="mb-2 bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{reply.sender}</span>
                      <span className="text-xs text-gray-400">{reply.time}</span>
                    </div>
                    <p className="text-gray-300 mt-1">{reply.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-800">
        {replyingTo && (
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Replying to message</span>
            <button
              onClick={() => setReplyingTo(null)}
              className="hover:text-blue-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 relative">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder={replyingTo ? 'Type your reply...' : 'Type a message with @mentions or #tags'}
            className="flex-1 px-4 py-2 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
