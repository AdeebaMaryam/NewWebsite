"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Crown,
  Users,
  Calendar,
  Briefcase,
  Heart,
  MessageCircle,
  Trophy,
  MapPin,
  Building,
  Star,
  TrendingUp,
} from "lucide-react"
import Navigation from "@/components/navigation"

export default function DashboardPage() {
  const [userType] = useState("alumni")

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-amber-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-amber-200">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg bg-gradient-to-br from-amber-100 to-blue-100 text-amber-700">
                      Adeeba Maryam
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg text-gray-900">Adeeba Maryam</h3>
                  <p className="text-gray-600 text-sm">Software Engineer</p>
                  <p className="text-gray-500 text-sm flex items-center justify-center mt-1">
                    <Building className="h-3 w-3 mr-1" />
                    Microsoft
                  </p>
                  <p className="text-gray-500 text-sm flex items-center justify-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    Hyderabad, India
                  </p>
                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <Badge className="bg-gradient-to-r from-amber-100 to-blue-100 text-amber-800 hover:from-amber-100 hover:to-blue-100">
                      <Crown className="h-3 w-3 mr-1" />
                      UCE Class of 2018
                    </Badge>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Profile Completion</span>
                    <span className="font-medium text-amber-600">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-blue-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-gradient-to-r from-amber-600 to-blue-600 hover:from-amber-700 hover:to-blue-700 text-white">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Osmanian Pride Stats */}
            <Card className="border-0 shadow-lg mt-6 bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-5 w-5 text-amber-600 mr-2" />
                  Your Osmanian Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Osmanian Connections</span>
                  </div>
                  <span className="font-semibold text-blue-600">127</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Contributions</span>
                  </div>
                  <span className="font-semibold text-red-600">₹25,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Mentoring</span>
                  </div>
                  <span className="font-semibold text-green-600">8 Students</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Osmanian Points</span>
                  </div>
                  <span className="font-semibold text-yellow-600">1,250</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-lg p-6 text-white mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h1 className="text-2xl font-bold mb-2 flex items-center">
                  <Crown className="h-6 w-6 mr-2" />
                  Adaab, John! Welcome back to your Osmanian family 🏛️
                </h1>
                <p className="text-amber-100">
                  You have 3 new connections from fellow Osmanians across affiliated colleges and 2 upcoming alumni
                  events this week.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gradient-to-br from-white to-blue-50">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-sm text-blue-800">Find Osmanians</h3>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gradient-to-br from-white to-green-50">
                <CardContent className="p-4 text-center">
                  <Briefcase className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-sm text-green-800">Post Opportunity</h3>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gradient-to-br from-white to-purple-50">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-sm text-purple-800">Create Event</h3>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group bg-gradient-to-br from-white to-red-50">
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 text-red-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-sm text-red-800">Give Back</h3>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Osmanian Activity */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-amber-50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="h-5 w-5 text-amber-600 mr-2" />
                    Osmanian Network Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-amber-600 hover:bg-amber-100">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600">SA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Sarah Ahmed (Govt. College Karimnagar '19)</span> connected with
                        you
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-100 text-green-600">RK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Raj Kumar (St. Francis College '17)</span> posted a job at Goldman
                        Sachs
                      </p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-purple-100 text-purple-600">OU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">OU Alumni Office</span> announced District Alumni Meet - Warangal
                      </p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Osmanian Events */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    Upcoming Osmanian Events
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-amber-600 pl-4 bg-amber-50 p-3 rounded-r-lg">
                    <h4 className="font-medium text-sm text-amber-800">Annual Osmanian Meet 2024</h4>
                    <p className="text-xs text-amber-700">Dec 15, 2024 • OU Campus, Hyderabad</p>
                    <p className="text-xs text-amber-600 mt-1">500+ Osmanians registered</p>
                  </div>

                  <div className="border-l-4 border-green-600 pl-4 bg-green-50 p-3 rounded-r-lg">
                    <h4 className="font-medium text-sm text-green-800">UCE Tech Talk: AI Revolution</h4>
                    <p className="text-xs text-green-700">Dec 20, 2024 • Virtual Event</p>
                    <p className="text-xs text-green-600 mt-1">150+ attendees registered</p>
                  </div>

                  <div className="border-l-4 border-purple-600 pl-4 bg-purple-50 p-3 rounded-r-lg">
                    <h4 className="font-medium text-sm text-purple-800">Nizam College Reunion</h4>
                    <p className="text-xs text-purple-700">Dec 25, 2024 • Nizam College Campus</p>
                    <p className="text-xs text-purple-600 mt-1">80+ alumni confirmed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Success Stories from Fellow Osmanians */}
            <Card className="border-0 shadow-lg mt-8 bg-gradient-to-br from-white to-green-50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Trophy className="h-5 w-5 text-green-600 mr-2" />
                  Osmanian Success Stories
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-100">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-green-200 rounded-lg p-4 hover:bg-green-50 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-green-100 text-green-600">PK</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-sm">Priya Krishnan</h4>
                        <p className="text-xs text-gray-600">UCE Class of 2019</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      "Promoted to Senior Data Scientist at Amazon! The analytical thinking I learned at OU continues to
                      guide my career. Proud to be an Osmanian! 🏛️"
                    </p>
                    <div className="flex items-center space-x-2 mt-3">
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        Career Achievement
                      </Badge>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                  </div>

                  <div className="border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">AS</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-sm">Arjun Sharma</h4>
                        <p className="text-xs text-gray-600">UCT Class of 2020</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      "My startup just secured Series A funding! Grateful to the Osmanian network for mentorship and
                      support. Once an Osmanian, always an Osmanian! 👑"
                    </p>
                    <div className="flex items-center space-x-2 mt-3">
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                        Entrepreneurship
                      </Badge>
                      <span className="text-xs text-gray-500">1 week ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
