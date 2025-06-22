"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building2, Users, MapPin, Calendar, Search, GraduationCap } from "lucide-react"
import { useState } from "react"
import Navigation from "@/components/navigation"

export default function ConstituentCollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const constituentColleges = [
    {
      id: "nizam-college",
      name: "Nizam College",
      shortName: "NC",
      established: 1887,
      location: "Basheerbagh, Hyderabad-500001",
      departments: ["Arts", "Science", "Commerce", "Computer Science", "Management"],
      alumni: 85000,
      description:
        "One of the oldest and most prestigious colleges in India, known for its rich heritage and academic excellence.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Historic institution since 1887", "Alumni in civil services", "Cultural heritage"],
      naacGrade: "B+",
      website: "https://www.nizamcollege.ac.in",
    },
    {
      id: "city-college",
      name: "Government City College",
      shortName: "GCC",
      established: 1955,
      location: "High Court Road, Hyderabad",
      departments: ["Arts", "Science", "Commerce", "Computer Applications"],
      alumni: 45000,
      description: "Premier government college offering diverse undergraduate and postgraduate programs.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Strong alumni network", "NAAC A accredited", "Academic excellence"],
      naacGrade: "A",
      website: "https://gdctg.cgg.gov.in",
    },
    {
      id: "pg-college-law",
      name: "P.G. College of Law",
      shortName: "PGCL",
      established: 1974,
      location: "OU Campus, Hyderabad",
      departments: ["Constitutional Law", "Criminal Law", "Corporate Law", "Family Law"],
      alumni: 25000,
      description: "Specialized law college offering postgraduate programs in various legal disciplines.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Legal education excellence", "Practicing lawyers", "Judicial officers"],
      naacGrade: "A",
      website: "https://www.osmania.ac.in",
    },
    {
      id: "college-engineering",
      name: "College of Engineering",
      shortName: "COE",
      established: 1965,
      location: "OU Campus, Hyderabad",
      departments: ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering"],
      alumni: 35000,
      description: "Engineering college with focus on traditional engineering disciplines.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Engineering excellence", "Industry partnerships", "Research focus"],
      naacGrade: "A",
      website: "https://www.osmania.ac.in",
    },
    {
      id: "osmania-medical",
      name: "Osmania Medical College",
      shortName: "OMC",
      established: 1946,
      location: "Koti, Hyderabad",
      departments: ["Medicine", "Surgery", "Pediatrics", "Gynecology", "Orthopedics"],
      alumni: 15000,
      description: "Premier medical college producing skilled doctors and medical professionals.",
      image: "/placeholder.svg?height=200&width=300",
      notable: ["Medical excellence", "Healthcare leaders", "Research contributions"],
      naacGrade: "A+",
      website: "https://www.osmania.ac.in",
    },
  ]

  const filteredColleges = constituentColleges.filter((college) => {
    if (searchTerm === "") return true

    const searchLower = searchTerm.toLowerCase()
    return (
      college.name.toLowerCase().includes(searchLower) ||
      college.shortName.toLowerCase().includes(searchLower) ||
      college.departments.some((dept) => dept.toLowerCase().includes(searchLower)) ||
      college.description.toLowerCase().includes(searchLower) ||
      college.notable.some((item) => item.toLowerCase().includes(searchLower))
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/#colleges" className="hover:text-green-600">
            Colleges
          </Link>
          <span>/</span>
          <span className="text-green-600 font-medium">Constituent Colleges</span>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Constituent Colleges</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Colleges directly administered by Osmania University, maintaining the highest standards of academic
            excellence
          </p>
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">25+</div>
              <div className="text-sm text-gray-600">Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2,05,000+</div>
              <div className="text-sm text-gray-600">Alumni</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Direct</div>
              <div className="text-sm text-gray-600">OU Administration</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search colleges, departments, or keywords..."
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
                  <Badge className="bg-green-600 text-white hover:bg-green-600">{college.shortName}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    Est. {college.established}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-gray-900 group-hover:text-green-600 transition-colors">
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

                <div className="pt-4 border-t border-gray-100">
                  <Link href={`/colleges/constituent/${college.id}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      View College Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
