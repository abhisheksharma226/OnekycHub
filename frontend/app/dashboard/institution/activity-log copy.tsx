import { Download, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ActivityLog() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Activity & Audit Log</CardTitle>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
        <CardDescription>Track all institution actions for compliance and auditing.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Input placeholder="Search logs..." />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="request">Request Created</SelectItem>
                <SelectItem value="approve">Request Approved</SelectItem>
                <SelectItem value="reject">Request Rejected</SelectItem>
                <SelectItem value="reminder">Reminder Sent</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          {activityLogs.map((log) => (
            <div key={log.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{log.action}</div>
                  <div className="text-sm text-gray-500">{log.details}</div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>{log.date}</div>
                  <div>{log.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <strong>5</strong> of <strong>42</strong> activities
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
  )
}

const activityLogs = [
  {
    id: "1",
    action: "Verification Request Created",
    details: "Requested ID Proof, Address Proof from john.doe@example.com",
    date: "May 15, 2023",
    time: "10:30 AM",
  },
  {
    id: "2",
    action: "Request Approved",
    details: "Approved verification request for jane.smith@example.com",
    date: "May 14, 2023",
    time: "2:45 PM",
  },
  {
    id: "3",
    action: "Request Rejected",
    details: "Rejected verification request for robert.johnson@example.com. Reason: Document unclear",
    date: "May 13, 2023",
    time: "11:20 AM",
  },
  {
    id: "4",
    action: "Reminder Sent",
    details: "Sent reminder to sarah.williams@example.com for pending documents",
    date: "May 12, 2023",
    time: "9:15 AM",
  },
  {
    id: "5",
    action: "API Key Generated",
    details: "New API key generated for automated document requests",
    date: "May 11, 2023",
    time: "4:30 PM",
  },
]

