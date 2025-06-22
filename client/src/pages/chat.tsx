import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  MessageCircle, 
  Search, 
  Plus, 
  Phone, 
  Video, 
  MoreVertical,
  Users,
  Send,
  Paperclip,
  Smile
} from "lucide-react";
import Navigation from "@/components/navigation";
import ChatWindow from "@/components/chat/ChatWindow";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";

export default function ChatPage() {
  const { user, token } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // WebSocket connection
  const { isConnected, sendChatMessage, joinChat, leaveChat } = useSocket({
    token,
    onMessage: (message) => {
      // Handle incoming messages
      console.log('Received message:', message);
    }
  });

  // Fetch user's chats
  const { data: chatsData, isLoading } = useQuery({
    queryKey: ['/api/chats'],
    refetchInterval: 5000 // Refresh every 5 seconds for new messages
  });

  const chats = chatsData?.chats || [];

  const filteredChats = chats.filter((chat: any) => {
    if (!searchTerm) return true;
    
    const chatName = chat.type === 'direct' 
      ? chat.participants.find((p: any) => p._id !== user?._id)?.firstName + ' ' + 
        chat.participants.find((p: any) => p._id !== user?._id)?.lastName
      : chat.name;
    
    return chatName?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectedChatData = chats.find((chat: any) => chat._id === selectedChat);

  const handleChatSelect = (chatId: string) => {
    if (selectedChat) {
      leaveChat(selectedChat);
    }
    setSelectedChat(chatId);
    joinChat(chatId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      sendChatMessage(selectedChat, newMessage.trim());
      setNewMessage("");
    }
  };

  const formatLastMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    }
  };

  const getChatName = (chat: any) => {
    if (chat.type === 'group') {
      return chat.name;
    } else {
      const otherParticipant = chat.participants.find((p: any) => p._id !== user?._id);
      return otherParticipant ? `${otherParticipant.firstName} ${otherParticipant.lastName}` : 'Unknown';
    }
  };

  const getChatAvatar = (chat: any) => {
    if (chat.type === 'group') {
      return chat.avatar;
    } else {
      const otherParticipant = chat.participants.find((p: any) => p._id !== user?._id);
      return otherParticipant?.profile?.avatar;
    }
  };

  const getChatInitials = (chat: any) => {
    if (chat.type === 'group') {
      return chat.name?.substring(0, 2).toUpperCase() || 'GR';
    } else {
      const otherParticipant = chat.participants.find((p: any) => p._id !== user?._id);
      return otherParticipant ? 
        `${otherParticipant.firstName?.[0]}${otherParticipant.lastName?.[0]}` : 'UN';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
                    Messages
                  </CardTitle>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {isConnected && (
                  <div className="flex items-center text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Connected
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-y-auto scrollbar-thin">
                {isLoading ? (
                  <div className="space-y-4 p-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-3 animate-pulse">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredChats.length > 0 ? (
                  <div className="space-y-1">
                    {filteredChats.map((chat: any) => (
                      <div
                        key={chat._id}
                        className={`flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedChat === chat._id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                        }`}
                        onClick={() => handleChatSelect(chat._id)}
                      >
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={getChatAvatar(chat)} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                              {getChatInitials(chat)}
                            </AvatarFallback>
                          </Avatar>
                          {chat.type === 'group' && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                              <Users className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 truncate">
                              {getChatName(chat)}
                            </h4>
                            {chat.lastMessage && (
                              <span className="text-xs text-gray-500 ml-2">
                                {formatLastMessageTime(chat.lastMessage.timestamp)}
                              </span>
                            )}
                          </div>
                          {chat.lastMessage && (
                            <p className="text-sm text-gray-600 truncate">
                              {chat.lastMessage.content}
                            </p>
                          )}
                          {chat.type === 'group' && (
                            <div className="text-xs text-gray-500 mt-1">
                              {chat.participants.length} members
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations</h3>
                    <p className="text-gray-600 text-sm">
                      Start a conversation with fellow alumni
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            {selectedChatData ? (
              <Card className="border-0 shadow-sm h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={getChatAvatar(selectedChatData)} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-blue-600 text-white">
                          {getChatInitials(selectedChatData)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{getChatName(selectedChatData)}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedChatData.type === 'group' 
                            ? `${selectedChatData.participants.length} members`
                            : 'Online'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                  <ChatWindow chatId={selectedChat!} />
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="pr-10"
                      />
                      <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      size="icon" 
                      className="bg-blue-600 hover:bg-blue-700 h-8 w-8"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="border-0 shadow-sm h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a chat from the sidebar to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
