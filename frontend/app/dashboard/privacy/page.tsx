"use client"

import { useState } from "react"
import { Lock, Building, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function PrivacyPage() {
  const [dataSharing, setDataSharing] = useState({
    idProof: true,
    addressProof: true,
    incomeProof: false,
    personalInfo: true,
  })

  const [institutions, setInstitutions] = useState([
    { id: 1, name: "Global Finance Corp", access: true },
    { id: 2, name: "Apex Banking", access: false },
    { id: 3, name: "Secure Trust", access: false },
  ])

  const handleInstitutionToggle = (id: number) => {
    setInstitutions(institutions.map((inst) => (inst.id === id ? { ...inst, access: !inst.access } : inst)))
  }

  const handleDataSharingToggle = (key: keyof typeof dataSharing) => {
    setDataSharing({
      ...dataSharing,
      [key]: !dataSharing[key],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Privacy & Consent Management</h2>
        <p className="text-muted-foreground">Control how your data is shared and manage your privacy settings</p>
      </div>

      <Alert>
        <Lock className="h-4 w-4" />
        <AlertTitle>Your data is secure</AlertTitle>
        <AlertDescription>
          OneKYCHub uses end-to-end encryption to protect your personal information and documents.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="data-sharing">
        <TabsList>
          <TabsTrigger value="data-sharing">Data Sharing</TabsTrigger>
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="audit-log">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="data-sharing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Sharing Preferences</CardTitle>
              <CardDescription>
                Control which types of data can be shared with authorized financial institutions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="id-proof" className="font-medium">
                    ID Proof
                  </Label>
                  <p className="text-sm text-muted-foreground">Share your government-issued ID documents</p>
                </div>
                <Switch
                  id="id-proof"
                  checked={dataSharing.idProof}
                  onCheckedChange={() => handleDataSharingToggle("idProof")}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="address-proof" className="font-medium">
                    Address Proof
                  </Label>
                  <p className="text-sm text-muted-foreground">Share your address verification documents</p>
                </div>
                <Switch
                  id="address-proof"
                  checked={dataSharing.addressProof}
                  onCheckedChange={() => handleDataSharingToggle("addressProof")}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="income-proof" className="font-medium">
                    Income Proof
                  </Label>
                  <p className="text-sm text-muted-foreground">Share your income verification documents</p>
                </div>
                <Switch
                  id="income-proof"
                  checked={dataSharing.incomeProof}
                  onCheckedChange={() => handleDataSharingToggle("incomeProof")}
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="personal-info" className="font-medium">
                    Personal Information
                  </Label>
                  <p className="text-sm text-muted-foreground">Share your basic personal details (name, DOB, etc.)</p>
                </div>
                <Switch
                  id="personal-info"
                  checked={dataSharing.personalInfo}
                  onCheckedChange={() => handleDataSharingToggle("personalInfo")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
              <CardDescription>Control how long your data is stored on our platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label className="font-medium">Automatic Data Deletion</Label>
                  <p className="text-sm text-muted-foreground">Automatically delete your data after account closure</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <Label className="font-medium">Revoke Access After Expiry</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically revoke institution access after document expiry
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Request Data Deletion</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Data Deletion</DialogTitle>
                    <DialogDescription>
                      This action will permanently delete all your data from our platform. This cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        Deleting your data will terminate all your KYC verifications with financial institutions.
                      </AlertDescription>
                    </Alert>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Confirm Deletion</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="institutions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Institution Access Management</CardTitle>
              <CardDescription>Control which financial institutions can access your KYC data</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Institution</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {institutions.map((institution) => (
                    <TableRow key={institution.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          {institution.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        {institution.access ? (
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                            Active
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-gray-300 mr-2" />
                            Inactive
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{institution.access ? "Full Access" : "No Access"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant={institution.access ? "destructive" : "default"}
                            size="sm"
                            onClick={() => handleInstitutionToggle(institution.id)}
                          >
                            {institution.access ? "Revoke" : "Grant Access"}
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{institution.name}</DialogTitle>
                                <DialogDescription>
                                  Manage detailed access permissions for this institution
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4 space-y-4">
                                <div className="flex items-center justify-between space-x-2">
                                  <Label htmlFor="id-access">ID Documents</Label>
                                  <Switch id="id-access" defaultChecked={institution.access} />
                                </div>
                                <div className="flex items-center justify-between space-x-2">
                                  <Label htmlFor="address-access">Address Documents</Label>
                                  <Switch id="address-access" defaultChecked={institution.access} />
                                </div>
                                <div className="flex items-center justify-between space-x-2">
                                  <Label htmlFor="income-access">Income Documents</Label>
                                  <Switch id="income-access" defaultChecked={false} />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button>Save Permissions</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit-log" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Access Audit Log</CardTitle>
              <CardDescription>Track when and how your data has been accessed</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Data Accessed</TableHead>
                    <TableHead>Purpose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Mar 15, 2023 - 10:23 AM</TableCell>
                    <TableCell>Global Finance Corp</TableCell>
                    <TableCell>ID Proof, Address Proof</TableCell>
                    <TableCell>Account Opening</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mar 12, 2023 - 02:45 PM</TableCell>
                    <TableCell>Global Finance Corp</TableCell>
                    <TableCell>Personal Information</TableCell>
                    <TableCell>KYC Verification</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mar 10, 2023 - 09:15 AM</TableCell>
                    <TableCell>Global Finance Corp</TableCell>
                    <TableCell>ID Proof</TableCell>
                    <TableCell>Identity Verification</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Export Audit Log</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

