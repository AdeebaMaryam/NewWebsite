import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Network, 
  GraduationCap, 
  Building2,
  Calendar,
  Phone,
  MapPin
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [, setLocation] = useLocation();
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    // Contact Information
    phone: "",
    location: "",
    // Education Information
    college: "",
    collegeType: "",
    department: "",
    degree: "",
    graduationYear: "",
    rollNumber: "",
    // Professional Information (optional)
    currentPosition: "",
    currentCompany: "",
    industry: "",
    experience: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Fetch colleges for dropdown
  const { data: collegesData } = useQuery({
    queryKey: ['/api/colleges']
  });

  const collegeTypes = ["Campus", "Constituent", "Affiliated", "Autonomous"];
  
  const departments = [
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
    "Other"
  ];

  const degrees = [
    "B.Tech", "B.E.", "B.Sc", "B.Com", "B.A.", "BBA", "BCA",
    "M.Tech", "M.E.", "M.Sc", "M.Com", "M.A.", "MBA", "MCA",
    "Ph.D", "LLB", "LLM", "MBBS", "MD", "MS", "Other"
  ];

  const industries = [
    "Technology", "Healthcare", "Finance", "Education", "Manufacturing",
    "Consulting", "Government", "Non-Profit", "Retail", "Media",
    "Real Estate", "Transportation", "Energy", "Agriculture", "Other"
  ];

  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 50 }, (_, i) => currentYear - i + 4);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!formData.graduationYear) {
      setError("Please select your graduation year");
      return;
    }

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        profile: {
          phone: formData.phone,
          location: formData.location,
        },
        education: {
          college: formData.college,
          collegeType: formData.collegeType,
          department: formData.department,
          degree: formData.degree,
          graduationYear: parseInt(formData.graduationYear),
          rollNumber: formData.rollNumber,
        },
        professional: formData.currentPosition ? {
          currentPosition: formData.currentPosition,
          currentCompany: formData.currentCompany,
          industry: formData.industry,
          experience: formData.experience ? parseInt(formData.experience) : 0,
          skills: [],
          achievements: [],
        } : undefined,
      };

      await register(userData);
      toast({
        title: "Welcome to OUAlumniHub!",
        description: "Your account has been created successfully.",
      });
      setLocation("/dashboard");
    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && 
               formData.password && formData.confirmPassword && formData.username;
      case 2:
        return formData.college && formData.collegeType && formData.department && 
               formData.degree && formData.graduationYear;
      case 3:
        return true; // Optional step
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="flex items-center justify-center space-x-3 mb-6 cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60" 
                alt="Osmania University Logo" 
                className="w-15 h-15 rounded-full shadow-lg border-2 border-heritage-gold object-cover" 
              />
              <div>
                <h1 className="text-2xl font-bold ou-gradient-text">OUAlumniHub</h1>
                <p className="text-sm text-gray-600">Alumni Network</p>
              </div>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join the Network</h2>
          <p className="text-gray-600">Connect with 15+ Lakh Osmanians worldwide</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-ou-blue text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNumber ? 'bg-ou-blue' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-500">
              Step {step} of 3: {
                step === 1 ? "Personal Information" :
                step === 2 ? "Education Details" :
                "Professional Information"
              }
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Network className="h-5 w-5 text-blue-600 mr-2" />
              {step === 1 ? "Personal Information" :
               step === 2 ? "Education Details" :
               "Professional Information"}
            </CardTitle>
            <CardDescription>
              {step === 1 ? "Tell us about yourself" :
               step === 2 ? "Your educational background" :
               "Your professional experience (optional)"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="username"
                        name="username"
                        placeholder="Choose a unique username"
                        value={formData.username}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location (Optional)</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          name="location"
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Education Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>College Type</Label>
                      <Select value={formData.collegeType} onValueChange={(value) => handleSelectChange("collegeType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select college type" />
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
                    <div className="space-y-2">
                      <Label>College</Label>
                      <Select value={formData.college} onValueChange={(value) => handleSelectChange("college", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your college" />
                        </SelectTrigger>
                        <SelectContent>
                          {collegesData?.colleges?.map((college: any) => (
                            <SelectItem key={college._id} value={college.name}>
                              {college.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Select value={formData.department} onValueChange={(value) => handleSelectChange("department", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
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
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Select value={formData.degree} onValueChange={(value) => handleSelectChange("degree", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                        <SelectContent>
                          {degrees.map((degree) => (
                            <SelectItem key={degree} value={degree}>
                              {degree}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Graduation Year</Label>
                      <Select value={formData.graduationYear} onValueChange={(value) => handleSelectChange("graduationYear", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {graduationYears.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number (Optional)</Label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="rollNumber"
                          name="rollNumber"
                          placeholder="Enter roll number"
                          value={formData.rollNumber}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Professional Information (Optional) */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPosition">Current Position</Label>
                      <Input
                        id="currentPosition"
                        name="currentPosition"
                        placeholder="e.g., Software Engineer"
                        value={formData.currentPosition}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentCompany">Current Company</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="currentCompany"
                          name="currentCompany"
                          placeholder="Company name"
                          value={formData.currentCompany}
                          onChange={handleChange}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        placeholder="e.g., 3"
                        value={formData.experience}
                        onChange={handleChange}
                        min="0"
                        max="50"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Optional Information</h4>
                    <p className="text-sm text-blue-800">
                      Professional information helps other alumni find and connect with you based on your career path.
                      You can skip this step and complete your profile later.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center space-x-2">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {step < 3 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
                      disabled={!isStepValid()}
                      className="btn-primary"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  )}
                </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login">
                  <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                    Sign in here
                  </Button>
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By creating an account, you agree to our{" "}
            <Link href="/terms">
              <Button variant="link" className="p-0 h-auto text-xs text-gray-600 hover:text-gray-700">
                Terms of Service
              </Button>
            </Link>{" "}
            and{" "}
            <Link href="/privacy">
              <Button variant="link" className="p-0 h-auto text-xs text-gray-600 hover:text-gray-700">
                Privacy Policy
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
