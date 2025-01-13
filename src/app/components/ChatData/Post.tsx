import React, { useState, useEffect } from "react";
import { Loader } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  likes: number;
  replies: Message[];
}

interface MessageItemProps {
  message: Message;
  onLike: (messageId: string) => Promise<void>;
  onReply: (message: Message) => void;
  depth?: number;
}

const MessageItem: React.FC<MessageItemProps> = ({ 
  message, 
  onLike, 
  onReply, 
  depth = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasReplies = message.replies && message.replies.length > 0;
  const maxDepth = 5;

  if (depth >= maxDepth) {
    return (
      <div key={`thread-${message.id}`} className="mt-2 pl-4">
        <button 
          className="text-blue-400 text-sm"
          onClick={() => window.open(`/thread/${message.id}`, '_blank')}
        >
          Continue this thread →
        </button>
      </div>
    );
  }

  return (
    <div key={`message-${message.id}`} className="bg-gray-800 p-4 rounded-lg mb-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-white break-words">{message.text}</p>
          <p className="text-sm text-gray-400 mt-1">
            {message.sender} • {new Date(message.time).toLocaleString()}
          </p>
        </div>
        {hasReplies && (
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 mt-3 text-sm">
        <button
          className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
          onClick={() => onLike(message.id)}
        >
          <span>👍</span>
          <span>{message.likes}</span>
        </button>
        <button
          className="text-gray-400 hover:text-blue-400 transition-colors"
          onClick={() => onReply(message)}
        >
          Reply
        </button>
      </div>

      {hasReplies && isExpanded && (
        <div className="mt-4 pl-4 border-l-2 border-gray-700">
          {message.replies.map((reply) => (
            <MessageItem
              key={`reply-${reply.id}-depth-${depth}`}
              message={reply}
              onLike={onLike}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Post: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const communityId = "123";

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/message?communityId=${communityId}`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError("Failed to load messages. Please try again later.");
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageTree = (
    messages: Message[],
    parentId: string,
    newReply: Message
  ): Message[] => {
    return messages.map((message) => {
      if (message.id === parentId) {
        return {
          ...message,
          replies: [...(message.replies || []), newReply],
        };
      }
      if (message.replies && message.replies.length > 0) {
        return {
          ...message,
          replies: updateMessageTree(message.replies, parentId, newReply),
        };
      }
      return message;
    });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const payload = {
        sender: "You",
        text: newMessage,
        communityId,
        ...(replyingTo && { replyTo: replyingTo.id }),
      };

      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const newMsg = await response.json();

      setMessages((prev) => {
        if (replyingTo) {
          return updateMessageTree(prev, replyingTo.id, newMsg);
        }
        return [...prev, newMsg];
      });

      setNewMessage("");
      setReplyingTo(null);
    } catch (error) {
      setError("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (messageId: string) => {
    try {
      const response = await fetch(`/api/message/${messageId}/like`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to like message");

      setMessages((prev) => {
        const updateLikes = (messages: Message[]): Message[] => {
          return messages.map((msg) => {
            if (msg.id === messageId) {
              return { ...msg, likes: msg.likes + 1 };
            }
            if (msg.replies && msg.replies.length > 0) {
              return { ...msg, replies: updateLikes(msg.replies) };
            }
            return msg;
          });
        };
        return updateLikes(prev);
      });
    } catch (error) {
      console.error("Error liking message:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 p-4">
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4">
        {loading && messages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Loader className="animate-spin text-gray-400" />
          </div>
        ) : (
          messages.map((message) => (
            <MessageItem
              key={`root-${message.id}`}
              message={message}
              onLike={handleLike}
              onReply={setReplyingTo}
            />
          ))
        )}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mt-4">
        {replyingTo && (
          <div className="bg-gray-700 p-3 rounded-lg mb-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">
                  Replying to <span className="text-white">{replyingTo.sender}</span>
                </p>
                <p className="text-sm text-gray-300 mt-1">{replyingTo.text}</p>
              </div>
              <button
                className="text-gray-400 hover:text-red-400"
                onClick={() => setReplyingTo(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={loading}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            onClick={handleSendMessage}
            disabled={loading || !newMessage.trim()}
          >
            {loading ? (
              <Loader className="animate-spin w-5 h-5" />
            ) : (
              'Send'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;