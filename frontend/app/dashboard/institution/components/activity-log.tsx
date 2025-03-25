"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Filter, Search } from "lucide-react"

export default function ActivityLog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activityFilter, setActivityFilter] = useState("all")

  // Sample activity data
  const activities = [
    {
      id: "ACT-001",
      type: "data_request",
      description: "Requested data for user USR-89721",
      timestamp: "2023-07-15T14:30:00",
      user: "Admin User",
      details: "Request ID: REQ-001",
    },
    {
      id: "ACT-002",
      type: "document_download",
      description: "Downloaded passport document for user USR-76543",
      timestamp: "2023-07-15T12:15:00",
      user: "Admin User",
      details: "Document ID: DOC-123",
    },
    {
      id: "ACT-003",
      type: "status_change",
      description: "Changed request status to Approved for REQ-004",
      timestamp: "2023-07-14T16:45:00",
      user: "Admin User",
      details: "User ID: USR-45678",
    },
    {
      id: "ACT-004",
      type: "api_key_generated",
      description: "Generated new API key",
      timestamp: "2023-07-14T10:20:00",
      user: "Admin User",
      details: "API Key ID: API-789",
    },
    {
      id: "ACT-005",
      type: "login",
      description: "User logged in",
      timestamp: "2023-07-14T09:00:00",
      user: "Admin User",
      details: "IP: 192.168.1.1",
    },
    {
      id: "ACT-006",
      type: "data_request",
      description: "Requested data for user USR-34521",
      timestamp: "2023-07-13T15:10:00",
      user: "Admin User",
      details: "Request ID: REQ-005",
    },
    {
      id: "ACT-007",
      type: "status_change",
      description: "Changed request status to Rejected for REQ-003",
      timestamp: "2023-07-13T11:30:00",
      user: "Admin User",
      details: "User ID: USR-92134",
    },
  ]

  // Filter activities based on search query and activity filter
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = activityFilter === "all" || activity.type === activityFilter

    return matchesSearch && matchesType
  })

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }

  // Get icon for activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "data_request":
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Search className="h-5 w-5" />
          </div>
        )
      case "document_download":
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Download className="h-5 w-5" />
          </div>
        )
      case "status_change":
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Filter className="h-5 w-5" />
          </div>
        )
      case "api_key_generated":
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.91 8.84 8.56 21.16a4.25 4.25 0 0 1-5.99-5.99L14.88 2.83a2.82 2.82 0 0 1 4 0 2.82 2.82 0 0 1 0 4L6.7 19a1.4 1.4 0 0 1-2-2l8.38-8.38" />
            </svg>
          </div>
        )
      case "login":
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Calendar className="h-5 w-5" />
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search activities..."
              className="pl-8 bg-white border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={activityFilter} onValueChange={setActivityFilter}>
            <SelectTrigger className="w-[180px] bg-white border-gray-200">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="data_request">Data Requests</SelectItem>
              <SelectItem value="document_download">Downloads</SelectItem>
              <SelectItem value="status_change">Status Changes</SelectItem>
              <SelectItem value="api_key_generated">API Keys</SelectItem>
              <SelectItem value="login">Logins</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="border-gray-200">
          <Download className="mr-2 h-4 w-4" /> Export Log
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {filteredActivities.map((activity) => (
              <div key={activity.id} className="flex">
                <div className="mr-4">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{activity.description}</p>
                    <span className="text-sm text-gray-500">{formatTimestamp(activity.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-500">{activity.details}</p>
                  <p className="text-xs text-gray-400">By: {activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

