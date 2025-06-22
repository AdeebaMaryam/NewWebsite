"use client"

import Navigation from "@/components/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, GraduationCap, MapPin, TrendingUp } from "lucide-react"

export default function CollegesPage() {
  const collegeTypes = [
    {
      type: "Campus Colleges",
      description: "Colleges within the main OU campus",
      count: "15+",
      examples: ["University College of Engineering", "University College of Technology", "University College of Law"],
      color: "from-blue-500 to-blue-600",
      alumni: "1,88,000+",
      link: "/colleges/campus",
      features: ["Historic campus", "Central location", "Research facilities"],
    },
    {
      type: "Constituent Colleges",
      description: "Colleges directly administered by OU",
      count: "25+",
      examples: ["Nizam College", "City College", "P.G. College of Law"],
      color: "from-green-500 to-green-600",
      alumni: "2,05,000+",
      link: "/colleges/constituent",
      features: ["Direct OU administration", "Academic excellence", "Heritage institutions"],
    },
    {
      type: "Affiliated Colleges",
      description: "Private and government colleges affiliated to OU",
      count: "300+",
      examples: ["St. Francis College", "Vasavi College", "CBIT"],
      color: "from-purple-500 to-purple-600",
      alumni: "10,00,000+",
      link: "/colleges/affiliated",
      features: ["Diverse specializations", "Wide network", "Industry partnerships"],
    },
    {
      type: "Autonomous Colleges",
      description: "Self-governing colleges under OU umbrella",
      count: "50+",
      examples: ["JNTU Hyderabad", "ISB Hyderabad", "IIIT Hyderabad"],
      color: "from-orange-500 to-orange-600",
      alumni: "5,62,000+",
      link: "/colleges/autonomous",
      features: ["Academic freedom", "Innovation focus", "Global standards"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
              Osmania University
            </span>
            <br />
            <span className="text-gray-700">College Network</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Explore the comprehensive education ecosystem of Osmania University spanning across four categories of
            excellence
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">390+</div>
              <div className="text-sm text-gray-600">Total Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">19.55L+</div>
              <div className="text-sm text-gray-600">Total Alumni</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">106</div>
              <div className="text-sm text-gray-600">Years Legacy</div>
            </div>
          </div>
        </div>

        {/* College Categories */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {collegeTypes.map((category, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">{category.count}</div>
                    <div className="text-sm text-gray-600">Institutions</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.type}
                </h3>
                <p className="text-gray-600 mb-6">{category.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-sm text-gray-800 mb-3">Key Features:</h4>
                  <div className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-sm text-gray-800 mb-3">Notable Institutions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span className="text-lg font-bold text-gray-700">{category.alumni}</span>
                    <span className="text-sm text-gray-500">Alumni</span>
                  </div>
                  <Link href={category.link}>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Explore Colleges
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Network at a Glance</h3>
            <p className="text-blue-100 text-lg">The largest university network in South India with global reach</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold">390+</div>
              <div className="text-blue-100">Total Institutions</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold">19.55L+</div>
              <div className="text-blue-100">Alumni Worldwide</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-blue-100">Countries</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl font-bold">106</div>
              <div className="text-blue-100">Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Connect with Your College Network?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Find alumni from your college, join college-specific groups, and contribute to your alma mater's growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/directory">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                <Users className="h-4 w-4 mr-2" />
                Find Alumni
              </Button>
            </Link>
            <Link href="/chat">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
                <Building2 className="h-4 w-4 mr-2" />
                Join College Groups
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
