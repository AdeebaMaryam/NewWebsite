"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Crown, Eye, EyeOff, ChevronLeft, ChevronRight, Star, Building2 } from "lucide-react"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    college: "",
    branch: "",
    graduationYear: "",
    currentYear: "",
    rollNumber: "",
    currentPosition: "",
    company: "",
    location: "",
    bio: "",
  })

  const colleges = [
    "University College of Engineering (UCE)",
    "University College of Technology (UCT)",
    "University College of Law (UCL)",
    "University College of Commerce & Business Management (UCC)",
    "University College of Arts & Social Sciences",
    "University College of Science",
    "University College of Pharmaceutical Sciences",
    "Nizam College",
    "City College",
    "P.G. College of Law",
    "College of Engineering",
    "Other OU Affiliated College",
  ]

  const branches = [
    "Computer Science & Engineering",
    "Electronics & Communication Engineering",
    "Electrical & Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Information Technology",
    "Commerce",
    "Business Administration",
    "Law",
    "Arts",
    "Science",
    "Pharmacy",
    "Other",
  ]

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="userType">I am a</Label>
        <Select value={formData.userType} onValueChange={(value) => setFormData({ ...formData, userType: value })}>
          <SelectTrigger className="border-amber-200 focus:border-amber-400">
            <SelectValue placeholder="Select your role in the Osmanian family" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alumni">Proud Osmanian Alumni</SelectItem>
            <SelectItem value="student">Current Osmanian Student</SelectItem>
            <SelectItem value="applicant">Aspiring Osmanian</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            className="border-amber-200 focus:border-amber-400"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            className="border-amber-200 focus:border-amber-400"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          className="border-amber-200 focus:border-amber-400"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+91 9876543210"
          className="border-amber-200 focus:border-amber-400"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="border-amber-200 focus:border-amber-400"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="border-amber-200 focus:border-amber-400"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="college">College/Institution</Label>
        <Select value={formData.college} onValueChange={(value) => setFormData({ ...formData, college: value })}>
          <SelectTrigger className="border-amber-200 focus:border-amber-400">
            <SelectValue placeholder="Select your OU college" />
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

      <div className="space-y-2">
        <Label htmlFor="branch">Branch/Department</Label>
        <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
          <SelectTrigger className="border-amber-200 focus:border-amber-400">
            <SelectValue placeholder="Select your branch/department" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((branch) => (
              <SelectItem key={branch} value={branch}>
                {branch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.userType === "alumni" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="graduationYear">Graduation Year</Label>
            <Select
              value={formData.graduationYear}
              onValueChange={(value) => setFormData({ ...formData, graduationYear: value })}
            >
              <SelectTrigger className="border-amber-200 focus:border-amber-400">
                <SelectValue placeholder="Select graduation year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 50 }, (_, i) => 2024 - i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentPosition">Current Position</Label>
            <Input
              id="currentPosition"
              placeholder="e.g., Software Engineer, Manager, Doctor"
              className="border-amber-200 focus:border-amber-400"
              value={formData.currentPosition}
              onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company/Organization</Label>
            <Input
              id="company"
              placeholder="Your current workplace"
              className="border-amber-200 focus:border-amber-400"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
        </>
      )}

      {formData.userType === "student" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="currentYear">Current Year</Label>
            <Select
              value={formData.currentYear}
              onValueChange={(value) => setFormData({ ...formData, currentYear: value })}
            >
              <SelectTrigger className="border-amber-200 focus:border-amber-400">
                <SelectValue placeholder="Select current year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">4th Year</SelectItem>
                <SelectItem value="5">5th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rollNumber">Roll Number</Label>
            <Input
              id="rollNumber"
              placeholder="Your university roll number"
              className="border-amber-200 focus:border-amber-400"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="location">Current Location</Label>
        <Input
          id="location"
          placeholder="City, State, Country"
          className="border-amber-200 focus:border-amber-400"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bio">Tell us about yourself (Optional)</Label>
        <Textarea
          id="bio"
          placeholder="Share your interests, achievements, aspirations, or what makes you proud to be an Osmanian..."
          className="border-amber-200 focus:border-amber-400"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="terms" className="rounded border-amber-300" required />
          <Label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{" "}
            <Link href="/terms" className="text-amber-600 hover:text-amber-800">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-amber-600 hover:text-amber-800">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="newsletter" className="rounded border-amber-300" />
          <Label htmlFor="newsletter" className="text-sm text-gray-600">
            I want to receive updates about Osmanian events, opportunities, and news
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="mentorship" className="rounded border-amber-300" />
          <Label htmlFor="mentorship" className="text-sm text-gray-600">
            I'm interested in mentoring fellow Osmanians or being mentored
          </Label>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-blue-50 p-4 rounded-lg border border-amber-200">
        <h3 className="font-medium text-amber-900 mb-2 flex items-center">
          <Crown className="h-4 w-4 mr-2" />
          Welcome to the Osmanian Family
        </h3>
        <p className="text-sm text-amber-800">
          After registration, you'll receive an email to verify your account and join the proud legacy of Osmania
          University.
          {formData.userType === "student" &&
            " Student accounts may require additional verification through your college administration."}
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                <Star className="h-2 w-2 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
                OUAlumniHub
              </span>
              <div className="text-xs text-gray-600 font-medium">Join the Osmanian Legacy</div>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Join the Osmanian Family</h1>
          <p className="text-gray-600 mt-2">Become part of a century-old tradition of excellence</p>
        </div>

        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
              Registration - Step {step} of 3
            </CardTitle>
            <CardDescription>
              {step === 1 && "Personal Information"}
              {step === 2 && "Academic & Professional Details"}
              {step === 3 && "Final Details & Preferences"}
            </CardDescription>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-gradient-to-r from-amber-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </CardHeader>

          <CardContent>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-amber-200 text-gray-700 hover:bg-amber-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-amber-600 to-blue-600 hover:from-amber-700 hover:to-blue-700 text-white"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-amber-600 to-blue-600 hover:from-amber-700 hover:to-blue-700 text-white"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Join the Network
                </Button>
              )}
            </div>

            {step === 1 && (
              <>
                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-amber-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button variant="outline" className="border-amber-200 text-gray-700 hover:bg-amber-50">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="border-amber-200 text-gray-700 hover:bg-amber-50">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </>
            )}

            <div className="text-center text-sm text-gray-600 mt-4">
              Already part of the network?{" "}
              <Link href="/login" className="text-amber-600 hover:text-amber-800 font-medium">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* University Heritage Note */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p className="flex items-center justify-center">
            <Building2 className="h-4 w-4 mr-1 text-amber-600" />
            Proudly serving the Deccan since 1918
          </p>
        </div>
      </div>
    </div>
  )
}
