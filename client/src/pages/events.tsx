import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Plus, 
  Filter,
  Search,
  Building2,
  Video,
  ExternalLink
} from "lucide-react";
import Navigation from "@/components/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function EventsPage() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");

  // Fetch events
  const { data: eventsData, isLoading } = useQuery({
    queryKey: ['/api/events', { type: selectedType, college: selectedCollege }]
  });

  // Fetch colleges for filter
  const { data: collegesData } = useQuery({
    queryKey: ['/api/colleges']
  });

  const eventTypes = [
    "All Types",
    "reunion",
    "networking", 
    "seminar",
    "cultural",
    "sports",
    "professional",
    "social"
  ];

  const events = eventsData?.events || [];

  const filteredEvents = events.filter((event: any) => {
    const matchesSearch = searchTerm === "" || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      reunion: "bg-purple-100 text-purple-800",
      networking: "bg-blue-100 text-blue-800",
      seminar: "bg-green-100 text-green-800",
      cultural: "bg-pink-100 text-pink-800",
      sports: "bg-orange-100 text-orange-800",
      professional: "bg-indigo-100 text-indigo-800",
      social: "bg-yellow-100 text-yellow-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("");
    setSelectedCollege("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Calendar className="h-8 w-8 text-green-600 mr-3" />
              Events & Meetups
            </h1>
            <p className="text-gray-600">
              Connect with fellow Osmanians through events, reunions, and professional meetups
            </p>
          </div>
          {isAuthenticated && (
            <Button className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="grid lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                  Search Events
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by title, description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Event Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type === "All Types" ? "" : type}>
                        {type === "All Types" ? type : type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">College</Label>
                <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Colleges" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Colleges</SelectItem>
                    {collegesData?.colleges?.map((college: any) => (
                      <SelectItem key={college._id} value={college._id}>
                        {college.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {isLoading ? "Loading..." : `Showing ${filteredEvents.length} events`}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event: any) => (
              <Card key={event._id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                    {event.location.isVirtual && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        <Video className="w-3 h-3 mr-1" />
                        Virtual
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-green-600 transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">
                        {event.location.isVirtual ? "Online Event" : `${event.location.venue}, ${event.location.city}`}
                      </span>
                    </div>
                    {event.college && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{event.college.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={event.organizer?.profile?.avatar} />
                        <AvatarFallback className="text-xs bg-gray-200">
                          {event.organizer?.firstName?.[0]}{event.organizer?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">
                        by {event.organizer?.firstName} {event.organizer?.lastName}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{event.attendees?.length || 0}</span>
                      {event.capacity && <span>/{event.capacity}</span>}
                    </div>
                  </div>

                  {event.fees > 0 && (
                    <div className="mb-4">
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        ₹{event.fees.toLocaleString()} Registration Fee
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Register Now
                    </Button>
                    {event.location.isVirtual && event.location.meetingLink && (
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedType || selectedCollege 
                  ? "Try adjusting your search criteria to find more events."
                  : "No events are currently scheduled. Check back later!"
                }
              </p>
              {searchTerm || selectedType || selectedCollege ? (
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              ) : isAuthenticated && (
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Event
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
