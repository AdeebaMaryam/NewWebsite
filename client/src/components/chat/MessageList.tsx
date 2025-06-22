import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Reply, 
  MoreVertical, 
  Copy, 
  Edit, 
  Trash,
  Check,
  CheckCheck
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatMongoDate } from "@/lib/mongodb";

interface Message {
  _id: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    profile?: {
      avatar?: string;
    };
  };
  content: string;
  type: 'text' | 'image' | 'file' | 'link' | 'system';
  createdAt: string;
  readBy: Array<{
    user: string;
    timestamp: string;
  }>;
  editedAt?: string;
  replyTo?: string;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  onMessageUpdate: (messages: Message[]) => void;
}

export default function MessageList({ messages, currentUserId, onMessageUpdate }: MessageListProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingMessage, setEditingMessage] = useState<string | null>(null);

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
  };

  const isConsecutiveMessage = (currentMsg: Message, prevMsg: Message | undefined) => {
    if (!prevMsg) return false;
    
    const timeDiff = new Date(currentMsg.createdAt).getTime() - new Date(prevMsg.createdAt).getTime();
    const isSameSender = currentMsg.sender._id === prevMsg.sender._id;
    const isWithinMinutes = timeDiff < 5 * 60 * 1000; // 5 minutes
    
    return isSameSender && isWithinMinutes;
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleReplyToMessage = (messageId: string) => {
    setReplyingTo(messageId);
  };

  const handleEditMessage = (messageId: string) => {
    setEditingMessage(messageId);
  };

  const handleDeleteMessage = (messageId: string) => {
    // In production, this would make an API call to delete the message
    const updatedMessages = messages.filter(msg => msg._id !== messageId);
    onMessageUpdate(updatedMessages);
  };

  const getMessageStatus = (message: Message) => {
    if (message.sender._id !== currentUserId) return null;
    
    if (message.readBy.length === 0) {
      return <Check className="w-3 h-3 text-gray-400" />;
    } else {
      return <CheckCheck className="w-3 h-3 text-blue-500" />;
    }
  };

  const groupedMessages = messages.reduce((groups: Message[][], message, index) => {
    const isConsecutive = isConsecutiveMessage(message, messages[index - 1]);
    
    if (!isConsecutive || groups.length === 0) {
      groups.push([message]);
    } else {
      groups[groups.length - 1].push(message);
    }
    
    return groups;
  }, []);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Start the conversation</h3>
          <p className="text-gray-600">Send a message to begin chatting with your fellow Osmanian.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
      {groupedMessages.map((messageGroup, groupIndex) => {
        const firstMessage = messageGroup[0];
        const isCurrentUser = firstMessage.sender._id === currentUserId;
        
        return (
          <div key={groupIndex} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-xs lg:max-w-md ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} space-x-2`}>
              {/* Avatar - only show for first message in group and for other users */}
              {!isCurrentUser && (
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={firstMessage.sender.profile?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white text-xs">
                    {firstMessage.sender.firstName?.[0]}{firstMessage.sender.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
              )}
              
              {/* Messages */}
              <div className="space-y-1">
                {/* Sender name and timestamp for first message */}
                {!isCurrentUser && (
                  <div className="flex items-center space-x-2 px-1">
                    <span className="text-xs font-medium text-gray-700">
                      {firstMessage.sender.firstName} {firstMessage.sender.lastName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatMessageTime(firstMessage.createdAt)}
                    </span>
                  </div>
                )}
                
                {/* Message bubbles */}
                {messageGroup.map((message, messageIndex) => (
                  <div key={message._id} className="group relative">
                    <div
                      className={`px-4 py-2 rounded-2xl break-words ${
                        isCurrentUser 
                          ? 'bg-ou-blue text-white rounded-br-sm' 
                          : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                      } ${messageIndex === 0 ? '' : isCurrentUser ? 'rounded-tr-2xl' : 'rounded-tl-2xl'}`}
                    >
                      {message.type === 'system' ? (
                        <div className="text-center">
                          <Badge variant="secondary" className="text-xs">
                            {message.content}
                          </Badge>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm">{message.content}</p>
                          {message.editedAt && (
                            <span className={`text-xs ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'} italic`}>
                              (edited)
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Message actions */}
                    {message.type !== 'system' && (
                      <div className={`absolute top-0 ${isCurrentUser ? 'left-0' : 'right-0'} transform ${isCurrentUser ? '-translate-x-full' : 'translate-x-full'} opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 px-2`}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align={isCurrentUser ? "start" : "end"}>
                            <DropdownMenuItem onClick={() => handleReplyToMessage(message._id)}>
                              <Reply className="w-4 h-4 mr-2" />
                              Reply
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyMessage(message.content)}>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </DropdownMenuItem>
                            {isCurrentUser && (
                              <>
                                <DropdownMenuItem onClick={() => handleEditMessage(message._id)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteMessage(message._id)}
                                  className="text-red-600"
                                >
                                  <Trash className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    )}
                    
                    {/* Message status for sent messages */}
                    {isCurrentUser && messageIndex === messageGroup.length - 1 && (
                      <div className="flex items-center justify-end mt-1 space-x-1">
                        <span className="text-xs text-gray-500">
                          {formatMessageTime(message.createdAt)}
                        </span>
                        {getMessageStatus(message)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Typing indicator would go here */}
      <div className="flex justify-start">
        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-2xl rounded-bl-sm max-w-xs opacity-0">
          <div className="typing-indicator">
            <div className="typing-dot" style={{ '--delay': '0ms' } as React.CSSProperties}></div>
            <div className="typing-dot" style={{ '--delay': '150ms' } as React.CSSProperties}></div>
            <div className="typing-dot" style={{ '--delay': '300ms' } as React.CSSProperties}></div>
          </div>
          <span className="text-xs text-gray-500">typing...</span>
        </div>
      </div>
    </div>
  );
}
