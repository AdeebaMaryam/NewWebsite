import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  Heart, 
  TrendingUp, 
  Bell,
  Plus,
  Briefcase,
  Network
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import MetricsWidget from "@/components/dashboard/MetricsWidget";
import QuickActions from "@/components/dashboard/QuickActions";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();

  // Fetch dashboard data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['/api/dashboard'],
    refetchInterval: 30000 // Refresh every 30 seconds for real-time updates
  });

  // Fetch recent posts for feed
  const { data: postsData } = useQuery({
    queryKey: ['/api/posts'],
    refetchInterval: 15000 // More frequent updates for posts
  });

  // Fetch upcoming events
  const { data: eventsData } = useQuery({
    queryKey: ['/api/events', { startDate: new Date().toISOString() }],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
              <p className="text-gray-600">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-gray-600">
                {user?.education?.college} • Class of {user?.education?.graduationYear}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {user?.education?.collegeType} College
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {user?.education?.department}
                </Badge>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
          <MetricsWidget
            title="Network"
            value={dashboardData?.connections || 0}
            icon={Users}
            color="blue"
            trend="+12 this month"
          />
          <MetricsWidget
            title="Messages"
            value={dashboardData?.chats || 0}
            icon={MessageCircle}
            color="green"
            trend="3 unread"
          />
          <MetricsWidget
            title="Events"
            value={dashboardData?.upcomingEvents || 0}
            icon={Calendar}
            color="purple"
            trend="2 this week"
          />
          <MetricsWidget
            title="Posts"
            value={dashboardData?.posts || 0}
            icon={Briefcase}
            color="amber"
            trend="Last post 2d ago"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity Feed */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-ou-blue mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest updates from your network and the Osmanian community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityFeed 
                  activities={dashboardData?.recentActivity || []} 
                  posts={postsData?.posts || []}
                />
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-600 mr-2" />
                    Upcoming Events
                  </CardTitle>
                  <Link href="/events">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventsData?.events?.slice(0, 3).map((event: any) => (
                    <div key={event._id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{event.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{new Date(event.startDate).toLocaleDateString()}</span>
                          <span>{event.location.venue}</span>
                          <Badge variant="secondary" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No upcoming events</p>
                      <Link href="/events">
                        <Button variant="outline" size="sm" className="mt-2">
                          Browse Events
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions />

            {/* Network Stats */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Network className="h-5 w-5 text-purple-600 mr-2" />
                  Your Network
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Profile Views</span>
                    <span className="font-bold text-purple-600">127</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Connections</span>
                    <span className="font-bold text-ou-blue">{dashboardData?.connections || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-ou-blue h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Engagement</span>
                    <span className="font-bold text-green-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <Link href="/directory">
                    <Button variant="outline" className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      Find More Alumni
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Donation Impact */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 text-red-600 mr-2" />
                  Make an Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Support current students and help build the future of Osmania University.
                </p>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded-lg border border-red-100">
                    <div className="font-semibold text-sm text-gray-900">Scholarship Fund</div>
                    <div className="text-xs text-gray-600 mt-1">₹12,45,000 raised of ₹20,00,000</div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <Link href="/donate">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Heart className="w-4 h-4 mr-2" />
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 text-amber-600 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New connection request</p>
                      <p className="text-xs text-gray-600">Priya Sharma wants to connect</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Event reminder</p>
                      <p className="text-xs text-gray-600">UCE Alumni Meetup tomorrow</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Message received</p>
                      <p className="text-xs text-gray-600">New message in Engineering group</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
