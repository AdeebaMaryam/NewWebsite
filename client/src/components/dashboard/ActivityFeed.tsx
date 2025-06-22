import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Users, 
  Calendar, 
  Briefcase, 
  TrendingUp,
  UserPlus,
  Building2
} from "lucide-react";
import { formatMongoDate } from "@/lib/mongodb";

interface ActivityFeedProps {
  activities: any[];
  posts: any[];
}

export default function ActivityFeed({ activities, posts }: ActivityFeedProps) {
  const allActivities = [
    ...activities.map((activity: any) => ({
      ...activity,
      type: 'activity'
    })),
    ...posts.map((post: any) => ({
      ...post,
      type: 'post'
    }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'connection':
        return <UserPlus className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'post':
        return <MessageCircle className="w-4 h-4" />;
      case 'job':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'connection':
        return 'bg-blue-500';
      case 'event':
        return 'bg-green-500';
      case 'post':
        return 'bg-purple-500';
      case 'job':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (allActivities.length === 0) {
    return (
      <div className="text-center py-12">
        <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent activity</h3>
        <p className="text-gray-600 mb-4">
          Connect with alumni and engage with the community to see updates here.
        </p>
        <Button variant="outline" size="sm">
          <Users className="w-4 h-4 mr-2" />
          Find Alumni
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin">
      {allActivities.slice(0, 10).map((item: any, index: number) => (
        <div key={`${item.type}-${item._id || index}`} className="flex items-start space-x-3">
          {/* Activity Icon */}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getActivityColor(item.type || 'default')}`}>
            {getActivityIcon(item.type || 'default')}
          </div>

          {/* Activity Content */}
          <div className="flex-1 min-w-0">
            {item.type === 'post' ? (
              // Post Activity
              <Card className="border border-gray-100 hover:border-gray-200 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.author?.profile?.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-ou-amber to-ou-blue text-white text-xs">
                        {item.author?.firstName?.[0]}{item.author?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-sm">
                          {item.author?.firstName} {item.author?.lastName}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {item.postType || 'Post'}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatMongoDate(item.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                        {item.content}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                          <Heart className="w-3 h-3" />
                          <span>{item.engagement?.likes?.length || 0}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                          <MessageCircle className="w-3 h-3" />
                          <span>{item.engagement?.comments?.length || 0}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-600 transition-colors">
                          <Share className="w-3 h-3" />
                          <span>{item.engagement?.shares?.length || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Other Activities
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {item.title || 'Alumni Activity'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatMongoDate(item.createdAt || item.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description || item.content || 'Recent activity in the network'}
                </p>
                {item.college && (
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Building2 className="w-3 h-3 mr-1" />
                    {item.college}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Load More */}
      {allActivities.length > 10 && (
        <div className="text-center pt-4">
          <Button variant="outline" size="sm">
            Load More Activities
          </Button>
        </div>
      )}
    </div>
  );
}
