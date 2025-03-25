"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FileText, Upload, X, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import Link from "next/link";

export default function DocumentUploadPage() {
  const router = useRouter()
  const searchParams = useSearchParams() // Get search params from URL
  const email = searchParams.get("email") // Extract the email from the URL
  const [activeTab, setActiveTab] = useState("id")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setUploadError(null)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadError("Please select a file to upload")
      return
    }

    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleContinue = () => {
    if (activeTab === "id") {
      setActiveTab("address")
      setSelectedFile(null)
      setUploadComplete(false)
      setUploadProgress(0)
    } else if (activeTab === "address") {
      setActiveTab("income")
      setSelectedFile(null)
      setUploadComplete(false)
      setUploadProgress(0)
    } else {
      // All documents uploaded, redirect to dashboard
      router.push("/dashboard")
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setUploadComplete(false)
    setUploadProgress(0)
    setUploadError(null)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Keep Your Information Up-to-Date</h2>
        <p className="text-muted-foreground">Make sure your personal details are accurate for a seamless experience.</p>
      </div>

      <Alert className="flex flex-col items-center justify-center text-center p-6">
        <AlertTitle className="text-lg font-semibold">Share your details to unlock full access.</AlertTitle>

        <div className="flex items-center gap-2 mt-4">
        <Link
            href={`/register?email=${encodeURIComponent(email || "")}`}
          >
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Get Verified
          </Button>
        </Link>
        </div>

      </Alert>

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Upload KYC Documents</h2>
        <p className="text-muted-foreground">Please upload the required documents for KYC verification</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="id">ID Proof</TabsTrigger>
          <TabsTrigger value="address">Address Proof</TabsTrigger>
          <TabsTrigger value="income">Income Proof</TabsTrigger>
        </TabsList>

        <TabsContent value="id" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload ID Proof</CardTitle>
              <CardDescription>
                Please upload a government-issued photo ID such as passport, driver's license, or national ID card
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="id-type">ID Type</Label>
                <Select defaultValue="passport">
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="drivers-license">Driver's License</SelectItem>
                    <SelectItem value="national-id">National ID Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="id-document">Upload Document</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="id-document"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {selectedFile ? (
                        <div className="flex flex-col items-center">
                          <FileText className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">{selectedFile.name}</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCancel()
                            }}
                          >
                            <X className="w-4 h-4 mr-1" /> Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG or PDF (MAX. 5MB)</p>
                        </>
                      )}
                    </div>
                    <Input
                      id="id-document"
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Uploading...</Label>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {uploadComplete && (
                <Alert className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Upload Complete</AlertTitle>
                  <AlertDescription>Your document has been uploaded successfully.</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
              <div className="flex gap-2">
                {!uploadComplete ? (
                  <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                ) : (
                  <Button onClick={handleContinue}>Continue</Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="address" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Address Proof</CardTitle>
              <CardDescription>Please upload a document that verifies your current residential address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address-type">Document Type</Label>
                <Select defaultValue="utility">
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utility">Utility Bill</SelectItem>
                    <SelectItem value="bank">Bank Statement</SelectItem>
                    <SelectItem value="tax">Tax Document</SelectItem>
                    <SelectItem value="rental">Rental Agreement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Document Date</Label>
                <RadioGroup defaultValue="recent">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recent" id="recent" />
                    <Label htmlFor="recent">Less than 3 months old</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="older" id="older" />
                    <Label htmlFor="older">3-6 months old</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address-document">Upload Document</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="address-document"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {selectedFile ? (
                        <div className="flex flex-col items-center">
                          <FileText className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">{selectedFile.name}</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCancel()
                            }}
                          >
                            <X className="w-4 h-4 mr-1" /> Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG or PDF (MAX. 5MB)</p>
                        </>
                      )}
                    </div>
                    <Input
                      id="address-document"
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Uploading...</Label>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {uploadComplete && (
                <Alert className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Upload Complete</AlertTitle>
                  <AlertDescription>Your document has been uploaded successfully.</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
              <div className="flex gap-2">
                {!uploadComplete ? (
                  <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                ) : (
                  <Button onClick={handleContinue}>Continue</Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Income Proof</CardTitle>
              <CardDescription>Please upload a document that verifies your income source</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="income-type">Document Type</Label>
                <Select defaultValue="payslip">
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payslip">Payslip</SelectItem>
                    <SelectItem value="tax-return">Tax Return</SelectItem>
                    <SelectItem value="employment">Employment Contract</SelectItem>
                    <SelectItem value="bank">Bank Statement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="income-document">Upload Document</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="income-document"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {selectedFile ? (
                        <div className="flex flex-col items-center">
                          <FileText className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">{selectedFile.name}</span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={(e) => {
                              e.preventDefault()
                              handleCancel()
                            }}
                          >
                            <X className="w-4 h-4 mr-1" /> Remove
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG or PDF (MAX. 5MB)</p>
                        </>
                      )}
                    </div>
                    <Input
                      id="income-document"
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Uploading...</Label>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {uploadComplete && (
                <Alert className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Upload Complete</AlertTitle>
                  <AlertDescription>Your document has been uploaded successfully.</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Cancel
              </Button>
              <div className="flex gap-2">
                {!uploadComplete ? (
                  <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                  </Button>
                ) : (
                  <Button onClick={handleContinue}>Complete Verification</Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

