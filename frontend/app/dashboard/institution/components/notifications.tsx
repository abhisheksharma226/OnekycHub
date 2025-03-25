"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function Notifications({ notifications, onClose, onMarkAllRead }) {
  return (
    <div className="absolute right-0 top-10 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <h3 className="font-medium">Notifications</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-3 ${notification.read ? "" : "bg-gray-50"}`}>
                <div className="flex items-start gap-2">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${notification.read ? "bg-transparent" : "bg-black"}`}
                  ></div>
                  <div>
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">No notifications</div>
        )}
      </div>
      <div className="p-3 border-t border-gray-200">
        <Button variant="outline" size="sm" className="w-full text-xs" onClick={onMarkAllRead}>
          Mark all as read
        </Button>
      </div>
    </div>
  )
}

