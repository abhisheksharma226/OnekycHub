"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, MoreHorizontal, Plus, Search, Eye } from "lucide-react"

export default function UserDataRequests() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample data
  const requests = [
    {
      id: "REQ-001",
      userId: "USR-89721",
      name: "John Smith",
      requestDate: "2023-07-15",
      status: "approved",
      documents: ["Passport", "Address Proof"],
    },
    {
      id: "REQ-002",
      userId: "USR-76543",
      name: "Sarah Johnson",
      requestDate: "2023-07-14",
      status: "pending",
      documents: ["ID Card"],
    },
    {
      id: "REQ-003",
      userId: "USR-92134",
      name: "Michael Brown",
      requestDate: "2023-07-13",
      status: "rejected",
      documents: ["Passport", "Utility Bill"],
    },
    {
      id: "REQ-004",
      userId: "USR-45678",
      name: "Emily Davis",
      requestDate: "2023-07-12",
      status: "approved",
      documents: ["Passport", "Bank Statement"],
    },
    {
      id: "REQ-005",
      userId: "USR-34521",
      name: "Robert Wilson",
      requestDate: "2023-07-11",
      status: "pending",
      documents: ["Driver's License"],
    },
  ]

  // Filter requests based on search query and status filter
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-gray-100 text-black border-gray-200">
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-white text-black border-gray-200">
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-gray-200 text-black border-gray-300">
            Rejected
          </Badge>
        )
      default:
        return null
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
              placeholder="Search by name, ID or request ID..."
              className="pl-8 bg-white border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-white border-gray-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black text-white hover:bg-gray-800">
              <Plus className="mr-2 h-4 w-4" /> New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New User Data Request</DialogTitle>
              <DialogDescription>Enter the user ID to request KYC data access.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="userId" className="text-right">
                  User ID
                </label>
                <Input id="userId" placeholder="Enter user ID" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="purpose" className="text-right">
                  Purpose
                </label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verification">Verification</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Request ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>
                  <div>
                    <div>{request.name}</div>
                    <div className="text-sm text-gray-500">{request.userId}</div>
                  </div>
                </TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>{request.documents.join(", ")}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {request.status === "approved" && (
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Documents
                        </DropdownMenuItem>
                      )}
                      {request.status === "pending" && (
                        <>
                          <DropdownMenuItem>Approve</DropdownMenuItem>
                          <DropdownMenuItem>Reject</DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

