"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building2, Users, MapPin, Calendar, Search, GraduationCap, Star } from "lucide-react"
import { useState } from "react"
import Navigation from "@/components/navigation"

export default function AffiliatedCollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const affiliatedColleges = [
    {
      id: "deccan-college",
      name: "Deccan College of Engineering & Technology",
      shortName: "DCET",
      established: 1980,
      location: "Darusalam, Nampally, Hyderabad",
      departments: [
        "Computer Science & Engineering",
        "Electronics & Communication",
        "Mechanical Engineering",
        "Civil Engineering",
        "Electrical & Electronics Engineering",
        "Information Technology",
      ],
      alumni: 25000,
      description: "Engineering college offering diverse technical programs with industry focus.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Industry partnerships", "Technical excellence", "Diverse programs"],
      type: "Private",
      contact: "04024802634",
      courses: ["B.E", "M.Tech"],
    },
    {
      id: "mjcet",
      name: "Muffakham Jah College of Engineering & Technology",
      shortName: "MJCET",
      established: 1963,
      location: "8-2-249 to 267, Road No. 3, Banjara Hills, Hyderabad",
      departments: [
        "Computer Science & Engineering",
        "AI & Data Science",
        "Mechanical Engineering",
        "Civil Engineering",
        "AI & Machine Learning",
        "Electronics & Communication",
        "Electrical & Electronics Engineering",
        "Information Technology",
      ],
      alumni: 35000,
      description: "Premier engineering college with focus on emerging technologies and innovation.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["AI & ML programs", "Modern curriculum", "Industry collaborations"],
      type: "Private",
      contact: "04023280312",
      courses: ["B.E", "M.Tech"],
    },
    {
      id: "isl-engineering",
      name: "ISL Engineering College",
      shortName: "ISLEC",
      established: 1997,
      location: "Survey no 130/15, Pallecheruvu, Bandlaguda, Hyderabad",
      departments: [
        "Information Technology",
        "Civil Engineering",
        "AI & Data Science",
        "Mechanical Engineering",
        "Computer Science & Engineering",
        "Electronics & Communication",
      ],
      alumni: 15000,
      description: "Modern engineering college with NAAC A accreditation and practical learning approach.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["NAAC A accredited", "Practical learning", "Modern facilities"],
      type: "Private",
      contact: "04060504555",
      courses: ["B.E", "M.Tech"],
      naacGrade: "A",
    },
    {
      id: "nsakcet",
      name: "Nawab Shah Alam Khan College of Engineering & Technology",
      shortName: "NSAKCET",
      established: 1998,
      location: "16-4-1/A, Malakpet, Hyderabad",
      departments: [
        "AI & Machine Learning",
        "IoT & Cyber Security",
        "Data Sciences",
        "Electronics & Communication",
        "Civil Engineering",
        "Information Technology",
        "Computer Science & Engineering",
        "Mechanical Engineering",
      ],
      alumni: 20000,
      description: "Engineering college with NAAC A accreditation, focusing on cutting-edge technologies.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["NAAC A accredited", "Cutting-edge tech", "Industry ready"],
      type: "Private",
      contact: "7032580275",
      courses: ["B.E", "M.Tech", "MCA", "Diploma"],
      naacGrade: "A",
    },
    {
      id: "ngit",
      name: "Neil Gogte Institute of Technology",
      shortName: "NGIT",
      established: 2001,
      location: "Kachivanisingaram village, Ghatkesar, Medchal Malkajgiri District",
      departments: ["AI & Machine Learning", "Computer Science & Engineering"],
      alumni: 8000,
      description: "Modern engineering institute focusing on AI and computer science technologies.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["AI specialization", "Modern infrastructure", "Tech focus"],
      type: "Private",
      contact: "04029888262",
      courses: ["B.E"],
    },
    {
      id: "kmec",
      name: "Keshav Memorial Engineering College",
      shortName: "KMEC",
      established: 2002,
      location: "D.No.10TC-111, Kachivanisingaram, Ghatkesar, Medchal",
      departments: ["AI & Machine Learning", "Computer Science & Engineering"],
      alumni: 6000,
      description: "Engineering college with focus on artificial intelligence and computer science.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["AI programs", "Computer science focus", "Modern curriculum"],
      type: "Private",
      contact: "9989052226",
      courses: ["B.E"],
    },
    {
      id: "glwec",
      name: "Gokaraju Lailavathi Women's Engineering College",
      shortName: "GLWEC",
      established: 2008,
      location: "Bachupally, Kukatpally, Medchal Dist.",
      departments: ["Information Technology", "Computer Science & Engineering"],
      alumni: 4000,
      description: "Women's engineering college promoting technical education for women.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Women's engineering", "Technical education", "Empowerment"],
      type: "Private",
      contact: "9849078370",
      courses: ["B.E"],
    },
    {
      id: "swathi-institute",
      name: "Swathi Institute of Technology & Science",
      shortName: "SITS",
      established: 2005,
      location: "Kothagudem X Roads, Anajpur, RR Dist",
      departments: ["Computer Science & Engineering"],
      alumni: 5000,
      description: "Institute focusing on technology and science education with modern approach.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Technology focus", "Science education", "Modern approach"],
      type: "Private",
      contact: "9347136392",
      courses: ["M.Tech"],
    },
  ]

  const filteredColleges = affiliatedColleges.filter((college) => {
    if (searchTerm === "") return true

    const searchLower = searchTerm.toLowerCase()
    return (
      college.name.toLowerCase().includes(searchLower) ||
      college.shortName.toLowerCase().includes(searchLower) ||
      college.departments.some((dept) => dept.toLowerCase().includes(searchLower)) ||
      college.description.toLowerCase().includes(searchLower) ||
      college.notable.some((item) => item.toLowerCase().includes(searchLower)) ||
      college.type.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-purple-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/#colleges" className="hover:text-purple-600">
            Colleges
          </Link>
          <span>/</span>
          <span className="text-purple-600 font-medium">Affiliated Colleges</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Affiliated Colleges</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Private and government colleges affiliated to Osmania University, extending quality education across
            Telangana and beyond
          </p>
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">300+</div>
              <div className="text-sm text-gray-600">Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">10,00,000+</div>
              <div className="text-sm text-gray-600">Alumni</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Diverse</div>
              <div className="text-sm text-gray-600">Specializations</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search colleges, departments, type, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setSearchTerm("")}
              >
                ×
              </Button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              Showing {filteredColleges.length} results for "{searchTerm}"
            </p>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              className={`${searchTerm === "" ? "bg-purple-600 text-white hover:bg-purple-700" : "hover:bg-purple-100"}`}
              onClick={() => setSearchTerm("")}
            >
              All Colleges
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${searchTerm === "Private" ? "bg-purple-600 text-white hover:bg-purple-700" : "hover:bg-purple-100"}`}
              onClick={() => setSearchTerm("Private")}
            >
              Private
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`${searchTerm === "Government" ? "bg-purple-600 text-white hover:bg-purple-700" : "hover:bg-purple-100"}`}
              onClick={() => setSearchTerm("Government")}
            >
              Government
            </Button>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={college.image || "/placeholder.svg"}
                  alt={college.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-600 text-white hover:bg-purple-600">{college.shortName}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className={`${
                      college.type === "Private" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {college.type}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    Est. {college.established}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-gray-900 group-hover:text-purple-600 transition-colors">
                  {college.name}
                </CardTitle>
                <p className="text-gray-600 text-sm">{college.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {college.location}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {college.alumni.toLocaleString()} Alumni
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Established {college.established}
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">Departments:</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.departments.slice(0, 3).map((dept, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                    {college.departments.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{college.departments.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">Notable:</h4>
                  <div className="flex flex-wrap gap-1">
                    {college.notable.map((item, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        <Star className="h-2 w-2 mr-1" />
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Link href={`/colleges/affiliated/${college.id}`}>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      View College Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Network Diversity */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Diverse Network of Excellence</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Our affiliated colleges span across various specializations, from engineering and medicine to arts and
              commerce, creating a diverse and vibrant alumni network.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">Engineering Excellence</h4>
                <p className="text-sm text-purple-100">Top engineering colleges with industry partnerships</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">Liberal Arts Heritage</h4>
                <p className="text-sm text-purple-100">
                  Historic institutions fostering creativity and critical thinking
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">Professional Programs</h4>
                <p className="text-sm text-purple-100">Specialized courses for career-ready graduates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
