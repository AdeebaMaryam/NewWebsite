import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Briefcase, Calendar, MessageCircle, Star, Building2, Network, Globe } from "lucide-react"

export default function HomePage() {
  const collegeTypes = [
    {
      type: "Campus Colleges",
      description: "Colleges within the main OU campus",
      count: "15+",
      examples: ["University College of Engineering", "University College of Technology", "University College of Law"],
      color: "from-blue-500 to-blue-600",
      alumni: "75,000+",
      link: "/colleges/campus",
    },
    {
      type: "Constituent Colleges",
      description: "Colleges directly administered by OU",
      count: "25+",
      examples: ["Nizam College", "City College", "P.G. College of Law"],
      color: "from-green-500 to-green-600",
      alumni: "1,50,000+",
      link: "/colleges/constituent",
    },
    {
      type: "Affiliated Colleges",
      description: "Private and government colleges affiliated to OU",
      count: "300+",
      examples: ["St. Francis College", "Vasavi College", "CBIT"],
      color: "from-purple-500 to-purple-600",
      alumni: "10,00,000+",
      link: "/colleges/affiliated",
    },
    {
      type: "Autonomous Colleges",
      description: "Self-governing colleges under OU umbrella",
      count: "50+",
      examples: ["JNTU Hyderabad", "ISB Hyderabad", "IIIT Hyderabad"],
      color: "from-orange-500 to-orange-600",
      alumni: "2,50,000+",
      link: "/colleges/autonomous",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src="/images/ou-logo.png"
                alt="Osmania University Logo"
                width={48}
                height={48}
                className="rounded-full shadow-lg"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full flex items-center justify-center">
                <Network className="h-2 w-2 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
                OUAlumniHub
              </span>
              <div className="text-xs text-gray-600 font-medium">Osmania University Alumni Network</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#network" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">
              Network
            </Link>
            <Link href="#colleges" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">
              Colleges
            </Link>
            <Link href="#connect" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">
              Connect
            </Link>
            <Link href="#events" className="text-gray-600 hover:text-amber-600 transition-colors font-medium">
              Events
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Link href="/login">
              <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-amber-600 to-blue-600 hover:from-amber-700 hover:to-blue-700 text-white shadow-lg">
                Join Network
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-blue-100/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8">
            <Image
              src="/images/ou-logo.png"
              alt="Osmania University"
              width={120}
              height={120}
              className="mx-auto mb-6 rounded-full shadow-2xl border-4 border-white"
            />
            <Badge className="mb-4 bg-gradient-to-r from-amber-100 to-blue-100 text-amber-800 hover:from-amber-100 hover:to-blue-100 border border-amber-200">
              <Star className="h-3 w-3 mr-1" />
              Est. 1918 - A Century of Excellence
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
              Osmania University
            </span>
            <br />
            <span className="text-gray-700">Alumni Network</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Connect with over <strong>15 Lakh alumni</strong> from Campus Colleges, Constituent Colleges, Affiliated
            Colleges, and Autonomous Colleges. Build meaningful professional relationships, mentor students, and
            strengthen the Osmanian legacy worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-blue-600 hover:from-amber-700 hover:to-blue-700 text-white shadow-lg px-8"
              >
                <Network className="h-4 w-4 mr-2" />
                Start Networking
              </Button>
            </Link>
            <Link href="/directory">
              <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8">
                <Users className="h-4 w-4 mr-2" />
                Find Alumni
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Largest Alumni Network in South India</h2>
            <p className="text-amber-100 text-lg">Connecting Osmanians across 4 college categories worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold mb-2">15L+</div>
              <div className="text-amber-100">Total Alumni</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold mb-2">390+</div>
              <div className="text-amber-100">Total Colleges</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-amber-100">Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl md:text-4xl font-bold mb-2">25+</div>
              <div className="text-amber-100">Districts</div>
            </div>
          </div>
        </div>
      </section>

      {/* College Categories */}
      <section id="colleges" className="py-20 bg-gradient-to-b from-gray-50 to-white px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Four Categories of Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Osmania University's comprehensive education ecosystem spanning across Telangana and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {collegeTypes.map((category, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{category.count}</div>
                      <div className="text-sm text-gray-600">Colleges</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.type}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">Notable Institutions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.examples.map((example, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{category.alumni} Alumni</span>
                    </div>
                    <Link href={category.link}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      >
                        Explore Colleges
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Networking Features */}
      <section id="network" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-amber-600 to-blue-600 bg-clip-text text-transparent">
                Network Like Never Before
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional networking platform designed specifically for the Osmanian community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">Smart Alumni Discovery</CardTitle>
                <CardDescription>
                  Find alumni by college, batch, industry, location, or skills. Advanced filters help you connect with
                  the right people.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">Professional Messaging</CardTitle>
                <CardDescription>
                  Direct messaging, group chats, and college-specific forums. Build meaningful professional
                  relationships.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">Career Opportunities</CardTitle>
                <CardDescription>
                  Job postings, referrals, and career guidance from senior alumni. Exclusive opportunities for
                  Osmanians.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-red-800">Mentorship Programs</CardTitle>
                <CardDescription>
                  Connect experienced alumni with students and recent graduates. Structured mentorship for career
                  growth.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-yellow-800">Events & Meetups</CardTitle>
                <CardDescription>
                  College reunions, professional meetups, and networking events. Stay connected with your batch and
                  college.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-indigo-800">Global Chapters</CardTitle>
                <CardDescription>
                  Connect with Osmanian communities worldwide. City-wise and country-wise alumni chapters.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="connect" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Expand Your Professional Network?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 15+ Lakh Osmanians worldwide. Your next career opportunity is just one connection away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 shadow-lg">
                <Network className="h-4 w-4 mr-2" />
                Join the Network
              </Button>
            </Link>
            <Link href="/directory">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8"
              >
                <Users className="h-4 w-4 mr-2" />
                Browse Alumni
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/images/ou-logo.png"
                  alt="Osmania University"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <span className="text-xl font-bold">OUAlumniHub</span>
                  <div className="text-xs text-gray-400">Professional Network</div>
                </div>
              </div>
              <p className="text-gray-400">
                Connecting 15+ Lakh Osmanians worldwide through professional networking and career opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Network</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/directory" className="hover:text-amber-400 transition-colors">
                    Alumni Directory
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-amber-400 transition-colors">
                    Job Board
                  </Link>
                </li>
                <li>
                  <Link href="/mentorship" className="hover:text-amber-400 transition-colors">
                    Mentorship
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Colleges</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/colleges/campus" className="hover:text-amber-400 transition-colors">
                    Campus Colleges
                  </Link>
                </li>
                <li>
                  <Link href="/colleges/constituent" className="hover:text-amber-400 transition-colors">
                    Constituent Colleges
                  </Link>
                </li>
                <li>
                  <Link href="/colleges/affiliated" className="hover:text-amber-400 transition-colors">
                    Affiliated Colleges
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">University</h3>
              <p className="text-gray-400 mb-2">Osmania University</p>
              <p className="text-gray-400 mb-2">University Road, Hyderabad</p>
              <p className="text-gray-400 mb-2">Telangana - 500007, India</p>
              <p className="text-gray-400">Est. 1918</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OUAlumniHub. All rights reserved. | Connecting Osmanians worldwide since 1918.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
