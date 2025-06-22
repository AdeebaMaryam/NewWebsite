import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Plus, 
  Users, 
  Calendar, 
  Heart, 
  MessageCircle, 
  Briefcase, 
  Search,
  UserPlus,
  Zap
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Create Post",
      description: "Share an update with the community",
      icon: Plus,
      color: "bg-blue-600 hover:bg-blue-700",
      href: "#",
      action: () => {
        // Open create post modal
        console.log("Create post");
      }
    },
    {
      title: "Find Alumni",
      description: "Connect with fellow Osmanians",
      icon: Search,
      color: "bg-green-600 hover:bg-green-700",
      href: "/directory"
    },
    {
      title: "Create Event",
      description: "Organize a meetup or reunion",
      icon: Calendar,
      color: "bg-purple-600 hover:bg-purple-700",
      href: "#",
      action: () => {
        // Open create event modal
        console.log("Create event");
      }
    },
    {
      title: "Post Job",
      description: "Share career opportunities",
      icon: Briefcase,
      color: "bg-orange-600 hover:bg-orange-700",
      href: "#",
      action: () => {
        // Open post job modal
        console.log("Post job");
      }
    },
    {
      title: "Send Message",
      description: "Start a conversation",
      icon: MessageCircle,
      color: "bg-indigo-600 hover:bg-indigo-700",
      href: "/chat"
    },
    {
      title: "Make Donation",
      description: "Support your alma mater",
      icon: Heart,
      color: "bg-red-600 hover:bg-red-700",
      href: "/donate"
    }
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="h-5 w-5 text-amber-600 mr-2" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            action.href !== "#" ? (
              <Link key={index} href={action.href}>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all group"
                >
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-gray-500 line-clamp-2">{action.description}</div>
                  </div>
                </Button>
              </Link>
            ) : (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-all group"
                onClick={action.action}
              >
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-gray-500 line-clamp-2">{action.description}</div>
                </div>
              </Button>
            )
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Connect and grow your network</p>
            <div className="flex items-center justify-center space-x-2">
              <UserPlus className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">+5 new connections this week</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
