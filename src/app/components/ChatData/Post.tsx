'use client'
import React, { useState } from 'react';

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
  likes: number;
  replies: Message[];
  mentions?: string[]; // Mentions extracted from @username
  tags?: string[];     // Tags extracted from #topic
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
  const [suggestions, setSuggestions] = useState<string[]>([]); // Mentions dropdown

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewMessage(value);

    // Check for `@` to trigger mention suggestions
    const mentionTrigger = value.split(' ').pop();
    if (mentionTrigger && mentionTrigger.startsWith('@')) {
      setSuggestions(['JohnDoe', 'JaneSmith', 'Admin']); // Example static suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Extract mentions and tags using regex
    const mentions = newMessage.match(/@\w+/g)?.map((mention) => mention.slice(1)) || [];
    const tags = newMessage.match(/#\w+/g)?.map((tag) => tag.slice(1)) || [];

    // Create a new message object
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

    // Update the message list
    setMessages([...messages, newMsg]);

    // Clear the input field
    setNewMessage('');
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

  const handleReply = (messageId: number, replyText: string) => {
    if (!replyText.trim()) return;

    const updatedMessages = messages.map((message) => {
      if (message.id === messageId) {
        const reply: Message = {
          id: Date.now(),
          sender: 'Me',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          likes: 0,
          replies: [],
        };
        return { ...message, replies: [...message.replies, reply] };
      }
      return message;
    });

    setMessages(updatedMessages);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 flex items-center justify-between bg-white border-b border-gray-200">
          <div className="text-lg font-semibold text-gray-800">Community Chat</div>
        </div>

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

                {/* Display Mentions */}
                {message.mentions && message.mentions.length > 0 && (
                  <div className="text-sm text-purple-500">
                    Mentions: {message.mentions.join(', ')}
                  </div>
                )}

                {/* Display Tags */}
                {message.tags && message.tags.length > 0 && (
                  <div className="text-sm text-blue-500">
                    Tags: {message.tags.join(', ')}
                  </div>
                )}
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
              {message.replies.length > 0 && (
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
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2 relative">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type a message with @mentions or #tags"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 bg-white border rounded shadow-md w-full z-10">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-100"
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
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
