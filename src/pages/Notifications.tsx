import { useState } from "react";
import { ArrowLeft, Bell, CheckCircle, AlertTriangle, Heart, Clock, Users, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { useNotifications, type Notification } from "@/hooks/useNotifications";

const Notifications = () => {
  const { notifications, unreadCount, markAsRead, deleteNotification, markAllAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState("all");

  const getIcon = (type: string, priority: string) => {
    switch (type) {
      case "medication":
        return <Clock className={`h-4 w-4 ${priority === 'high' ? 'text-destructive' : 'text-primary'}`} />;
      case "health":
        return <Heart className={`h-4 w-4 ${priority === 'high' ? 'text-destructive' : 'text-secondary'}`} />;
      case "family":
        return <Users className="h-4 w-4 text-primary" />;
      case "reminder":
        return <Bell className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };


  const filterNotifications = (notifications: Notification[]) => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(notif => !notif.read);
      case "health":
        return notifications.filter(notif => notif.type === "health" || notif.type === "medication");
      case "family":
        return notifications.filter(notif => notif.type === "family");
      default:
        return notifications;
    }
  };

  const filteredNotifications = filterNotifications(notifications);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Notifications</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead} size="sm" className="w-full sm:w-auto">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
            <TabsTrigger value="all" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm">
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm">
              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="flex items-center gap-1">
                Unread {unreadCount > 0 && <Badge variant="destructive" className="text-[10px] px-1 py-0">{unreadCount}</Badge>}
              </span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
              Health
            </TabsTrigger>
            <TabsTrigger value="family" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              Family
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-3 sm:space-y-4">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <Card key={notification.id} className={`transition-all ${
                  !notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
                }`}>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-2 sm:gap-4">
                      <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0 mt-1">
                          {getIcon(notification.type, notification.priority)}
                        </div>
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <h3 className={`font-medium text-sm sm:text-base truncate ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h3>
                            <Badge variant={getPriorityColor(notification.priority)} className="text-xs w-fit">
                              {notification.priority}
                            </Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 flex-shrink-0">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                          >
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline ml-1">Read</span>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline ml-1">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 sm:p-8 text-center">
                  <Bell className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-muted-foreground mb-2">No notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === "unread" ? "All notifications have been read" : "You're all caught up!"}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Notifications;