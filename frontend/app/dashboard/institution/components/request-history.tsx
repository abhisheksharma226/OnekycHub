"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Download, Eye, Search } from "lucide-react"

export default function RequestHistory({ requests }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState(null)

  // Filter requests based on search query and status filter
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.purpose.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">Rejected</Badge>
      default:
        return null
    }
  }

  // View request details
  const viewRequestDetails = (request) => {
    setSelectedRequest(request)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search by user ID or request ID..."
            className="pl-8 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-white">
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

      <div className="border rounded-md shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Request ID</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.userId}</TableCell>
                  <TableCell>{request.purpose.charAt(0).toUpperCase() + request.purpose.slice(1)}</TableCell>
                  <TableCell>{formatDate(request.requestDate)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => viewRequestDetails(request)}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                      {request.status === "approved" && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No requests found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Request Details</DialogTitle>
              <DialogDescription>Complete information about the document access request</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Request ID</p>
                  <p className="font-medium">{selectedRequest.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">User ID</p>
                <p>{selectedRequest.userId}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Purpose</p>
                <p>{selectedRequest.purpose.charAt(0).toUpperCase() + selectedRequest.purpose.slice(1)}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Comments</p>
                <p className="text-sm">{selectedRequest.comments || "No comments provided"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Request Date</p>
                  <p className="text-sm">{formatDate(selectedRequest.requestDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Response Date</p>
                  <p className="text-sm">
                    {selectedRequest.responseDate ? formatDate(selectedRequest.responseDate) : "Pending"}
                  </p>
                </div>
              </div>

              {selectedRequest.status === "approved" && (
                <div className="pt-2">
                  <Button className="w-full bg-black hover:bg-gray-800">
                    <Download className="h-4 w-4 mr-2" /> Download Documents
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

