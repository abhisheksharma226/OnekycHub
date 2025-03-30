"use client"

import { useState } from "react"
import { Check, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function SecurityPanel() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [autoLogout, setAutoLogout] = useState(true)
  const [ipRestriction, setIpRestriction] = useState(false)
  const [dataEncryption, setDataEncryption] = useState(true)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Configure security settings for your institution account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="two-factor" className="flex-1">
                Two-factor authentication
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Require 2FA for all institutional logins</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch id="two-factor" checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="auto-logout" className="flex-1">
                Auto logout after inactivity
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Automatically log out after 30 minutes of inactivity</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch id="auto-logout" checked={autoLogout} onCheckedChange={setAutoLogout} />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="ip-restriction" className="flex-1">
                IP address restriction
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Restrict access to specific IP addresses</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch id="ip-restriction" checked={ipRestriction} onCheckedChange={setIpRestriction} />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="data-encryption" className="flex-1">
                Enhanced data encryption
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Use enhanced encryption for all stored documents</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch id="data-encryption" checked={dataEncryption} onCheckedChange={setDataEncryption} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="document-retention">Document retention period</Label>
            <Select defaultValue="90">
              <SelectTrigger id="document-retention">
                <SelectValue placeholder="Select retention period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="180">180 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Security Settings</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Compliance Checklist</CardTitle>
          <CardDescription>Ensure your institution meets regulatory requirements.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-2">
                <div
                  className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${item.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
                >
                  <Check className="h-3 w-3" />
                </div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Generate Compliance Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

const complianceItems = [
  {
    id: "1",
    title: "Data Protection Policy",
    description: "Privacy policy updated and compliant with current regulations",
    completed: true,
  },
  {
    id: "2",
    title: "KYC Verification Process",
    description: "Documented verification procedures for customer identification",
    completed: true,
  },
  {
    id: "3",
    title: "Audit Trail Implementation",
    description: "Complete record of all verification activities and decisions",
    completed: true,
  },
  {
    id: "4",
    title: "Staff Training",
    description: "All team members trained on latest compliance requirements",
    completed: false,
  },
  {
    id: "5",
    title: "Risk Assessment",
    description: "Regular assessment of verification risks and mitigation strategies",
    completed: false,
  },
]

