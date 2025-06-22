import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  Calendar, 
  Heart, 
  MessageCircle, 
  Bell, 
  Menu, 
  Network,
  LayoutDashboard,
  Search,
  LogOut,
  Settings,
  User
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { 
      path: "/directory", 
      label: "Network", 
      icon: Users,
      description: "Find alumni"
    },
    { 
      path: "/events", 
      label: "Events", 
      icon: Calendar,
      description: "Upcoming events"
    },
    { 
      path: "/donate", 
      label: "Donate", 
      icon: Heart,
      description: "Support OU"
    },
    { 
      path: "/chat", 
      label: "Messages", 
      icon: MessageCircle,
      description: "Connect & chat",
      authenticated: true
    }
  ];

  const isActive = (path: string) => location === path;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Branding */}
          <Link href={isAuthenticated ? "/dashboard" : "/"}>
            <div className="flex items-center space-x-4 cursor-pointer">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80" 
                  alt="Osmania University Logo" 
                  className="w-12 h-12 rounded-full shadow-lg border-2 border-heritage-gold object-cover" 
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-ou-amber to-ou-blue rounded-full flex items-center justify-center">
                  <Network className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold ou-gradient-text">OUAlumniHub</h1>
                <p className="text-xs text-gray-600 font-medium">جامعہ عثمانیہ - Alumni Network</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => {
              if (item.authenticated && !isAuthenticated) return null;
              
              return (
                <Link key={item.path} href={item.path}>
                  <div className={`nav-link group ${isActive(item.path) ? 'text-ou-amber' : ''}`}>
                    <item.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Quick Search */}
                <Link href="/directory">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <Search className="w-4 h-4 mr-2" />
                    Find Alumni
                  </Button>
                </Link>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    3
                  </Badge>
                </Button>

                {/* Messages */}
                <Link href="/chat">
                  <Button variant="ghost" size="icon" className="relative">
                    <MessageCircle className="w-5 h-5" />
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-ou-blue text-white text-xs">
                      2
                    </Badge>
                  </Button>
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.profile?.avatar} alt={user?.firstName} />
                        <AvatarFallback className="bg-gradient-to-br from-ou-amber to-ou-blue text-white">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      <p className="text-xs text-muted-foreground">{user?.education?.college}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <Link href="/dashboard">
                      <DropdownMenuItem>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-ou-amber text-ou-amber hover:bg-ou-amber hover:text-white">
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

            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-3 pb-6 border-b">
                    <img 
                      src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40" 
                      alt="OU Logo" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-heritage-gold" 
                    />
                    <div>
                      <div className="font-bold ou-gradient-text">OUAlumniHub</div>
                      <div className="text-xs text-gray-600">Alumni Network</div>
                    </div>
                  </div>

                  {isAuthenticated && user && (
                    <div className="py-6 border-b">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.profile?.avatar} alt={user.firstName} />
                          <AvatarFallback className="bg-gradient-to-br from-ou-amber to-ou-blue text-white">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-gray-600">{user.education?.college}</p>
                          <p className="text-xs text-gray-500">Class of {user.education?.graduationYear}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <nav className="flex-1 py-6">
                    <div className="space-y-2">
                      {isAuthenticated && (
                        <Link href="/dashboard">
                          <div 
                            className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                              isActive('/dashboard') ? 'bg-ou-amber/10 text-ou-amber' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <LayoutDashboard className="w-5 h-5" />
                            <div>
                              <div className="font-medium">Dashboard</div>
                              <div className="text-xs text-gray-500">Your overview</div>
                            </div>
                          </div>
                        </Link>
                      )}

                      {navigationItems.map((item) => {
                        if (item.authenticated && !isAuthenticated) return null;
                        
                        return (
                          <Link key={item.path} href={item.path}>
                            <div 
                              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                                isActive(item.path) ? 'bg-ou-amber/10 text-ou-amber' : 'hover:bg-gray-100'
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <item.icon className="w-5 h-5" />
                              <div>
                                <div className="font-medium">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </nav>

                  {isAuthenticated ? (
                    <div className="border-t pt-4 space-y-2">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <div className="border-t pt-4 space-y-3">
                      <Link href="/login">
                        <Button 
                          variant="outline" 
                          className="w-full border-ou-amber text-ou-amber hover:bg-ou-amber hover:text-white"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button 
                          className="w-full btn-primary"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Join Network
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
