"use client";

import React, { useState } from "react";

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  likes: number;
  replies: Message[];
}

const Post: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  // Handle message input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMessageObject: Message = {
      id: Math.random().toString(36).substring(2),
      sender: "You",
      text: newMessage,
      time: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    if (replyingTo) {
      // Add the new message as a reply
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === replyingTo.id
            ? { ...msg, replies: [...msg.replies, newMessageObject] }
            : msg
        )
      );
      setReplyingTo(null); // Clear the reply state
    } else {
      // Add the new message as a top-level message
      setMessages((prev) => [...prev, newMessageObject]);
    }

    setNewMessage("");
  };

  // Handle liking a message
  const handleLike = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  // Handle replying to a message
  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 p-4">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="bg-gray-800 p-4 rounded-lg mb-4">
            <p className="text-white">{message.text}</p>
            <p className="text-sm text-gray-400">— {message.sender}</p>
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
              <button
                className="flex items-center gap-1"
                onClick={() => handleLike(message.id)}
              >
                <span>{message.likes}</span> 👍
              </button>
              <button
                className="flex items-center gap-1"
                onClick={() => handleReply(message)}
              >
                Reply
              </button>
            </div>
            {/* Replies */}
            {message.replies.length > 0 && (
              <div className="mt-4 pl-4 border-l-2 border-gray-600">
                {message.replies.map((reply) => (
                  <div key={reply.id} className="mb-2">
                    <p className="text-gray-300">{reply.text}</p>
                    <p className="text-sm text-gray-500">
                      — {reply.sender} ({new Date(reply.time).toLocaleString()})
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-gray-800 p-4 rounded-lg">
        {replyingTo && (
          <div className="bg-gray-700 text-white p-2 rounded-lg mb-2">
            <p className="text-sm">
              Replying to <strong>{replyingTo.sender}</strong>:{" "}
              {replyingTo.text}
            </p>
            <button
              className="text-red-500 text-sm mt-1"
              onClick={() => setReplyingTo(null)}
            >
              Cancel Reply
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

export default Post;
