import React, { useState, useEffect, useCallback } from "react";
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
  username: string;
}


interface MessageItemProps {
  message: Message;
  onLike: (messageId: string) => Promise<void>;
  onReply: (message: Message) => void;
  depth?: number;
}

interface UserValidationState {
  isAuthenticated: boolean;
  isCommunityMember: boolean;
  isLoading: boolean;
  error: string | null;
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

const Post: React.FC<ChatAreaProps> = ({ userId, communityId, nickname, username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(username)
  
  const [userValidation, setUserValidation] = useState<UserValidationState>({
    isAuthenticated: false,
    isCommunityMember: false,
    isLoading: true,
    error: null,
    
  });

  const validateUserAccess = useCallback(async () => {
    if (!userId || !communityId) {
      setUserValidation(prev => ({
        ...prev,
        isAuthenticated: false,
        error: "Missing user or community information"
      }));
      return;
    }

    try {
      const email = localStorage.getItem('email');
      if (!email) {
        setUserValidation(prev => ({
          ...prev,
          isAuthenticated: false,
          isLoading: false,
          error: "User not authenticated"
        }));
        return;
      }

      const response = await fetch(`${BASE_URL}/api/communities/isMember/${email}/${communityId}`);
      
      if (!response.ok) {
        throw new Error("Failed to verify community membership");
      }

      const data = await response.json();
      
      setUserValidation({
        isAuthenticated: true,
        isCommunityMember: data.isMember,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.log(error)

      setUserValidation(prev => ({
        ...prev,
        isLoading: false,
        error: "Failed to verify user access"
      }));
    }
  }, [userId, communityId]);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/message?communityId=${communityId}`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError("Failed to load messages. Please try again later.");
      console.log(error)
    } finally {
      setLoading(false);
    }
  }, [communityId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    validateUserAccess();
  }, [validateUserAccess]);

  const updateMessageTreeWithReply = useCallback((messages: Message[], parentId: string, newReply: Message): Message[] => {
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
  }, []);

  const updateMessageTreeWithLike = useCallback((messages: Message[], messageId: string, newLikeCount: number): Message[] => {
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
  }, []);

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
        setMessages(prevMessages => 
          updateMessageTreeWithReply(prevMessages, replyingTo.id, newMsg)
        );
      } else {
        setMessages(prev => [...prev, newMsg]);
      }

      setNewMessage("");
      setReplyingTo(null);
    } catch (error) {
      console.log(error)

      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
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
      console.log(error)

      setError("Failed to like message. Please try again.");
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

        {userValidation.isLoading ? (
          <div className="flex justify-center p-4">
            <Loader className="animate-spin text-gray-400" />
          </div>
        ) : userValidation.isAuthenticated && userValidation.isCommunityMember ? (
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
        ) : userValidation.error ? (
          <div className="text-red-400 text-center p-2">
            {userValidation.error}
          </div>
        ) : !userValidation.isCommunityMember ? (
          <div className="text-gray-400 text-center p-2">
            You must be a member of this community to participate in discussions.
          </div>
        ) : (
          <div className="text-gray-400 text-center p-2">
            Please sign in to participate in discussions.
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;