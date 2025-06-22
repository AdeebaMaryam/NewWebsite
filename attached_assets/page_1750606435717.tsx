"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Network,
  Users,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Briefcase,
  Calendar,
  MapPin,
  Building,
} from "lucide-react"
import Navigation from "@/components/navigation"

export default function NetworkPage() {
  const [postContent, setPostContent] = useState("")

  const posts = [
    {
      id: 1,
      author: {
        name: "Rajesh Kumar",
        title: "Senior Software Engineer at Google",
        college: "UCE",
        batch: "2015",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Excited to announce that I'm starting a new role as Tech Lead at Google Cloud! Looking forward to working on cutting-edge AI projects. Grateful for the foundation I received at UCE. 🚀 #NewRole #GoogleCloud #UCEAlumni",
      timestamp: "2 hours ago",
      likes: 45,
      comments: 12,
      shares: 8,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 2,
      author: {
        name: "Dr. Priya Sharma",
        title: "Founder & CEO at TechStart Solutions",
        college: "Nizam College",
        batch: "2018",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Just closed our Series A funding round! 🎉 Couldn't have done it without the incredible network of Osmanian entrepreneurs who believed in our vision. Special thanks to my Nizam College batch mates for their support. #Startup #SeriesA #NizamCollege",
      timestamp: "5 hours ago",
      likes: 128,
      comments: 34,
      shares: 22,
    },
    {
      id: 3,
      author: {
        name: "Mohammed Ali",
        title: "Product Manager at Microsoft",
        college: "Vasavi College",
        batch: "2017",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content:
        "Attending the OU Alumni Tech Conference next week in Seattle! Excited to meet fellow Osmanians working in tech. If you're in the area, let's connect! #OUAlumni #TechConference #Seattle",
      timestamp: "1 day ago",
      likes: 67,
      comments: 18,
      shares: 15,
    },
  ]

  const connections = [
    {
      name: "Arjun Reddy",
      title: "Data Scientist at Amazon",
      college: "UCE",
      batch: "2019",
      mutualConnections: 12,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Kavitha Rao",
      title: "Civil Engineer at L&T",
      college: "UCE",
      batch: "2020",
      mutualConnections: 8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Srinivas Reddy",
      title: "Marketing Manager at Flipkart",
      college: "Nizam College",
      batch: "2016",
      mutualConnections: 15,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const events = [
    {
      id: 1,
      title: "OU Alumni Tech Meetup - Hyderabad",
      date: "Dec 15, 2024",
      time: "6:00 PM",
      location: "HITEC City, Hyderabad",
      attendees: 156,
      type: "Networking",
    },
    {
      id: 2,
      title: "UCE Batch 2015 Reunion",
      date: "Dec 20, 2024",
      time: "11:00 AM",
      location: "UCE Campus",
      attendees: 89,
      type: "Reunion",
    },
    {
      id: 3,
      title: "Women in Tech - OU Chapter",
      date: "Dec 25, 2024",
      time: "4:00 PM",
      location: "Virtual Event",
      attendees: 234,
      type: "Professional",
    },
  ]

  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Microsoft",
      location: "Hyderabad",
      type: "Full-time",
      postedBy: "Rajesh Kumar (UCE '15)",
      applicants: 23,
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Amazon",
      location: "Bangalore",
      type: "Full-time",
      postedBy: "Priya Sharma (NC '18)",
      applicants: 45,
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "Google",
      location: "Remote",
      type: "Contract",
      postedBy: "Mohammed Ali (VCE '17)",
      applicants: 67,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Network className="h-8 w-8 text-blue-600 mr-3" />
            Osmanian Professional Network
          </h1>
          <p className="text-gray-600">Connect, share, and grow with fellow Osmanians worldwide</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Summary */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6 text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700">
                    Adeeba Maryam
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">Adeeba Maryam</h3>
                <p className="text-gray-600 text-sm">Software Engineer at Microsoft</p>
                <p className="text-gray-500 text-sm">UCE Class of 2018</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Connections</span>
                    <span className="font-semibold text-blue-600">127</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Profile Views</span>
                    <span className="font-semibold text-green-600">45</span>
                  </div>
                </div>
                <Link href="/profile">
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">View Profile</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Find Alumni
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Post Job
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="feed" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="connections">Connections</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6">
                {/* Create Post */}
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">Adeeba Maryam</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea
                          placeholder="Share your thoughts with fellow Osmanians..."
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                          className="border-0 resize-none focus:ring-0 p-0"
                          rows={3}
                        />
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              📷 Photo
                            </Button>
                            <Button variant="ghost" size="sm">
                              📹 Video
                            </Button>
                            <Button variant="ghost" size="sm">
                              📄 Document
                            </Button>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">Post</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts Feed */}
                {posts.map((post) => (
                  <Card key={post.id} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{post.author.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {post.author.college}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              '{post.author.batch}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm">{post.author.title}</p>
                          <p className="text-gray-400 text-xs">{post.timestamp}</p>
                        </div>
                      </div>

                      <p className="text-gray-800 mb-4">{post.content}</p>

                      {post.image && (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full rounded-lg mb-4"
                        />
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex space-x-6">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                            <Share2 className="h-4 w-4 mr-1" />
                            {post.shares}
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="connections" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Connections</h2>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Find More
                  </Button>
                </div>

                <div className="space-y-4">
                  {connections.map((connection, index) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={connection.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {connection.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{connection.name}</h3>
                              <p className="text-gray-600 text-sm">{connection.title}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {connection.college}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  '{connection.batch}
                                </Badge>
                              </div>
                              <p className="text-gray-400 text-xs">{connection.mutualConnections} mutual connections</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm">Connect</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Upcoming Events</h2>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </div>

                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {event.date} at {event.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                {event.location}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-2" />
                                {event.attendees} attending
                              </div>
                            </div>
                            <Badge className="mt-3" variant="secondary">
                              {event.type}
                            </Badge>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">Attend</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="jobs" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Job Opportunities</h2>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Job
                  </Button>
                </div>

                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job.id} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Building className="h-4 w-4 mr-2" />
                                {job.company}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-2" />
                                {job.type}
                              </div>
                            </div>
                            <div className="mt-3 flex items-center space-x-2">
                              <Badge variant="secondary">Posted by {job.postedBy}</Badge>
                              <Badge variant="outline">{job.applicants} applicants</Badge>
                            </div>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">Apply</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Trending */}
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                  Trending
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">#OUAlumniMeet2024</p>
                  <p className="text-gray-500">1,234 posts</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">#TechCareers</p>
                  <p className="text-gray-500">856 posts</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">#StartupLife</p>
                  <p className="text-gray-500">642 posts</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">#UCEReunion</p>
                  <p className="text-gray-500">423 posts</p>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Connections */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">People You May Know</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {connections.slice(0, 3).map((person, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{person.name}</p>
                        <p className="text-xs text-gray-500">{person.college}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Connect
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
