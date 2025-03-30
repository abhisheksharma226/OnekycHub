"use client"

import { DropdownMenuLabel } from "@/components/ui/dropdown-menu"

import type React from "react"

import { useState } from "react"
import { Bell, ChevronDown, Filter, Home, Key, Search, Settings, Shield, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestFormDialog } from "./request-form-dialog"
import { ActivityLog } from "./activity-log"
import { SecurityPanel } from "./security-panel"
import { ProfileSettings } from "./profile-settings"

export default function Dashboard() {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])

  const toggleRequestSelection = (id: string) => {
    if (selectedRequests.includes(id)) {
      setSelectedRequests(selectedRequests.filter((requestId) => requestId !== id))
    } else {
      setSelectedRequests([...selectedRequests, id])
    }
  }

  const selectAllRequests = () => {
    if (selectedRequests.length === requests.length) {
      setSelectedRequests([])
    } else {
      setSelectedRequests(requests.map((request) => request.id))
    }
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-white md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <h1 className="text-lg font-semibold">KYC Manager</h1>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link href="#" className="flex items-center gap-3 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <Users className="h-4 w-4" />
              Verification Requests
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <Key className="h-4 w-4" />
              API Management
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <Shield className="h-4 w-4" />
              Security & Compliance
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div>
              <div className="text-sm font-medium">Acme Corp</div>
              <div className="text-xs text-gray-500">Institution Admin</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6">
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search..." className="w-full bg-white pl-8 md:w-2/3 lg:w-1/3" />
              </div>
            </form>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </header>
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <Tabs defaultValue="requests">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="requests">Verification Requests</TabsTrigger>
                <TabsTrigger value="activity">Activity Log</TabsTrigger>
                <TabsTrigger value="profile">Profile & API</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <RequestFormDialog />
            </div>
            <TabsContent value="requests" className="mt-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Verification Requests</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        Filter
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8">
                            Bulk Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Approve Selected</DropdownMenuItem>
                          <DropdownMenuItem>Reject Selected</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Export Selected</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardDescription>Manage verification requests and track their status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300"
                              onChange={selectAllRequests}
                              checked={selectedRequests.length === requests.length && requests.length > 0}
                            />
                          </TableHead>
                          <TableHead>User Email</TableHead>
                          <TableHead>Requested Documents</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Requested Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300"
                                checked={selectedRequests.includes(request.id)}
                                onChange={() => toggleRequestSelection(request.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium">{request.email}</TableCell>
                            <TableCell>{request.documents.join(", ")}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  request.status === "Approved"
                                    ? "bg-green-100 text-green-800"
                                    : request.status === "Rejected"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {request.status}
                              </span>
                            </TableCell>
                            <TableCell>{request.date}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    Actions
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Approve</DropdownMenuItem>
                                  <DropdownMenuItem>Reject</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing <strong>5</strong> of <strong>25</strong> requests
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="activity" className="mt-6">
              <ActivityLog />
            </TabsContent>
            <TabsContent value="profile" className="mt-6">
              <ProfileSettings />
            </TabsContent>
            <TabsContent value="security" className="mt-6">
              <SecurityPanel />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

const requests = [
  {
    id: "1",
    email: "john.doe@example.com",
    documents: ["ID Proof", "Address Proof"],
    status: "Pending",
    date: "2023-05-15",
  },
  {
    id: "2",
    email: "jane.smith@example.com",
    documents: ["ID Proof", "Income Proof"],
    status: "Approved",
    date: "2023-05-14",
  },
  {
    id: "3",
    email: "robert.johnson@example.com",
    documents: ["Address Proof"],
    status: "Rejected",
    date: "2023-05-13",
  },
  {
    id: "4",
    email: "sarah.williams@example.com",
    documents: ["ID Proof", "Address Proof", "Income Proof"],
    status: "Pending",
    date: "2023-05-12",
  },
  {
    id: "5",
    email: "michael.brown@example.com",
    documents: ["ID Proof"],
    status: "Approved",
    date: "2023-05-11",
  },
]

