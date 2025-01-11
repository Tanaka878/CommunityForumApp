'use client';
import React, { useState, useEffect } from 'react';

type Message = {
  id: string; // MongoDB ObjectId as a string
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
  const [replyingTo, setReplyingTo] = useState<Message | null>(null); // Track the message being replied to
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `/api/message?communityId=${communityId}&userId=${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to fetch messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [communityId, userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

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
      parentId: replyingTo?.id || null, // Reference the parent message ID if replying
    };

    try {
      const response = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });

      if (response.ok) {
        const savedMessage = await response.json();
        if (replyingTo) {
          // Add the reply to the parent message
          setMessages((prev) =>
            prev.map((message) =>
              message.id === replyingTo.id
                ? { ...message, replies: [...message.replies, savedMessage.message] }
                : message
            )
          );
        } else {
          // Add the new message to the list
          setMessages((prev) => [...prev, savedMessage.message]);
        }
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setNewMessage('');
    setReplyingTo(null);
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
        {loading ? (
          <p className="text-white">Loading messages...</p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="mb-4">
              <div className="mb-2 bg-gray-800 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{message.sender}</span>
                  <span className="text-xs text-gray-400">{message.time}</span>
                </div>
                <p className="text-gray-300 mt-1">{message.text}</p>
                <button
                  className="text-sm text-blue-400 mt-2"
                  onClick={() => handleReply(message)}
                >
                  Reply
                </button>
              </div>

              {message.replies && message.replies.length > 0 && (
                <div className="ml-6 mt-2">
                  {message.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-700 p-2 rounded-lg mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{reply.sender}</span>
                        <span className="text-xs text-gray-400">{reply.time}</span>
                      </div>
                      <p className="text-gray-300">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-800">
        {replyingTo && (
          <div className="mb-2 text-sm text-gray-400">
            Replying to: <span className="text-white">{replyingTo.text}</span>
            <button
              className="ml-2 text-red-500"
              onClick={handleCancelReply}
            >
              Cancel
            </button>
          </div>
        )}
        <input
          type="text"
          className="w-full p-2 bg-gray-700 text-white rounded-lg"
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleInputChange}
        />
        <button
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
