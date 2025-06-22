"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Network, Search, Filter, MapPin, Building, Mail, MessageCircle, UserPlus, Users } from "lucide-react"
import Navigation from "@/components/navigation"

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCollegeType, setSelectedCollegeType] = useState("")
  const [selectedCollege, setSelectedCollege] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedBatch, setSelectedBatch] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")

  // Get URL parameters for pre-filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const college = urlParams.get("college")
    const department = urlParams.get("department")

    if (college) {
      setSelectedCollege(college)
    }
    if (department) {
      setSelectedDepartment(department)
    }
  }, [])

  const collegeTypes = [
    "All Types",
    "Campus Colleges",
    "Constituent Colleges",
    "Affiliated Colleges",
    "Autonomous Colleges",
  ]

  const colleges = [
    "All Colleges",
    // Campus Colleges
    "University College of Engineering (UCE)",
    "University College of Technology (UCT)",
    "University College of Law (UCL)",
    "University College of Commerce (UCC)",
    // Constituent Colleges
    "Nizam College",
    "City College",
    "Osmania Medical College",
    "P.G. College of Law",
    // Affiliated Colleges
    "St. Francis College for Women",
    "Vasavi College of Engineering",
    "CBIT",
    "MGIT",
    // More colleges...
  ]

  const departments = [
    "All Departments",
    "Computer Science & Engineering",
    "Electronics & Communication Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Information Technology",
    "Commerce",
    "Arts",
    "Science",
    "Law",
    "Medicine",
    "Management",
  ]

  const alumni = [
    {
      id: 1,
      name: "Rajesh Kumar",
      college: "University College of Engineering",
      collegeType: "Campus College",
      department: "Computer Science & Engineering",
      batch: "2015",
      position: "Senior Software Engineer",
      company: "Google",
      location: "Bangalore",
      industry: "Technology",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      connections: 245,
      mutualConnections: 12,
      skills: ["Machine Learning", "Cloud Computing", "System Design"],
    },
    {
      id: 2,
      name: "Priya Sharma",
      college: "Nizam College",
      collegeType: "Constituent College",
      department: "Commerce",
      batch: "2018",
      position: "Founder & CEO",
      company: "TechStart Solutions",
      location: "Hyderabad",
      industry: "Entrepreneurship",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      connections: 189,
      mutualConnections: 8,
      skills: ["Business Strategy", "Leadership", "Fintech"],
    },
    {
      id: 3,
      name: "Dr. Kavitha Reddy",
      college: "Osmania Medical College",
      collegeType: "Constituent College",
      department: "Medicine",
      batch: "2012",
      position: "Senior Cardiologist",
      company: "Apollo Hospitals",
      location: "Hyderabad",
      industry: "Healthcare",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      connections: 298,
      mutualConnections: 15,
      skills: ["Cardiology", "Medical Research", "Patient Care"],
    },
    {
      id: 4,
      name: "Mohammed Ali",
      college: "Vasavi College of Engineering",
      collegeType: "Affiliated College",
      department: "Electronics & Communication Engineering",
      batch: "2017",
      position: "Product Manager",
      company: "Microsoft",
      location: "Seattle, USA",
      industry: "Technology",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      connections: 167,
      mutualConnections: 9,
      skills: ["Product Management", "IoT", "5G Technology"],
    },
    {
      id: 5,
      name: "Arjun Mehta",
      college: "St. Francis College for Women",
      collegeType: "Affiliated College",
      department: "Management",
      batch: "2020",
      position: "Management Consultant",
      company: "McKinsey & Company",
      location: "Mumbai",
      industry: "Consulting",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      connections: 156,
      mutualConnections: 5,
      skills: ["Strategy Consulting", "Digital Transformation", "Analytics"],
    },
    {
      id: 6,
      name: "Lakshmi Devi",
      college: "University College of Law",
      collegeType: "Campus College",
      department: "Law",
      batch: "2016",
      position: "Senior Associate",
      company: "Khaitan & Co",
      location: "Delhi",
      industry: "Legal",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      connections: 134,
      mutualConnections: 6,
      skills: ["Corporate Law", "Mergers & Acquisitions", "Legal Research"],
    },
  ]

  // Filter alumni based on selected criteria
  const filteredAlumni = alumni.filter((person) => {
    const matchesSearch =
      searchTerm === "" ||
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCollegeType =
      selectedCollegeType === "" || selectedCollegeType === "All Types" || person.collegeType === selectedCollegeType

    const matchesCollege =
      selectedCollege === "" ||
      selectedCollege === "All Colleges" ||
      person.college.includes(selectedCollege) ||
      selectedCollege === person.college

    const matchesDepartment =
      selectedDepartment === "" || selectedDepartment === "All Departments" || person.department === selectedDepartment

    const matchesBatch = selectedBatch === "" || selectedBatch === "All Batches" || person.batch === selectedBatch

    const matchesLocation =
      selectedLocation === "" || selectedLocation === "All Locations" || person.location.includes(selectedLocation)

    return matchesSearch && matchesCollegeType && matchesCollege && matchesDepartment && matchesBatch && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Network className="h-8 w-8 text-blue-600 mr-3" />
            Alumni Network Directory
          </h1>
          <p className="text-gray-600">
            Connect with 15+ Lakh alumni from Campus, Constituent, Affiliated, and Autonomous colleges under Osmania
            University
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="grid lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="search" className="text-sm font-medium mb-2 block">
                  Search Alumni
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name, company, skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">College Type</Label>
                <Select value={selectedCollegeType} onValueChange={setSelectedCollegeType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {collegeTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
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
                    {colleges.map((college) => (
                      <SelectItem key={college} value={college}>
                        {college}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Department</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Batch</Label>
                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Batches" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "All Batches",
                      "2024",
                      "2023",
                      "2022",
                      "2021",
                      "2020",
                      "2019",
                      "2018",
                      "2017",
                      "2016",
                      "2015",
                    ].map((batch) => (
                      <SelectItem key={batch} value={batch}>
                        {batch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Showing {filteredAlumni.length} alumni</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCollegeType("")
                  setSelectedCollege("")
                  setSelectedDepartment("")
                  setSelectedBatch("")
                  setSelectedLocation("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alumni Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlumni.map((person) => (
            <Card key={person.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={person.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg flex items-center">
                        {person.name}
                        {person.verified && (
                          <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs hover:bg-blue-100">✓</Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">{person.position}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="h-4 w-4 mr-2" />
                    {person.company}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {person.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Network className="h-4 w-4 mr-2" />
                    {person.department} • Class of {person.batch}
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {person.collegeType}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {person.industry}
                  </Badge>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-1">
                    {person.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {person.connections} connections
                  </span>
                  <span>{person.mutualConnections} mutual</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAlumni.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No alumni found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCollegeType("")
                setSelectedCollege("")
                setSelectedDepartment("")
                setSelectedBatch("")
                setSelectedLocation("")
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredAlumni.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50">
              Load More Alumni
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
