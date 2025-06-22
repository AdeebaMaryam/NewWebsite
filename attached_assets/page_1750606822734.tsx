"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Users, Calendar, CreditCard, Smartphone, Building, Trophy, TrendingUp } from "lucide-react"
import Navigation from "@/components/navigation"

export default function DonatePage() {
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [donationAmount, setDonationAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const campaigns = [
    {
      id: 1,
      title: "OU Engineering Lab Modernization",
      description: "Help us upgrade laboratory equipment and infrastructure for better learning experiences",
      target: 5000000,
      raised: 3250000,
      donors: 245,
      daysLeft: 45,
      category: "Infrastructure",
      college: "University College of Engineering",
    },
    {
      id: 2,
      title: "Student Scholarship Fund",
      description: "Support deserving students with financial assistance for their education",
      target: 2000000,
      raised: 1650000,
      donors: 189,
      daysLeft: 60,
      category: "Education",
      college: "All Colleges",
    },
    {
      id: 3,
      title: "Library Digital Transformation",
      description: "Digitize rare books and create modern study spaces with latest technology",
      target: 1500000,
      raised: 890000,
      donors: 156,
      daysLeft: 30,
      category: "Technology",
      college: "Central Library",
    },
  ]

  const recentDonors = [
    { name: "Adeeba Maryam", amount: 25000, time: "2 hours ago" },
    { name: "Sarah Ahmed", amount: 15000, time: "5 hours ago" },
    { name: "Raj Kumar", amount: 50000, time: "1 day ago" },
    { name: "Priya Krishnan", amount: 10000, time: "2 days ago" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-white mb-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Give Back to Your Alma Mater</h1>
            <p className="text-xl text-red-100 mb-6">
              Your contribution helps build a brighter future for current and future students of Osmania University
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">₹2.5Cr+</div>
                <div className="text-red-100">Total Raised</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1,200+</div>
                <div className="text-red-100">Donors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-red-100">Active Campaigns</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Active Campaigns */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Campaigns</h2>
              <div className="space-y-6">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-semibold">{campaign.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {campaign.category}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{campaign.description}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            {campaign.college}
                          </p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            {formatCurrency(campaign.raised)} raised of {formatCurrency(campaign.target)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {Math.round((campaign.raised / campaign.target) * 100)}%
                          </span>
                        </div>
                        <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {campaign.donors} donors
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {campaign.daysLeft} days left
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={() => setSelectedCampaign(campaign.id.toString())}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Donate Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Donation Form */}
            {selectedCampaign && (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 text-red-600 mr-2" />
                    Make a Donation
                  </CardTitle>
                  <CardDescription>Your contribution makes a difference in students' lives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select Campaign</Label>
                    <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a campaign" />
                      </SelectTrigger>
                      <SelectContent>
                        {campaigns.map((campaign) => (
                          <SelectItem key={campaign.id} value={campaign.id.toString()}>
                            {campaign.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Donation Amount</Label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[1000, 5000, 10000, 25000].map((amount) => (
                        <Button
                          key={amount}
                          variant={donationAmount === amount.toString() ? "default" : "outline"}
                          className={
                            donationAmount === amount.toString()
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }
                          onClick={() => {
                            setDonationAmount(amount.toString())
                            setCustomAmount("")
                          }}
                        >
                          ₹{amount.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                    <Input
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setDonationAmount("")
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={paymentMethod === "upi" ? "default" : "outline"}
                        className={
                          paymentMethod === "upi"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }
                        onClick={() => setPaymentMethod("upi")}
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        UPI
                      </Button>
                      <Button
                        variant={paymentMethod === "card" ? "default" : "outline"}
                        className={
                          paymentMethod === "card"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }
                        onClick={() => setPaymentMethod("card")}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Card
                      </Button>
                      <Button
                        variant={paymentMethod === "netbanking" ? "default" : "outline"}
                        className={
                          paymentMethod === "netbanking"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }
                        onClick={() => setPaymentMethod("netbanking")}
                      >
                        <Building className="h-4 w-4 mr-2" />
                        Net Banking
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea id="message" placeholder="Leave a message of support..." rows={3} />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="anonymous" className="rounded border-gray-300" />
                    <Label htmlFor="anonymous" className="text-sm">
                      Make this donation anonymous
                    </Label>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Tax Benefits</h4>
                    <p className="text-sm text-blue-800">
                      Your donation is eligible for tax deduction under Section 80G. You will receive a tax receipt via
                      email after successful payment.
                    </p>
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Donors */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-600 mr-2" />
                  Recent Donors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentDonors.map((donor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{donor.name}</p>
                      <p className="text-xs text-gray-500">{donor.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{formatCurrency(donor.amount)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Impact Stats */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹75,000</div>
                  <div className="text-sm text-gray-600">Total Donated</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">12</div>
                    <div className="text-xs text-gray-600">Campaigns Supported</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">3</div>
                    <div className="text-xs text-gray-600">Students Helped</div>
                  </div>
                </div>
                <Badge className="w-full justify-center bg-green-100 text-green-800 hover:bg-green-100">
                  Top Contributor 2024
                </Badge>
              </CardContent>
            </Card>

            {/* Quick Donate */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Donate</CardTitle>
                <CardDescription>Make a general contribution to OU</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    ₹1,000
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    ₹5,000
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    ₹10,000
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    ₹25,000
                  </Button>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">Donate Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
