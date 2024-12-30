'use client'
import React, { useState } from 'react';

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

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'John Doe',
    text: 'Hey, how are you? @JaneSmith #React',
    time: '12:30 PM',
    likes: 3,
    replies: [
      {
        id: 2,
        sender: 'Jane Smith',
        text: 'I am good, thanks! How about you? #LinkedIn',
        time: '12:31 PM',
        likes: 2,
        replies: [],
      },
    ],
    mentions: ['JaneSmith'],
    tags: ['React'],
  },
  {
    id: 3,
    sender: 'Jane Smith',
    text: 'Are we still on for the meeting later? #TeamSync',
    time: '11:45 AM',
    likes: 0,
    replies: [],
    mentions: [],
    tags: ['TeamSync'],
  },
];

const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMessage(value);

    const mentionTrigger = value.split(' ').pop();
    if (mentionTrigger && mentionTrigger.startsWith('@')) {
      setSuggestions(['JohnDoe', 'JaneSmith', 'Admin']);
    } else {
      setSuggestions([]);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const mentions = newMessage.match(/@\w+/g)?.map((mention) => mention.slice(1)) || [];
    const tags = newMessage.match(/#\w+/g)?.map((tag) => tag.slice(1)) || [];

    if (replyingTo) {
      // Handle reply
      const updatedMessages = messages.map((message) => {
        if (message.id === replyingTo) {
          const reply: Message = {
            id: Date.now(),
            sender: 'Me',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            likes: 0,
            replies: [],
            mentions,
            tags,
          };
          return { ...message, replies: [...message.replies, reply] };
        }
        return message;
      });
      setMessages(updatedMessages);
    } else {
      // Handle new message
      const newMsg: Message = {
        id: Date.now(),
        sender: 'Me',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        likes: 0,
        replies: [],
        mentions,
        tags,
      };
      setMessages([...messages, newMsg]);
    }

    setNewMessage('');
    setReplyingTo(null);
  };

  const handleLike = (messageId: number) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === messageId) {
        return { ...message, likes: message.likes + 1 };
      }
      return message;
    });
    setMessages(updatedMessages);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-900 pb-20">
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

            {/* Replies */}
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

      {/* Message Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-800">
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
            placeholder={replyingTo ? "Type your reply..." : "Type a message with @mentions or #tags"}
            className="flex-1 px-4 py-2 bg-gray-700 text-white border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          {suggestions.length > 0 && (
            <div className="absolute bottom-full left-0 bg-gray-700 border border-gray-600 rounded shadow-lg w-full mb-1">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer text-gray-300 hover:bg-gray-600"
                  onClick={() => {
                    setNewMessage((prev) => prev + suggestion + ' ');
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
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