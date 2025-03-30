"use client"

import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function ProfileSettings() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState("sk_live_51NZgGFDJ9IvPIUBG6jmIm8RwkUs")

  const generateNewApiKey = () => {
    // In a real app, this would call an API to generate a new key
    setApiKey("sk_live_" + Math.random().toString(36).substring(2, 15))
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    // Would show a toast notification in a real app
  }

  return (
    <Tabs defaultValue="profile">
      <TabsList className="mb-4">
        <TabsTrigger value="profile">Institution Profile</TabsTrigger>
        <TabsTrigger value="api">API Management</TabsTrigger>
        <TabsTrigger value="team">Team Access</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Institution Profile</CardTitle>
            <CardDescription>Manage your institution details and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution-name">Institution Name</Label>
                <Input id="institution-name" defaultValue="Acme Corporation" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="institution-id">Institution ID</Label>
                <Input id="institution-id" defaultValue="ACM-12345" disabled />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-address">Business Address</Label>
              <Textarea id="business-address" defaultValue="123 Main Street, Suite 100, Anytown, CA 12345" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary-contact">Primary Contact</Label>
                <Input id="primary-contact" defaultValue="John Smith" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="john.smith@acme.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select defaultValue="financial">
                <SelectTrigger id="industry">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial Services</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Profile</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="api">
        <Card>
          <CardHeader>
            <CardTitle>API Management</CardTitle>
            <CardDescription>Manage your API keys for automated document requests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <div className="flex">
                <div className="relative flex-1">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    readOnly
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button variant="outline" size="icon" className="ml-2" onClick={copyApiKey}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="ml-2" onClick={generateNewApiKey}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input id="webhook-url" placeholder="https://your-domain.com/webhook" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate-limit">API Rate Limit</Label>
              <Select defaultValue="1000">
                <SelectTrigger id="rate-limit">
                  <SelectValue placeholder="Select rate limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 requests/hour</SelectItem>
                  <SelectItem value="500">500 requests/hour</SelectItem>
                  <SelectItem value="1000">1,000 requests/hour</SelectItem>
                  <SelectItem value="5000">5,000 requests/hour</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="auto-expire">Auto-expire Requests</Label>
              <Select defaultValue="7">
                <SelectTrigger id="auto-expire">
                  <SelectValue placeholder="Select expiration period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">After 3 days</SelectItem>
                  <SelectItem value="7">After 7 days</SelectItem>
                  <SelectItem value="14">After 14 days</SelectItem>
                  <SelectItem value="30">After 30 days</SelectItem>
                  <SelectItem value="never">Never expire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save API Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="team">
        <Card>
          <CardHeader>
            <CardTitle>Team Access Control</CardTitle>
            <CardDescription>Manage multi-user access for different roles.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium">{member.role}</div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Invite Team Member</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

const teamMembers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@acme.com",
    role: "Admin",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@acme.com",
    role: "Approver",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@acme.com",
    role: "Viewer",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@acme.com",
    role: "Approver",
  },
]

