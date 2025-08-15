import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Settings, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import healthIcon from "@/assets/health-icon.png";
import { useNotifications } from "@/hooks/useNotifications";

export const Header = () => {
  const { unreadCount } = useNotifications();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img src={healthIcon} alt="PocketAI HealthMate" className="h-5 w-5 xs:h-6 xs:w-6 sm:h-8 sm:w-8" />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-foreground">PocketAI HealthMate</h1>
              <p className="text-xs text-muted-foreground">Your Personal Health Assistant</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-xs xs:text-sm font-bold text-foreground">HealthMate</h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline" size="sm" className="text-sm px-4">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="text-sm px-4">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Desktop User Actions (when logged in) */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-xs flex items-center justify-center text-white font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 xs:h-9 xs:w-9 transition-colors">
                  {isMenuOpen ? (
                    <X className="h-4 w-4 xs:h-5 xs:w-5" />
                  ) : (
                    <Menu className="h-4 w-4 xs:h-5 xs:w-5" />
                  )}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="flex items-center space-x-2 pb-4 border-b border-border">
                    <img src={healthIcon} alt="PocketAI HealthMate" className="h-8 w-8" />
                    <div>
                      <h2 className="font-bold text-foreground">PocketAI HealthMate</h2>
                      <p className="text-xs text-muted-foreground">Your Personal Health Assistant</p>
                    </div>
                  </div>
                  
                  {/* Auth Links */}
                  <div className="space-y-3">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full justify-start">
                        Sign Up
                      </Button>
                    </Link>
                  </div>

                  {/* User Actions (when logged in) */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <Link to="/notifications" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start relative">
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                        {unreadCount > 0 && (
                          <span className="ml-auto h-5 w-5 rounded-full bg-destructive text-xs flex items-center justify-center text-white font-medium">
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </span>
                        )}
                      </Button>
                    </Link>
                    <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </Link>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};