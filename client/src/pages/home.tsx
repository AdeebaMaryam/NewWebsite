import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  Heart, 
  Briefcase, 
  Calendar, 
  MessageCircle, 
  Star, 
  Building2, 
  Network, 
  Globe,
  TrendingUp,
  Crown,
  Award
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  // Fetch network statistics
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const collegeTypes = [
    {
      type: "Campus Colleges",
      description: "Premier institutions within the main OU campus",
      count: "15+",
      examples: ["University College of Engineering", "University College of Technology", "University College of Law"],
      color: "from-blue-500 to-blue-600",
      alumni: "75,000+",
      link: "/directory?collegeType=Campus",
    },
    {
      type: "Constituent Colleges",
      description: "Prestigious institutions directly administered by OU",
      count: "25+",
      examples: ["Nizam College", "City College", "Osmania Medical College"],
      color: "from-green-500 to-green-600",
      alumni: "1,50,000+",
      link: "/directory?collegeType=Constituent",
    },
    {
      type: "Affiliated Colleges",
      description: "Extensive network of colleges affiliated to OU",
      count: "300+",
      examples: ["St. Francis College", "Vasavi College", "CBIT"],
      color: "from-purple-500 to-purple-600",
      alumni: "10,00,000+",
      link: "/directory?collegeType=Affiliated",
    },
    {
      type: "Autonomous Colleges",
      description: "Self-governing institutions under OU umbrella",
      count: "50+",
      examples: ["JNTU Hyderabad", "ISB Hyderabad", "IIIT Hyderabad"],
      color: "from-orange-500 to-orange-600",
      alumni: "2,50,000+",
      link: "/directory?collegeType=Autonomous",
    },
  ];

  const testimonials = [
    {
      name: "Satya Nadella",
      position: "CEO, Microsoft",
      college: "UCE '87",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
      quote: "Osmania University gave me the foundation to think globally while staying rooted in our values. The network continues to inspire innovation."
    },
    {
      name: "Dr. Kiran Mazumdar-Shaw",
      position: "Founder, Biocon",
      college: "Science Graduate '73",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
      quote: "The diversity and academic rigor at OU shaped my entrepreneurial mindset. This network is a treasure trove of opportunities."
    },
    {
      name: "Dr. Raghavan Srinivasan",
      position: "Former Director, DRDO",
      college: "Engineering '79",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
      quote: "The technical excellence and research culture at OU prepared me for a career in defense technology. Proud to be an Osmanian."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48"
                alt="Osmania University Logo"
                className="w-12 h-12 rounded-full shadow-lg object-cover"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full flex items-center justify-center">
                <Network className="h-2 w-2 text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold ou-gradient-text">
                OUAlumniHub
              </span>
              <div className="text-xs text-gray-600 font-medium">Osmania University Alumni Network</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/directory" className="nav-link">
              <Users className="w-4 h-4 mr-2" />
              Network
            </Link>
            <Link href="/events" className="nav-link">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </Link>
            <Link href="/donate" className="nav-link">
              <Heart className="w-4 h-4 mr-2" />
              Donate
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button className="btn-primary">
                  <Network className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="btn-primary">
                    Join Network
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden heritage-pattern">
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
              alt="Osmania University Heritage Campus"
              className="w-32 h-32 mx-auto mb-6 rounded-full shadow-2xl border-4 border-white object-cover"
            />
            <Badge className="mb-4 bg-gradient-to-r from-amber-100 to-blue-100 text-amber-800 hover:from-amber-100 hover:to-blue-100 border border-amber-200">
              <Crown className="h-3 w-3 mr-1" />
              Est. 1918 - A Century of Excellence
            </Badge>
          </div>
          
          <h1 className="hero-text mb-6">
            <span className="ou-gradient-text">
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

          {/* Live Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="stats-card">
              <div className="text-3xl font-bold text-ou-blue mb-2">
                {stats?.totalUsers ? `${Math.floor(stats.totalUsers / 100000)}L+` : '15L+'}
              </div>
              <div className="text-gray-600 text-sm">Total Alumni</div>
              <div className="text-green-600 text-xs mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2.3% this month
              </div>
            </div>
            <div className="stats-card">
              <div className="text-3xl font-bold text-ou-amber mb-2">
                {stats?.totalColleges ? `${stats.totalColleges}+` : '390+'}
              </div>
              <div className="text-gray-600 text-sm">Institutions</div>
              <div className="text-blue-600 text-xs mt-1 flex items-center">
                <Building2 className="w-3 h-3 mr-1" />
                4 Categories
              </div>
            </div>
            <div className="stats-card">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats?.activeUsers ? `${Math.floor(stats.activeUsers / 1000)}K+` : '12K+'}
              </div>
              <div className="text-gray-600 text-sm">Active Users</div>
              <div className="text-green-600 text-xs mt-1 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Online Now
              </div>
            </div>
            <div className="stats-card">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600 text-sm">Countries</div>
              <div className="text-purple-600 text-xs mt-1 flex items-center">
                <Globe className="w-3 h-3 mr-1" />
                Global Network
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button className="btn-primary">
                <Network className="h-4 w-4 mr-2" />
                Start Networking
              </Button>
            </Link>
            <Link href="/directory">
              <Button className="btn-secondary">
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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white px-4">
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
                className="border-0 shadow-lg card-hover cursor-pointer"
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

      {/* Alumni Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="ou-gradient-text">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600">Hear from distinguished Osmanians making their mark globally</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg card-hover">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-16 h-16 rounded-full object-cover border-3 border-ou-blue" 
                      />
                      <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.position}</p>
                        <p className="text-gray-500 text-xs">{testimonial.college}</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                  <div className="flex items-center text-heritage-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-ou-maroon via-ou-amber to-ou-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cultural Heritage & Modern Excellence</h2>
            <p className="text-xl text-amber-100">Where tradition meets innovation in the heart of Hyderabad</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Charminar Heritage" 
                className="w-full h-48 object-cover rounded-2xl shadow-2xl mb-6 border-4 border-heritage-gold" 
              />
              <h3 className="text-2xl font-bold mb-3">Rich Heritage</h3>
              <p className="text-amber-100">Founded in 1918, OU embodies the cultural richness of Hyderabad and the Deccan region.</p>
            </div>

            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Modern Hyderabad" 
                className="w-full h-48 object-cover rounded-2xl shadow-2xl mb-6 border-4 border-heritage-gold" 
              />
              <h3 className="text-2xl font-bold mb-3">Global Impact</h3>
              <p className="text-amber-100">Alumni leading technology companies, startups, and institutions worldwide.</p>
            </div>

            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200" 
                alt="Alumni Networking" 
                className="w-full h-48 object-cover rounded-2xl shadow-2xl mb-6 border-4 border-heritage-gold" 
              />
              <h3 className="text-2xl font-bold mb-3">Strong Bonds</h3>
              <p className="text-amber-100">A network built on shared values, mutual support, and the spirit of excellence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" 
                  alt="OU Logo" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-heritage-gold" 
                />
                <div>
                  <div className="text-xl font-bold ou-gradient-text">OUAlumniHub</div>
                  <div className="text-xs text-gray-400">جامعہ عثمانیہ</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connecting over 15 lakh Osmanian alumni worldwide through our comprehensive digital platform.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/directory" className="hover:text-ou-amber transition-colors">Alumni Directory</Link></li>
                <li><Link href="/events" className="hover:text-ou-amber transition-colors">Events Calendar</Link></li>
                <li><Link href="/chat" className="hover:text-ou-amber transition-colors">Networking</Link></li>
                <li><Link href="/donate" className="hover:text-ou-amber transition-colors">Donate</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">College Types</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/directory?collegeType=Campus" className="hover:text-ou-amber transition-colors">Campus Colleges</Link></li>
                <li><Link href="/directory?collegeType=Constituent" className="hover:text-ou-amber transition-colors">Constituent Colleges</Link></li>
                <li><Link href="/directory?collegeType=Affiliated" className="hover:text-ou-amber transition-colors">Affiliated Colleges</Link></li>
                <li><Link href="/directory?collegeType=Autonomous" className="hover:text-ou-amber transition-colors">Autonomous Colleges</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <p className="text-gray-400 text-sm">
                <MessageCircle className="w-4 h-4 inline mr-2" />
                contact@oualumnihub.org
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OUAlumniHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
