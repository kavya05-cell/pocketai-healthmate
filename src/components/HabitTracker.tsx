import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Circle, 
  Target, 
  Flame,
  Calendar,
  Plus,
  Droplets,
  Moon,
  Dumbbell,
  Pill
} from "lucide-react";

interface Habit {
  id: string;
  name: string;
  icon: React.ReactNode;
  target: number;
  current: number;
  unit: string;
  streak: number;
  color: string;
  completed: boolean;
}

const habits: Habit[] = [
  {
    id: "water",
    name: "Water Intake",
    icon: <Droplets className="h-4 w-4" />,
    target: 8,
    current: 6,
    unit: "glasses",
    streak: 7,
    color: "text-blue-500",
    completed: false
  },
  {
    id: "exercise",
    name: "Exercise",
    icon: <Dumbbell className="h-4 w-4" />,
    target: 30,
    current: 25,
    unit: "minutes",
    streak: 4,
    color: "text-secondary",
    completed: false
  },
  {
    id: "sleep",
    name: "Sleep",
    icon: <Moon className="h-4 w-4" />,
    target: 8,
    current: 7.5,
    unit: "hours",
    streak: 12,
    color: "text-purple-500",
    completed: true
  },
  {
    id: "medication",
    name: "Medication",
    icon: <Pill className="h-4 w-4" />,
    target: 3,
    current: 2,
    unit: "doses",
    streak: 15,
    color: "text-primary",
    completed: false
  }
];

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const HabitTracker = () => {
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const toggleHabitCompletion = (habitId: string) => {
    // This would typically update the habit status in your state management
    console.log("Toggle habit:", habitId);
  };

  return (
    <div className="space-y-6">
      {/* Today's Habits Overview */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-secondary" />
            Today's Habits
          </CardTitle>
          <CardDescription>
            Track your daily health habits and build consistency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`p-4 border rounded-lg transition-all cursor-pointer ${
                selectedHabit === habit.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/30'
              }`}
              onClick={() => setSelectedHabit(selectedHabit === habit.id ? null : habit.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={habit.color}>
                    {habit.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{habit.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {habit.current}/{habit.target} {habit.unit}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    {habit.streak} days
                  </Badge>
                  <Button
                    variant={habit.completed ? "success" : "outline"}
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleHabitCompletion(habit.id);
                    }}
                  >
                    {habit.completed ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="text-muted-foreground">
                    {Math.round(getProgressPercentage(habit.current, habit.target))}%
                  </span>
                </div>
                <Progress 
                  value={getProgressPercentage(habit.current, habit.target)} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Weekly Progress
          </CardTitle>
          <CardDescription>
            See your habit consistency over the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {habits.map((habit) => (
              <div key={habit.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={habit.color}>
                    {habit.icon}
                  </div>
                  <span className="font-medium">{habit.name}</span>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((day, index) => {
                    // Mock data for demonstration
                    const completed = Math.random() > 0.3;
                    return (
                      <div key={day} className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">{day}</div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          completed 
                            ? 'bg-secondary border-secondary text-white' 
                            : 'border-border'
                        }`}>
                          {completed && <CheckCircle2 className="h-4 w-4" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add New Habit */}
      <Card className="health-card border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Plus className="h-8 w-8 text-muted-foreground mb-3" />
          <h3 className="font-medium mb-2">Add New Habit</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Start tracking a new healthy habit to improve your wellness
          </p>
          <Button variant="outline">
            Create New Habit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};