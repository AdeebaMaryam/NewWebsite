"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Search, MapPin, Clock, Users, Plus, Bookmark, Share2, Filter, Video } from "lucide-react"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  const events = [
    {
      id: 1,
      title: "OU Alumni Tech Meetup - Hyderabad",
      description:
        "Join fellow Osmanian tech professionals for networking, knowledge sharing, and career discussions. Special focus on AI and Cloud technologies.",
      date: "December 15, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "HITEC City, Hyderabad",
      type: "Networking",
      mode: "In-person",
      organizer: {
        name: "Rajesh Kumar",
        college: "UCE",
        batch: "2015",
      },
      attendees: 156,
      maxAttendees: 200,
      price: "Free",
      featured: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "UCE Batch 2015 Reunion",
      description:
        "Reconnect with your UCE batch mates after 9 years! Relive memories, share experiences, and plan for the future.",
      date: "December 20, 2024",
      time: "11:00 AM - 6:00 PM",
      location: "UCE Campus, Hyderabad",
      type: "Reunion",
      mode: "In-person",
      organizer: {
        name: "Priya Sharma",
        college: "UCE",
        batch: "2015",
      },
      attendees: 89,
      maxAttendees: 150,
      price: "₹500",
      featured: false,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Women in Tech - OU Chapter",
      description:
        "Empowering women Osmanians in technology. Panel discussion with successful women leaders from various tech companies.",
      date: "December 25, 2024",
      time: "4:00 PM - 7:00 PM",
      location: "Virtual Event",
      type: "Professional",
      mode: "Virtual",
      organizer: {
        name: "Dr. Kavitha Reddy",
        college: "OMC",
        batch: "2012",
      },
      attendees: 234,
      maxAttendees: 500,
      price: "Free",
      featured: true,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Nizam College Cultural Festival",
      description:
        "Annual cultural celebration featuring music, dance, poetry, and art by Nizam College alumni and students.",
      date: "January 5, 2025",
      time: "5:00 PM - 10:00 PM",
      location: "Nizam College Campus",
      type: "Cultural",
      mode: "In-person",
      organizer: {
        name: "Mohammed Ali",
        college: "Nizam College",
        batch: "2018",
      },
      attendees: 178,
      maxAttendees: 300,
      price: "₹200",
      featured: false,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const myEvents = [
    {
      id: 1,
      title: "OU Alumni Tech Meetup - Hyderabad",
      date: "December 15, 2024",
      status: "Attending",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      title: "Women in Tech - OU Chapter",
      date: "December 25, 2024",
      status: "Maybe",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
  ]

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchTerm === "" ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "" || event.type === selectedType
    const matchesLocation = selectedLocation === "" || event.mode === selectedLocation

    return matchesSearch && matchesType && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            Osmanian Events
          </h1>
          <p className="text-gray-600">Discover and attend events organized by fellow Osmanians</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  My Calendar
                </Button>
                <Button variant="outline" className="w-full">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Saved Events
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Event Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Networking</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reunions</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Professional</span>
                  <span className="font-semibold">67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cultural</span>
                  <span className="font-semibold">34</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="browse" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="browse">Browse Events</TabsTrigger>
                <TabsTrigger value="attending">My Events</TabsTrigger>
                <TabsTrigger value="organized">Organized by Me</TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="space-y-6">
                {/* Search and Filters */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-4">
                      <div className="lg:col-span-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Event Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="Networking">Networking</SelectItem>
                            <SelectItem value="Reunion">Reunion</SelectItem>
                            <SelectItem value="Professional">Professional</SelectItem>
                            <SelectItem value="Cultural">Cultural</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Modes</SelectItem>
                            <SelectItem value="In-person">In-person</SelectItem>
                            <SelectItem value="Virtual">Virtual</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Showing {filteredEvents.length} events</span>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSearchTerm("")}>
                        Clear Filters
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Events List */}
                <div className="space-y-6">
                  {filteredEvents.map((event) => (
                    <Card
                      key={event.id}
                      className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                        event.featured ? "ring-2 ring-blue-200" : ""
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-4 gap-6">
                          <div className="md:col-span-1">
                            <img
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                                  {event.featured && <Badge className="bg-blue-600 text-white">Featured</Badge>}
                                  <Badge variant="secondary">{event.type}</Badge>
                                </div>
                                <p className="text-gray-700 mb-3">{event.description}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center text-gray-600">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  {event.date}
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {event.time}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center text-gray-600">
                                  {event.mode === "Virtual" ? (
                                    <Video className="h-4 w-4 mr-2" />
                                  ) : (
                                    <MapPin className="h-4 w-4 mr-2" />
                                  )}
                                  {event.location}
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Users className="h-4 w-4 mr-2" />
                                  {event.attendees}/{event.maxAttendees} attending
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                      {event.organizer.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-sm font-medium">Organized by {event.organizer.name}</p>
                                    <p className="text-xs text-gray-500">
                                      {event.organizer.college} '{event.organizer.batch}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-sm">
                                  <Badge variant="outline">{event.price}</Badge>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline">Maybe</Button>
                                <Button className="bg-blue-600 hover:bg-blue-700">Attend</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="attending" className="space-y-6">
                <div className="space-y-4">
                  {myEvents.map((event) => (
                    <Card key={event.id} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <p className="text-gray-600">{event.date}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={event.statusColor}>{event.status}</Badge>
                            <div className="mt-2 space-x-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                Change Status
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="organized" className="space-y-6">
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No events organized yet</h3>
                  <p className="text-gray-600 mb-6">Start organizing events for the Osmanian community</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Event
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
