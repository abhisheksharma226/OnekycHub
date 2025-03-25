"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotificationsPanelProps {
  onClose: () => void
}

export default function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  // Sample notifications
  const notifications = [
    {
      id: "notif-1",
      title: "New data request approved",
      description: "User ID: USR-89721 data request has been approved.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "notif-2",
      title: "User consent updated",
      description: "User ID: USR-76543 has updated their consent preferences.",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "notif-3",
      title: "New message from admin",
      description: "You have a new message regarding API Integration Issue.",
      time: "1 day ago",
      read: true,
    },
    {
      id: "notif-4",
      title: "Document downloaded",
      description: "Passport document for User ID: USR-45678 was downloaded.",
      time: "2 days ago",
      read: true,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex justify-end">
      <div className="w-full max-w-sm bg-white h-full shadow-lg flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg">Notifications</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 ${notification.read ? "" : "bg-gray-50"}`}>
                <div className="flex items-start gap-2">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${notification.read ? "bg-transparent" : "bg-black"}`}
                  ></div>
                  <div className="flex-1">
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <Button variant="outline" className="w-full border-gray-200">
            Mark all as read
          </Button>
        </div>
      </div>
    </div>
  )
}

