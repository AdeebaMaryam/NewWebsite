import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricsWidgetProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'amber' | 'red';
  trend?: string;
  onClick?: () => void;
}

export default function MetricsWidget({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  trend,
  onClick 
}: MetricsWidgetProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      light: 'bg-blue-50',
      text: 'text-blue-600',
      hover: 'hover:bg-blue-100'
    },
    green: {
      bg: 'bg-green-500',
      light: 'bg-green-50',
      text: 'text-green-600',
      hover: 'hover:bg-green-100'
    },
    purple: {
      bg: 'bg-purple-500',
      light: 'bg-purple-50',
      text: 'text-purple-600',
      hover: 'hover:bg-purple-100'
    },
    amber: {
      bg: 'bg-amber-500',
      light: 'bg-amber-50',
      text: 'text-amber-600',
      hover: 'hover:bg-amber-100'
    },
    red: {
      bg: 'bg-red-500',
      light: 'bg-red-50',
      text: 'text-red-600',
      hover: 'hover:bg-red-100'
    }
  };

  const colors = colorClasses[color];

  return (
    <Card 
      className={`border-0 shadow-sm transition-all duration-300 card-hover ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
            {trend && (
              <p className={`text-sm ${colors.text} font-medium`}>
                {trend}
              </p>
            )}
          </div>
          <div className={`w-12 h-12 ${colors.light} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
