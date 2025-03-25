"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NewRequestForm from "./components/new-request-form"
import RequestHistory from "./components/request-history"
import Dashboard from "./components/dashboard"
import Notifications from "./components/notifications"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function RequestUI() {
  const [activeTab, setActiveTab] = useState("new-request")
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(3)

  // Sample data for the UI
  const [requests, setRequests] = useState([
    {
      id: "REQ-001",
      userId: "KYC-89721",
      purpose: "Verification",
      comments: "Need to verify identity for account opening",
      status: "approved",
      requestDate: "2023-07-15T14:30:00",
      responseDate: "2023-07-16T09:15:00",
    },
    {
      id: "REQ-002",
      userId: "KYC-76543",
      purpose: "Compliance",
      comments: "Annual KYC refresh required by regulations",
      status: "pending",
      requestDate: "2023-07-17T10:20:00",
      responseDate: null,
    },
    {
      id: "REQ-003",
      userId: "KYC-92134",
      purpose: "Verification",
      comments: "Address verification needed",
      status: "rejected",
      requestDate: "2023-07-14T11:45:00",
      responseDate: "2023-07-15T13:30:00",
    },
    {
      id: "REQ-004",
      userId: "KYC-45678",
      purpose: "Onboarding",
      comments: "New customer onboarding process",
      status: "approved",
      requestDate: "2023-07-10T09:30:00",
      responseDate: "2023-07-11T14:20:00",
    },
    {
      id: "REQ-005",
      userId: "KYC-34521",
      purpose: "Compliance",
      comments: "Regulatory requirement for high-value transactions",
      status: "pending",
      requestDate: "2023-07-16T16:15:00",
      responseDate: null,
    },
  ])

  // Sample notifications
  const notifications = [
    {
      id: "NOTIF-001",
      title: "Request Approved",
      message: "User KYC-89721 has approved your document access request.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "NOTIF-002",
      title: "Request Rejected",
      message: "User KYC-92134 has rejected your document access request.",
      time: "1 day ago",
      read: false,
    },
    {
      id: "NOTIF-003",
      title: "Request Pending",
      message: "Your request to user KYC-76543 is still pending.",
      time: "2 days ago",
      read: false,
    },
    {
      id: "NOTIF-004",
      title: "Request Approved",
      message: "User KYC-45678 has approved your document access request.",
      time: "5 days ago",
      read: true,
    },
  ]

  const handleNewRequest = (newRequest) => {
    const requestId = `REQ-${String(requests.length + 1).padStart(3, "0")}`
    const now = new Date().toISOString()

    const request = {
      id: requestId,
      userId: newRequest.userId,
      purpose: newRequest.purpose,
      comments: newRequest.comments,
      status: "pending",
      requestDate: now,
      responseDate: null,
    }

    setRequests([request, ...requests])
    setActiveTab("history")
  }

  const markAllNotificationsAsRead = () => {
    setUnreadNotifications(0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <h1 className="text-xl font-semibold">OneKYCHub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-black text-white">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
              {showNotifications && (
                <Notifications
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                  onMarkAllRead={markAllNotificationsAsRead}
                />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium">AI</span>
              </div>
              <span className="hidden md:inline font-medium">Acme Institute</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Document Access Request Portal</CardTitle>
            <CardDescription>Request access to KYC-completed documents from users</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="new-request">New Request</TabsTrigger>
                <TabsTrigger value="history">Request History</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              </TabsList>
              <TabsContent value="new-request">
                <NewRequestForm onSubmit={handleNewRequest} />
              </TabsContent>
              <TabsContent value="history">
                <RequestHistory requests={requests} />
              </TabsContent>
              <TabsContent value="dashboard">
                <Dashboard requests={requests} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} OneKYCHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

