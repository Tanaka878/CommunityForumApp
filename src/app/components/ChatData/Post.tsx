import React, { useState, useEffect } from "react";
import { Loader, MessageSquare, ThumbsUp } from "lucide-react";
import BASE_URL from "@/app/config/api";

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  likes: number;
  replies: Message[];
  parentId?: string;
}


interface ChatAreaProps {
  userId: string;
  communityId: string;
  nickname: string;
  username :string;
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

  const replyCount = message.replies?.length || 0;
  const nestedReplyCount = message.replies?.reduce((count, reply) => 
    count + (reply.replies?.length || 0), 0
  );

  if (depth >= maxDepth) {
    return (
      <div key={`thread-${message.id}`} className="mt-2 pl-4">
        <button 
          className="text-blue-400 text-sm hover:underline flex items-center gap-2"
          onClick={() => window.open(`/thread/${message.id}`, '_blank')}
        >
          <MessageSquare size={14} />
          View full thread ({replyCount + nestedReplyCount} replies)
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
            className="text-gray-400 hover:text-white px-2"
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
          <ThumbsUp size={14} />
          <span>{message.likes}</span>
        </button>
        <button
          className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
          onClick={() => onReply(message)}
        >
          <MessageSquare size={14} />
          <span>Reply {hasReplies && `(${replyCount})`}</span>
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

const Post: React.FC<ChatAreaProps> = ({userId,communityId, nickname}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(userId)
 

  useEffect(() => {
    fetchMessages();
  }, []);

  const isMemberOf = async () => {
    const email = localStorage.getItem('email');
  
    try {
      const response = await fetch(`${BASE_URL}/api/communities/isMember/${email}/${communityId}`);
  
      if (!response.ok) {
        console.log("User not part of the group")
      }
  
      const text = await response.text(); // Parse response as plain text
      console.log('Raw response text:', text);
  
      const isMember = text.trim().toLowerCase() === 'true';
      console.log('Is member:', isMember);
    } catch (error) {
      console.error('Error fetching membership status:', error);
    }
  };
  
  

  useEffect(()=>{
    isMemberOf()

  })
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

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const payload = {
        sender: nickname,
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

      if (replyingTo) {
        // Update the messages tree with the new reply
        setMessages(prevMessages => 
          updateMessageTreeWithReply(prevMessages, replyingTo.id, newMsg)
        );
      } else {
        setMessages(prev => [...prev, newMsg]);
      }

      setNewMessage("");
      setReplyingTo(null);
    } catch (error) {
      setError("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageTreeWithReply = (messages: Message[], parentId: string, newReply: Message): Message[] => {
    return messages.map(message => {
      if (message.id === parentId) {
        return {
          ...message,
          replies: [...(message.replies || []), newReply]
        };
      }
      if (message.replies?.length) {
        return {
          ...message,
          replies: updateMessageTreeWithReply(message.replies, parentId, newReply)
        };
      }
      return message;
    });
  };

  const handleLike = async (messageId: string) => {
    try {
      const response = await fetch("/api/message", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId }),
      });

      if (!response.ok) throw new Error("Failed to like message");

      const updatedMessage = await response.json();
      setMessages(prev => 
        updateMessageTreeWithLike(prev, messageId, updatedMessage.likes)
      );
    } catch (error) {
      console.error("Error liking message:", error);
    }
  };

  const updateMessageTreeWithLike = (messages: Message[], messageId: string, newLikeCount: number): Message[] => {
    return messages.map(message => {
      if (message.id === messageId) {
        return { ...message, likes: newLikeCount };
      }
      if (message.replies?.length) {
        return {
          ...message,
          replies: updateMessageTreeWithLike(message.replies, messageId, newLikeCount)
        };
      }
      return message;
    });
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
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
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