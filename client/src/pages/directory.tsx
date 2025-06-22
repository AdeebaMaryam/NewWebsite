import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { 
  Network, 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Mail, 
  MessageCircle, 
  UserPlus, 
  Users,
  Briefcase,
  GraduationCap
} from "lucide-react";
import Navigation from "@/components/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function DirectoryPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollegeType, setSelectedCollegeType] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Get URL parameters for pre-filtering
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const college = urlParams.get("college");
    const department = urlParams.get("department");
    const collegeType = urlParams.get("collegeType");

    if (college) setSelectedCollege(college);
    if (department) setSelectedDepartment(department);
    if (collegeType) setSelectedCollegeType(collegeType);
  }, []);

  // Fetch search results
  const { data: searchResults, isLoading } = useQuery({
    queryKey: [
      '/api/users/search', 
      { 
        q: searchTerm,
        college: selectedCollege,
        department: selectedDepartment,
        graduationYear: selectedBatch,
        collegeType: selectedCollegeType
      }
    ],
    enabled: searchTerm.length > 0 || selectedCollege !== "" || selectedDepartment !== "" || selectedCollegeType !== ""
  });

  // Fetch colleges for dropdown
  const { data: collegesData } = useQuery({
    queryKey: ['/api/colleges']
  });

  const collegeTypes = [
    "All Types",
    "Campus",
    "Constituent", 
    "Affiliated",
    "Autonomous"
  ];

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
  ];

  const batches = [
    "All Batches",
    "2024", "2023", "2022", "2021", "2020",
    "2019", "2018", "2017", "2016", "2015",
    "2014", "2013", "2012", "2011", "2010"
  ];

  const alumni = searchResults?.users || [];

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCollegeType("");
    setSelectedCollege("");
    setSelectedDepartment("");
    setSelectedBatch("");
    setSelectedLocation("");
  };

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
                      <SelectItem key={type} value={type === "All Types" ? "" : type}>
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
                    <SelectItem value="">All Colleges</SelectItem>
                    {collegesData?.colleges?.map((college: any) => (
                      <SelectItem key={college._id} value={college.name}>
                        {college.name}
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
                      <SelectItem key={dept} value={dept === "All Departments" ? "" : dept}>
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
                    {batches.map((batch) => (
                      <SelectItem key={batch} value={batch === "All Batches" ? "" : batch}>
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
                <span className="text-sm text-gray-600">
                  {isLoading ? "Searching..." : `Showing ${alumni.length} alumni`}
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

        {/* Alumni Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="animate-pulse">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : alumni.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumni.map((person: any) => (
              <Card key={person._id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={person.profile?.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-ou-amber to-ou-blue text-white">
                          {person.firstName?.[0]}{person.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-ou-blue transition-colors">
                          {person.firstName} {person.lastName}
                        </h3>
                        {person.isVerified && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{person.education?.college}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <GraduationCap className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{person.education?.department} • Class of {person.education?.graduationYear}</span>
                    </div>
                    {person.professional?.currentPosition && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {person.professional.currentPosition}
                          {person.professional.currentCompany && ` at ${person.professional.currentCompany}`}
                        </span>
                      </div>
                    )}
                    {person.profile?.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span>{person.profile.location}</span>
                      </div>
                    )}
                  </div>

                  {person.professional?.skills && person.professional.skills.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {person.professional.skills.slice(0, 3).map((skill: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-gray-50">
                            {skill}
                          </Badge>
                        ))}
                        {person.professional.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            +{person.professional.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>12 mutual connections</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-ou-blue hover:bg-ou-navy text-white">
                        <UserPlus className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-12 text-center">
              <Network className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No alumni found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more alumni.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
