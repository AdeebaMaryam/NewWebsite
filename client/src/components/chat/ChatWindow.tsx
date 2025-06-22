import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatMongoDate } from "@/lib/mongodb";
import { useAuth } from "@/hooks/useAuth";
import MessageList from "./MessageList";

interface ChatWindowProps {
  chatId: string;
}

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);

  // Fetch chat details
  const { data: chatData } = useQuery({
    queryKey: ['/api/chats', chatId],
    enabled: !!chatId
  });

  // For now, we'll use mock messages since the message API isn't implemented yet
  // In production, this would fetch from /api/chats/${chatId}/messages
  useEffect(() => {
    if (chatId) {
      // Mock messages for demonstration
      const mockMessages = [
        {
          _id: '1',
          sender: { 
            _id: 'other-user-id',
            firstName: 'Rajesh',
            lastName: 'Kumar',
            profile: { avatar: null }
          },
          content: 'Hey! Great to connect with a fellow Osmanian!',
          type: 'text',
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          readBy: []
        },
        {
          _id: '2',
          sender: { 
            _id: user?._id || 'current-user-id',
            firstName: user?.firstName || 'You',
            lastName: user?.lastName || '',
            profile: { avatar: user?.profile?.avatar }
          },
          content: 'Absolutely! Which batch were you from?',
          type: 'text',
          createdAt: new Date(Date.now() - 82800000).toISOString(), // 23 hours ago
          readBy: []
        },
        {
          _id: '3',
          sender: { 
            _id: 'other-user-id',
            firstName: 'Rajesh',
            lastName: 'Kumar',
            profile: { avatar: null }
          },
          content: 'I graduated in 2015 from UCE. Computer Science. What about you?',
          type: 'text',
          createdAt: new Date(Date.now() - 82200000).toISOString(), // 22.8 hours ago
          readBy: []
        },
        {
          _id: '4',
          sender: { 
            _id: user?._id || 'current-user-id',
            firstName: user?.firstName || 'You',
            lastName: user?.lastName || '',
            profile: { avatar: user?.profile?.avatar }
          },
          content: 'Nice! I was from the same department, class of 2016. Small world!',
          type: 'text',
          createdAt: new Date(Date.now() - 82000000).toISOString(), // 22.7 hours ago
          readBy: []
        },
        {
          _id: '5',
          sender: { 
            _id: 'other-user-id',
            firstName: 'Rajesh',
            lastName: 'Kumar',
            profile: { avatar: null }
          },
          content: 'Indeed! Are you planning to attend the upcoming UCE alumni meetup?',
          type: 'text',
          createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          readBy: []
        }
      ];
      setMessages(mockMessages);
    }
  }, [chatId, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!chatData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <MessageList 
        messages={messages}
        currentUserId={user?._id || ''}
        onMessageUpdate={setMessages}
      />
      <div ref={messagesEndRef} />
    </div>
  );
}
