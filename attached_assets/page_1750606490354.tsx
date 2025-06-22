"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Edit,
  MapPin,
  Building,
  Calendar,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Award,
  Briefcase,
  GraduationCap,
  MessageCircle,
} from "lucide-react"
import Navigation from "@/components/navigation"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const userProfile = {
    name: "Adeeba Maryam",
    title: "Senior Software Engineer",
    company: "Microsoft",
    location: "Hyderabad, India",
    college: "University College of Engineering",
    batch: "2018",
    department: "Computer Science & Engineering",
    bio: "Passionate software engineer with 6+ years of experience in cloud computing and AI. Proud Osmanian working on cutting-edge technologies at Microsoft. Always excited to connect with fellow alumni and share knowledge.",
    email: "john.doe@email.com",
    phone: "+91 9876543210",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    connections: 127,
    profileViews: 45,
    posts: 23,
    skills: ["JavaScript", "Python", "React", "Node.js", "AWS", "Azure", "Machine Learning", "System Design"],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Microsoft",
        duration: "2022 - Present",
        location: "Hyderabad, India",
        description:
          "Leading development of cloud-native applications using Azure services. Mentoring junior developers and contributing to architectural decisions.",
      },
      {
        title: "Software Engineer",
        company: "Amazon",
        duration: "2020 - 2022",
        location: "Bangalore, India",
        description:
          "Developed scalable microservices for e-commerce platform. Improved system performance by 40% through optimization.",
      },
      {
        title: "Junior Software Developer",
        company: "TCS",
        duration: "2018 - 2020",
        location: "Hyderabad, India",
        description:
          "Started career developing web applications using Java and Spring framework. Gained experience in full-stack development.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering",
        field: "Computer Science & Engineering",
        institution: "University College of Engineering, Osmania University",
        year: "2014 - 2018",
        grade: "First Class with Distinction",
      },
    ],
    achievements: [
      "Microsoft Azure Certified Solutions Architect",
      "AWS Certified Developer",
      "Best Employee Award 2023 - Microsoft",
      "Published 3 research papers in AI/ML conferences",
    ],
  }

  const recentActivity = [
    {
      type: "post",
      content: "Excited to share my experience at the Microsoft Build conference...",
      timestamp: "2 days ago",
      engagement: "45 likes, 12 comments",
    },
    {
      type: "connection",
      content: "Connected with Priya Sharma (Nizam College '19)",
      timestamp: "3 days ago",
      engagement: "",
    },
    {
      type: "achievement",
      content: "Completed AWS Solutions Architect certification",
      timestamp: "1 week ago",
      engagement: "67 likes, 23 comments",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700">
                    Adeeba Maryam
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{userProfile.name}</h2>
                <p className="text-gray-600 mb-2">{userProfile.title}</p>
                <p className="text-gray-500 text-sm mb-4">{userProfile.company}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {userProfile.location}
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {userProfile.college}
                  </div>
                  <div className="flex items-center justify-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Class of {userProfile.batch}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{userProfile.connections}</div>
                    <div className="text-xs text-gray-600">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{userProfile.profileViews}</div>
                    <div className="text-xs text-gray-600">Profile Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{userProfile.posts}</div>
                    <div className="text-xs text-gray-600">Posts</div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-3 text-gray-400" />
                  <span className="text-gray-600">{userProfile.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-3 text-gray-400" />
                  <span className="text-gray-600">{userProfile.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Globe className="h-4 w-4 mr-3 text-gray-400" />
                  <a href={userProfile.website} className="text-blue-600 hover:underline">
                    {userProfile.website}
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <Linkedin className="h-4 w-4 mr-3 text-gray-400" />
                  <a href={userProfile.linkedin} className="text-blue-600 hover:underline">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <Github className="h-4 w-4 mr-3 text-gray-400" />
                  <a href={userProfile.github} className="text-blue-600 hover:underline">
                    GitHub Profile
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <User className="h-5 w-5 text-blue-600 mr-2" />
                        About
                      </span>
                      {isEditing && (
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea defaultValue={userProfile.bio} rows={4} className="w-full" />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="h-5 w-5 text-yellow-600 mr-2" />
                      Achievements & Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userProfile.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                          <p className="text-gray-700">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                        Work Experience
                      </span>
                      {isEditing && (
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {userProfile.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-blue-200 pl-6 relative">
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-2 top-2"></div>
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <Building className="h-4 w-4" />
                          <span>{exp.company}</span>
                          <span>•</span>
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {userProfile.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-green-200 pl-6 relative">
                        <div className="absolute w-3 h-3 bg-green-600 rounded-full -left-2 top-2"></div>
                        <h3 className="font-semibold text-lg">{edu.degree}</h3>
                        <p className="text-gray-600 mb-2">{edu.field}</p>
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <Building className="h-4 w-4" />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 mb-3">
                          <Calendar className="h-4 w-4" />
                          <span>{edu.year}</span>
                          <span>•</span>
                          <span>{edu.grade}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Award className="h-5 w-5 text-blue-600 mr-2" />
                        Skills & Expertise
                      </span>
                      {isEditing && (
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                          {skill}
                        </Badge>
                      ))}
                      {isEditing && (
                        <Button size="sm" variant="outline" className="h-8">
                          + Add Skill
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4 relative">
                        <div className="absolute w-2 h-2 bg-blue-600 rounded-full -left-1.5 top-2"></div>
                        <p className="text-gray-800">{activity.content}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <span>{activity.timestamp}</span>
                          {activity.engagement && (
                            <>
                              <span>•</span>
                              <span>{activity.engagement}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
