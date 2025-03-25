"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload } from "lucide-react"

export default function Settings() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Tabs defaultValue="branding">
      <TabsList className="mb-6">
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="team">Team Members</TabsTrigger>
      </TabsList>

      <TabsContent value="branding">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo & Branding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="logo">Institute Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 border border-gray-200 rounded-md flex items-center justify-center bg-gray-50">
                      {logoPreview ? (
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo preview"
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-center text-gray-500 text-sm">No logo</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          className="relative border-gray-200"
                          onClick={() => document.getElementById("logo-upload")?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Logo
                          <input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleLogoChange}
                          />
                        </Button>
                        {logoPreview && (
                          <Button variant="outline" className="border-gray-200" onClick={() => setLogoPreview(null)}>
                            Remove
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">Recommended size: 512x512px. Max file size: 2MB.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institute-name">Institute Name</Label>
                  <Input
                    id="institute-name"
                    defaultValue="Acme Institute"
                    className="max-w-md bg-white border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center gap-2 max-w-md">
                    <Input id="primary-color" defaultValue="#000000" className="bg-white border-gray-200" />
                    <div
                      className="w-10 h-10 rounded-md border border-gray-200"
                      style={{ backgroundColor: "#000000" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    defaultValue="https://acmeinstitute.com"
                    className="max-w-md bg-white border-gray-200"
                  />
                </div>

                <div className="pt-4">
                  <Button className="bg-black text-white hover:bg-gray-800">Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-request">New data requests</Label>
                      <p className="text-sm text-gray-500">Receive emails when new data requests are created</p>
                    </div>
                    <Switch id="new-request" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="status-change">Status changes</Label>
                      <p className="text-sm text-gray-500">Receive emails when request statuses change</p>
                    </div>
                    <Switch id="status-change" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="consent-revoked">Consent revoked</Label>
                      <p className="text-sm text-gray-500">Receive emails when users revoke consent</p>
                    </div>
                    <Switch id="consent-revoked" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="in-app-requests">Data requests</Label>
                      <p className="text-sm text-gray-500">Show notifications for new and updated requests</p>
                    </div>
                    <Switch id="in-app-requests" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="in-app-messages">Admin messages</Label>
                      <p className="text-sm text-gray-500">Show notifications for new admin messages</p>
                    </div>
                    <Switch id="in-app-messages" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  type="email"
                  defaultValue="admin@acmeinstitute.com"
                  className="max-w-md bg-white border-gray-200"
                />
              </div>

              <div className="pt-4">
                <Button className="bg-black text-white hover:bg-gray-800">Save Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <div className="flex items-center gap-4">
                  <Switch id="two-factor" />
                  <span className="text-sm">Enable two-factor authentication</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="session-timeout" className="max-w-md bg-white border-gray-200">
                    <SelectValue placeholder="Select timeout duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ip-restriction">IP Restrictions</Label>
                <div className="flex items-center gap-4">
                  <Switch id="ip-restriction" />
                  <span className="text-sm">Restrict access to specific IP addresses</span>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-black text-white hover:bg-gray-800">Save Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="team">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Active Members</h3>
                <Button className="bg-black text-white hover:bg-gray-800">Invite Member</Button>
              </div>

              <div className="border rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="font-medium">JD</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">John Doe</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">john.doe@acmeinstitute.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">Admin</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-black">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" className="text-gray-600 hover:text-black">
                          Edit
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="font-medium">JS</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">Jane Smith</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">jane.smith@acmeinstitute.com</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">Manager</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-black">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" className="text-gray-600 hover:text-black">
                          Edit
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

