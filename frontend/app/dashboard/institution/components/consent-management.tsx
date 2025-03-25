"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Info, AlertCircle } from "lucide-react"

export default function ConsentManagement() {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample consent data
  const consents = [
    {
      id: "CON-001",
      userId: "USR-89721",
      name: "John Smith",
      status: "active",
      documentAccess: true,
      personalInfoAccess: true,
      financialInfoAccess: false,
      lastUpdated: "2023-07-15",
    },
    {
      id: "CON-002",
      userId: "USR-76543",
      name: "Sarah Johnson",
      status: "active",
      documentAccess: true,
      personalInfoAccess: true,
      financialInfoAccess: true,
      lastUpdated: "2023-07-14",
    },
    {
      id: "CON-003",
      userId: "USR-92134",
      name: "Michael Brown",
      status: "revoked",
      documentAccess: false,
      personalInfoAccess: false,
      financialInfoAccess: false,
      lastUpdated: "2023-07-13",
    },
    {
      id: "CON-004",
      userId: "USR-45678",
      name: "Emily Davis",
      status: "active",
      documentAccess: true,
      personalInfoAccess: false,
      financialInfoAccess: false,
      lastUpdated: "2023-07-12",
    },
    {
      id: "CON-005",
      userId: "USR-34521",
      name: "Robert Wilson",
      status: "expired",
      documentAccess: false,
      personalInfoAccess: false,
      financialInfoAccess: false,
      lastUpdated: "2023-07-11",
    },
  ]

  // Filter consents based on search query
  const filteredConsents = consents.filter(
    (consent) =>
      consent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consent.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consent.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-gray-100 text-black border-gray-200">
            Active
          </Badge>
        )
      case "revoked":
        return (
          <Badge variant="outline" className="bg-gray-200 text-black border-gray-300">
            Revoked
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-gray-200 text-black border-gray-300">
            Expired
          </Badge>
        )
      default:
        return null
    }
  }

  const getAccessIcon = (hasAccess: boolean) => {
    return hasAccess ? (
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
        className="text-black"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ) : (
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
        className="text-gray-400"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Active Consents</CardTitle>
            <CardDescription>Users who have granted access to their data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{consents.filter((c) => c.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Revoked Consents</CardTitle>
            <CardDescription>Users who have revoked access to their data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{consents.filter((c) => c.status === "revoked").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Expired Consents</CardTitle>
            <CardDescription>Consents that have expired and need renewal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{consents.filter((c) => c.status === "expired").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Consent Management</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="border-gray-200">
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>About Consent Management</DialogTitle>
                  <DialogDescription>
                    This section shows the current consent status for all users who have interacted with your institute.
                    Consent status updates in real-time when users modify their preferences.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">
                      When a user revokes consent, you will no longer have access to their data and documents.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">
                      Expired consents require the user to renew their consent before you can access their data again.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by name or ID..."
                className="pl-8 bg-white border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Document Access</TableHead>
                  <TableHead className="text-center">Personal Info</TableHead>
                  <TableHead className="text-center">Financial Info</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsents.map((consent) => (
                  <TableRow key={consent.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{consent.name}</div>
                        <div className="text-sm text-gray-500">{consent.userId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(consent.status)}</TableCell>
                    <TableCell className="text-center">{getAccessIcon(consent.documentAccess)}</TableCell>
                    <TableCell className="text-center">{getAccessIcon(consent.personalInfoAccess)}</TableCell>
                    <TableCell className="text-center">{getAccessIcon(consent.financialInfoAccess)}</TableCell>
                    <TableCell>{consent.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

