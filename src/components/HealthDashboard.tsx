import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Activity, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Calendar,
  Plus,
  Target,
  Users,
  UserPlus,
  Share2
} from "lucide-react";

interface HealthMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
  trend: "up" | "down" | "stable";
}

const healthMetrics: HealthMetric[] = [
  {
    id: "heart-rate",
    title: "Heart Rate",
    value: "72 BPM",
    change: "+2%",
    icon: <Heart className="h-4 w-4" />,
    color: "text-destructive",
    trend: "up"
  },
  {
    id: "steps",
    title: "Daily Steps",
    value: "8,426",
    change: "+15%",
    icon: <Activity className="h-4 w-4" />,
    color: "text-secondary",
    trend: "up"
  },
  {
    id: "sleep",
    title: "Sleep Quality",
    value: "7.2h",
    change: "-5%",
    icon: <Clock className="h-4 w-4" />,
    color: "text-primary",
    trend: "down"
  },
  {
    id: "health-score",
    title: "Health Score",
    value: "85/100",
    change: "+3%",
    icon: <Target className="h-4 w-4" />,
    color: "text-secondary",
    trend: "up"
  }
];

export const HealthDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {healthMetrics.map((metric, index) => (
          <Card key={metric.id} className="health-card hover-lift group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {metric.title}
              </CardTitle>
              <div className={`${metric.color} group-hover:animate-bounce-subtle transition-transform`}>
                {metric.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2 group-hover:scale-105 transition-transform">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className={`h-3 w-3 mr-1 transition-transform group-hover:scale-110 ${
                  metric.trend === 'up' ? 'text-secondary' : 
                  metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                }`} />
                <span className={
                  metric.trend === 'up' ? 'text-secondary' : 
                  metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                }>
                  {metric.change} from last week
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {/* Quick Actions */}
        <Card className="health-card hover-lift group animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
              <Plus className="h-5 w-5 text-primary group-hover:animate-rotate transition-transform" />
              Quick Log
            </CardTitle>
            <CardDescription>
              Record symptoms or activities quickly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start hover-lift group/btn">
              <AlertCircle className="h-4 w-4 mr-2 text-destructive group-hover/btn:animate-bounce-subtle" />
              Log Symptom
            </Button>
            <Button variant="outline" className="w-full justify-start hover-lift group/btn">
              <Activity className="h-4 w-4 mr-2 text-secondary group-hover/btn:animate-bounce-subtle" />
              Track Activity
            </Button>
            <Button variant="outline" className="w-full justify-start hover-lift group/btn">
              <Heart className="h-4 w-4 mr-2 text-primary group-hover/btn:animate-bounce-subtle" />
              Record Vitals
            </Button>
          </CardContent>
        </Card>

        {/* Today's Goals */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-secondary" />
              Today's Goals
            </CardTitle>
            <CardDescription>
              Track your daily health objectives
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Water Intake</span>
                <span className="text-muted-foreground">6/8 glasses</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Exercise Time</span>
                <span className="text-muted-foreground">25/30 min</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Medication</span>
                <span className="text-muted-foreground">2/3 taken</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Family & Friends */}
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Family & Friends
            </CardTitle>
            <CardDescription>
              Connect and share your health journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <UserPlus className="h-4 w-4 mr-2 text-secondary" />
              Add a Friend
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Share2 className="h-4 w-4 mr-2 text-primary" />
              Share with Family
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              Manage Connections
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Health Alerts */}
      <Card className="health-card border-l-4 border-l-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Health Alerts & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg">
            <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Medication Reminder</p>
              <p className="text-xs text-muted-foreground">
                Don't forget to take your evening medication at 8:00 PM
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
            <Heart className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Heart Rate Alert</p>
              <p className="text-xs text-muted-foreground">
                Your resting heart rate is slightly elevated. Consider relaxation techniques.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};