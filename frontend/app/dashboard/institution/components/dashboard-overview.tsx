"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { ArrowUpRight, Users, Clock, XCircle, CheckCircle } from "lucide-react"

export default function DashboardOverview() {
  // Sample data for charts
  const userStatusData = [
    { name: "Verified", value: 65 },
    { name: "Pending", value: 25 },
    { name: "Rejected", value: 10 },
  ]

  const monthlyRequestsData = [
    { name: "Jan", requests: 12 },
    { name: "Feb", requests: 19 },
    { name: "Mar", requests: 15 },
    { name: "Apr", requests: 25 },
    { name: "May", requests: 32 },
    { name: "Jun", requests: 28 },
    { name: "Jul", requests: 35 },
  ]

  const COLORS = ["#000000", "#666666", "#CCCCCC"]

  const stats = [
    {
      title: "Total Users",
      value: "1,284",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: "Pending Requests",
      value: "42",
      change: "-3.2%",
      icon: Clock,
    },
    {
      title: "Rejected Requests",
      value: "18",
      change: "-5.1%",
      icon: XCircle,
    },
    {
      title: "Approved Requests",
      value: "856",
      change: "+24.3%",
      icon: CheckCircle,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Requests</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRequestsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                  }}
                />
                <Bar dataKey="requests" fill="#000000" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {userStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent activity summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="font-medium">
                      {i === 0
                        ? "New user data request approved"
                        : i === 1
                          ? "Document downloaded"
                          : "User consent updated"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {i === 0 ? "User ID: 89721" : i === 1 ? "User ID: 76543" : "User ID: 92134"}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {i === 0 ? "2 hours ago" : i === 1 ? "5 hours ago" : "1 day ago"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

