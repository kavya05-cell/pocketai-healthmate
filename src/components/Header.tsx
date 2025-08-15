import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import healthIcon from "@/assets/health-icon.png";
import { useNotifications } from "@/hooks/useNotifications";

export const Header = () => {
  const { unreadCount } = useNotifications();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img src={healthIcon} alt="PocketAI HealthMate" className="h-6 w-6 sm:h-8 sm:w-8" />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-foreground">PocketAI HealthMate</h1>
              <p className="text-xs text-muted-foreground">Your Personal Health Assistant</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-foreground">HealthMate</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
                Sign Up
              </Button>
            </Link>
          </div>

          <div className="hidden sm:flex items-center space-x-1 sm:space-x-2">{/* Will be shown when logged in */}
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-destructive text-[10px] sm:text-xs flex items-center justify-center text-white font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};