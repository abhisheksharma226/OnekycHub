"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

export default function Dashboard({ requests }) {
  // Calculate statistics
  const totalRequests = requests.length
  const approvedRequests = requests.filter((req) => req.status === "approved").length
  const pendingRequests = requests.filter((req) => req.status === "pending").length
  const rejectedRequests = requests.filter((req) => req.status === "rejected").length

  const approvalRate = totalRequests ? Math.round((approvedRequests / totalRequests) * 100) : 0

  // Data for pie chart
  const statusData = [
    { name: "Approved", value: approvedRequests, color: "#10b981" },
    { name: "Pending", value: pendingRequests, color: "#f59e0b" },
    { name: "Rejected", value: rejectedRequests, color: "#ef4444" },
  ]

  // Data for bar chart - requests by purpose
  const purposeCounts = requests.reduce((acc, request) => {
    const purpose = request.purpose.charAt(0).toUpperCase() + request.purpose.slice(1)
    acc[purpose] = (acc[purpose] || 0) + 1
    return acc
  }, {})

  const purposeData = Object.keys(purposeCounts).map((purpose) => ({
    name: purpose,
    count: purposeCounts[purpose],
  }))

  // Get recent activity
  const recentActivity = [...requests]
    .sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime())
    .slice(0, 5)

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedRequests}</div>
            <p className="text-xs text-gray-500 mt-1">{approvalRate}% approval rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-gray-500 mt-1">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedRequests}</div>
            <p className="text-xs text-gray-500 mt-1">
              {totalRequests ? Math.round((rejectedRequests / totalRequests) * 100) : 0}% rejection rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Request Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} requests`, "Count"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requests by Purpose</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={purposeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} requests`, "Count"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                  }}
                />
                <Bar dataKey="count" fill="#000000" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  {activity.status === "approved" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : activity.status === "pending" ? (
                    <Clock className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      Request {activity.id} to user {activity.userId}
                    </p>
                    <span className="text-sm text-gray-500">{formatDate(activity.requestDate)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Purpose: {activity.purpose.charAt(0).toUpperCase() + activity.purpose.slice(1)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

