"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, FileText } from "lucide-react"

export default function ComplianceReports() {
  const [reportType, setReportType] = useState("data_access")
  const [timeRange, setTimeRange] = useState("last_30_days")

  // Sample report data
  const reports = [
    {
      id: "REP-001",
      name: "Data Access Report - July 2023",
      type: "data_access",
      createdAt: "2023-07-15T14:30:00",
      size: "1.2 MB",
    },
    {
      id: "REP-002",
      name: "User Consent Report - July 2023",
      type: "user_consent",
      createdAt: "2023-07-15T10:15:00",
      size: "0.8 MB",
    },
    {
      id: "REP-003",
      name: "Document Download Report - June 2023",
      type: "document_download",
      createdAt: "2023-06-30T16:45:00",
      size: "1.5 MB",
    },
    {
      id: "REP-004",
      name: "API Usage Report - June 2023",
      type: "api_usage",
      createdAt: "2023-06-30T09:20:00",
      size: "0.6 MB",
    },
    {
      id: "REP-005",
      name: "Data Access Report - June 2023",
      type: "data_access",
      createdAt: "2023-06-15T11:30:00",
      size: "1.1 MB",
    },
  ]

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Compliance Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="data_access">Data Access Report</SelectItem>
                  <SelectItem value="user_consent">User Consent Report</SelectItem>
                  <SelectItem value="document_download">Document Download Report</SelectItem>
                  <SelectItem value="api_usage">API Usage Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last_7_days">Last 7 days</SelectItem>
                  <SelectItem value="last_30_days">Last 30 days</SelectItem>
                  <SelectItem value="last_90_days">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select defaultValue="pdf">
                <SelectTrigger className="bg-white border-gray-200">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6">
            <Button className="bg-black text-white hover:bg-gray-800">Generate Report</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="data_access">Data Access</TabsTrigger>
              <TabsTrigger value="user_consent">User Consent</TabsTrigger>
              <TabsTrigger value="document_download">Document Downloads</TabsTrigger>
              <TabsTrigger value="api_usage">API Usage</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-gray-500">
                        Generated on {formatDate(report.createdAt)} • {report.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-200">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </TabsContent>

            {["data_access", "user_consent", "document_download", "api_usage"].map((type) => (
              <TabsContent key={type} value={type} className="space-y-4">
                {reports
                  .filter((report) => report.type === type)
                  .map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-md"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{report.name}</h3>
                          <p className="text-sm text-gray-500">
                            Generated on {formatDate(report.createdAt)} • {report.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-200">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Monthly Data Access Report</h3>
                  <p className="text-sm text-gray-500">Scheduled for the 1st of every month • PDF</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-gray-200">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200">
                  Delete
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Weekly API Usage Report</h3>
                  <p className="text-sm text-gray-500">Scheduled for every Monday • CSV</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-gray-200">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200">
                  Delete
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <Button className="bg-black text-white hover:bg-gray-800">Schedule New Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

