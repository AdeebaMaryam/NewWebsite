"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Users, Search, Plus, Hash, Lock } from "lucide-react"
import Navigation from "@/components/navigation"

export default function ChatPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const directMessages = [
    {
      id: 1,
      name: "Rajesh Kumar",
      college: "UCE",
      batch: "2015",
      lastMessage: "Thanks for the referral opportunity!",
      time: "2 min ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      college: "Nizam College",
      batch: "2018",
      lastMessage: "Let's catch up this weekend",
      time: "1 hour ago",
      unread: 0,
      online: true,
    },
    {
      id: 3,
      name: "Dr. Kavitha Reddy",
      college: "OMC",
      batch: "2012",
      lastMessage: "Great presentation at the conference",
      time: "3 hours ago",
      unread: 1,
      online: false,
    },
  ]

  const groups = [
    {
      id: 1,
      name: "UCE Alumni Network",
      type: "college",
      members: 15420,
      lastActivity: "5 min ago",
      description: "Official UCE alumni group for networking and updates",
      privacy: "public",
      unread: 5,
    },
    {
      id: 2,
      name: "CSE Batch 2015-2019",
      type: "batch",
      members: 245,
      lastActivity: "15 min ago",
      description: "Computer Science batch group for our batch mates",
      privacy: "private",
      unread: 12,
    },
    {
      id: 3,
      name: "OU Tech Entrepreneurs",
      type: "interest",
      members: 890,
      lastActivity: "1 hour ago",
      description: "For Osmanian entrepreneurs and startup founders",
      privacy: "public",
      unread: 3,
    },
    {
      id: 4,
      name: "Hyderabad Osmanians",
      type: "location",
      members: 5670,
      lastActivity: "2 hours ago",
      description: "Alumni living in Hyderabad city",
      privacy: "public",
      unread: 0,
    },
    {
      id: 5,
      name: "OU Women in Tech",
      type: "interest",
      members: 1250,
      lastActivity: "4 hours ago",
      description: "Supporting women Osmanians in technology",
      privacy: "public",
      unread: 2,
    },
  ]

  const collegeGroups = [
    { name: "UCE Alumni", members: 15420, college: "University College of Engineering" },
    { name: "Nizam College Alumni", members: 12800, college: "Nizam College" },
    { name: "Vasavi College Alumni", members: 8900, college: "Vasavi College of Engineering" },
    { name: "CBIT Alumni", members: 7650, college: "Chaitanya Bharathi Institute of Technology" },
    { name: "St. Francis Alumni", members: 6200, college: "St. Francis College for Women" },
  ]

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredDMs = directMessages.filter(
    (dm) =>
      dm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dm.college.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <MessageCircle className="h-8 w-8 text-blue-600 mr-3" />
            Osmanian Chat Network
          </h1>
          <p className="text-gray-600">Connect and chat with fellow Osmanians through groups and direct messages</p>
        </div>

        {/* Search */}
        <div className="max-w-md mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search chats, groups, or people..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Start New Chat
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
                <Button variant="outline" className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Find Groups
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Popular College Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {collegeGroups.slice(0, 5).map((group, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-gray-500 text-xs">{group.members.toLocaleString()} members</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Join
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="groups" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="messages">Direct Messages</TabsTrigger>
              </TabsList>

              <TabsContent value="groups" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Groups</h2>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Join New Group
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {filteredGroups.map((group) => (
                    <Card
                      key={group.id}
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              {group.privacy === "private" ? (
                                <Lock className="h-6 w-6 text-white" />
                              ) : (
                                <Hash className="h-6 w-6 text-white" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{group.name}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge variant="secondary" className="text-xs">
                                  {group.type}
                                </Badge>
                                {group.privacy === "private" && (
                                  <Badge variant="outline" className="text-xs">
                                    <Lock className="h-2 w-2 mr-1" />
                                    Private
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          {group.unread > 0 && <Badge className="bg-red-500 text-white">{group.unread}</Badge>}
                        </div>

                        <p className="text-gray-600 text-sm mb-4">{group.description}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {group.members.toLocaleString()} members
                          </span>
                          <span>Active {group.lastActivity}</span>
                        </div>

                        <Link href={`/chat/groups/${group.id}`}>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Open Chat
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="messages" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Direct Messages</h2>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </div>

                <div className="space-y-4">
                  {filteredDMs.map((dm) => (
                    <Card
                      key={dm.id}
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                  {dm.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {dm.online && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h3 className="font-semibold">{dm.name}</h3>
                                <Badge variant="secondary" className="text-xs">
                                  {dm.college}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Class of {dm.batch}
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-sm">{dm.lastMessage}</p>
                              <p className="text-gray-400 text-xs">{dm.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {dm.unread > 0 && <Badge className="bg-red-500 text-white">{dm.unread}</Badge>}
                            <Link href={`/chat/messages/${dm.id}`}>
                              <Button size="sm">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
