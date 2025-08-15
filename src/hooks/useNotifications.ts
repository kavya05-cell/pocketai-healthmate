import { useState, useEffect } from "react";

interface Notification {
  id: string;
  type: "medication" | "health" | "family" | "reminder";
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "medication",
    title: "Medication Reminder",
    message: "Time to take your evening medication (Metformin 500mg)",
    time: "2 hours ago",
    read: false,
    priority: "high"
  },
  {
    id: "2",
    type: "health",
    title: "Heart Rate Alert",
    message: "Your resting heart rate is elevated. Consider relaxation techniques.",
    time: "4 hours ago",
    read: false,
    priority: "medium"
  },
  {
    id: "3",
    type: "family",
    title: "Family Update",
    message: "Mom completed her daily walk goal! 🎉",
    time: "6 hours ago",
    read: true,
    priority: "low"
  },
  {
    id: "4",
    type: "reminder",
    title: "Water Intake",
    message: "You're 2 glasses behind your daily water goal",
    time: "1 day ago",
    read: true,
    priority: "medium"
  },
  {
    id: "5",
    type: "health",
    title: "Weekly Health Report",
    message: "Your weekly health summary is ready to view",
    time: "2 days ago",
    read: true,
    priority: "low"
  }
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    deleteNotification,
    markAllAsRead
  };
};

export type { Notification };