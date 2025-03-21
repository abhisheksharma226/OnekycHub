"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, FileText, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DocumentUploadStep({ formData, updateFormData }) {
  const [errors, setErrors] = useState({
    idDocument: "",
    addressProof: "",
    selfie: "",
  })

  const handleFileChange = (name, file) => {
    // Validate file
    let error = ""

    if (!file) {
      error = `Please upload your ${name === "idDocument" ? "ID document" : name === "addressProof" ? "proof of address" : "selfie"}`
    } else if (file.size > 5 * 1024 * 1024) {
      error = "File size should be less than 5MB"
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))

    updateFormData({ [name]: file })
  }

  const handleIdTypeChange = (value) => {
    updateFormData({ idDocumentType: value })
  }

  const renderFilePreview = (file, type) => {
    if (!file) return null

    if (file.type.startsWith("image/")) {
      return (
        <div className="relative w-full h-40 bg-muted rounded-md overflow-hidden">
          <img
            src={URL.createObjectURL(file) || "/placeholder.svg"}
            alt={`${type} preview`}
            className="w-full h-full object-contain"
          />
        </div>
      )
    }

    return (
      <div className="flex items-center p-4 bg-muted rounded-md">
        <FileText className="h-8 w-8 mr-2 text-primary" />
        <span className="text-sm font-medium truncate">{file.name}</span>
      </div>
    )
  }

  const handleRemoveFile = (name) => {
    updateFormData({ [name]: null })
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Document Upload</h2>
        <p className="text-muted-foreground">
          Please upload clear, color images of the required documents. All documents must be valid and not expired.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="idDocumentType">ID Document Type</Label>
          <Select value={formData.idDocumentType} onValueChange={handleIdTypeChange}>
            <SelectTrigger id="idDocumentType">
              <SelectValue placeholder="Select ID type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="drivingLicense">Driving License</SelectItem>
              <SelectItem value="nationalId">National ID Card</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>ID Document Upload</Label>
          <Card className="border-dashed">
            <CardContent className="p-4">
              {formData.idDocument ? (
                <div className="space-y-2">
                  {renderFilePreview(formData.idDocument, "ID Document")}
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => handleRemoveFile("idDocument")}>
                    <X className="h-4 w-4 mr-2" />
                    Remove File
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 bg-muted/50 rounded-md cursor-pointer hover:bg-muted/70 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="mb-1 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or PDF (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, application/pdf"
                    onChange={(e) => handleFileChange("idDocument", e.target.files?.[0] || null)}
                  />
                </label>
              )}
              {errors.idDocument && <p className="text-sm text-red-500 mt-2">{errors.idDocument}</p>}
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground">
            Upload a clear photo of your{" "}
            {formData.idDocumentType === "passport"
              ? "passport"
              : formData.idDocumentType === "drivingLicense"
                ? "driving license"
                : "national ID card"}
            .
          </p>
        </div>

        <div className="space-y-2">
          <Label>Proof of Address</Label>
          <Card className="border-dashed">
            <CardContent className="p-4">
              {formData.addressProof ? (
                <div className="space-y-2">
                  {renderFilePreview(formData.addressProof, "Proof of Address")}
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => handleRemoveFile("addressProof")}>
                    <X className="h-4 w-4 mr-2" />
                    Remove File
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 bg-muted/50 rounded-md cursor-pointer hover:bg-muted/70 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="mb-1 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or PDF (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, application/pdf"
                    onChange={(e) => handleFileChange("addressProof", e.target.files?.[0] || null)}
                  />
                </label>
              )}
              {errors.addressProof && <p className="text-sm text-red-500 mt-2">{errors.addressProof}</p>}
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground">
            Upload a utility bill, bank statement, or government letter (issued within the last 3 months).
          </p>
        </div>

        <div className="space-y-2">
          <Label>Selfie Verification</Label>
          <Card className="border-dashed">
            <CardContent className="p-4">
              {formData.selfie ? (
                <div className="space-y-2">
                  {renderFilePreview(formData.selfie, "Selfie")}
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => handleRemoveFile("selfie")}>
                    <X className="h-4 w-4 mr-2" />
                    Remove File
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 bg-muted/50 rounded-md cursor-pointer hover:bg-muted/70 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Camera className="h-8 w-8 mb-2 text-muted-foreground" />
                    <p className="mb-1 text-sm text-muted-foreground">
                      <span className="font-semibold">Take a selfie</span> or upload a photo
                    </p>
                    <p className="text-xs text-muted-foreground">PNG or JPG (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleFileChange("selfie", e.target.files?.[0] || null)}
                  />
                </label>
              )}
              {errors.selfie && <p className="text-sm text-red-500 mt-2">{errors.selfie}</p>}
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground">
            Take a clear photo of yourself holding your ID document. Your face and the ID should be clearly visible.
          </p>
        </div>
      </div>
    </div>
  )
}

