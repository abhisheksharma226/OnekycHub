"use client"

import { format } from "date-fns"
import { FileText, User, MapPin, Mail, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function ReviewStep({ formData }) {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const formatDocumentName = (file) => {
    if (!file) return "Not uploaded"
    return file.name.length > 20 ? file.name.substring(0, 20) + "..." : file.name
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Review Your Information</h2>
        <p className="text-muted-foreground">
          Please review your information before submitting. Make sure all details are correct.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold flex items-center">
            <User className="mr-2 h-5 w-5" />
            Personal Information
          </h3>
          <Separator className="my-2" />
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-4">
            <div>
              <dt className="text-sm text-muted-foreground">Full Name</dt>
              <dd className="font-medium">
                {formData.firstName} {formData.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Date of Birth</dt>
              <dd className="font-medium">
                {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Not provided"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Nationality</dt>
              <dd className="font-medium">{formData.nationality || "Not provided"}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Address Information
          </h3>
          <Separator className="my-2" />
          <dl className="grid grid-cols-1 gap-y-3 mt-4">
            <div>
              <dt className="text-sm text-muted-foreground">Address</dt>
              <dd className="font-medium">{formData.address || "Not provided"}</dd>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
              <div>
                <dt className="text-sm text-muted-foreground">City</dt>
                <dd className="font-medium">{formData.city || "Not provided"}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Postal Code</dt>
                <dd className="font-medium">{formData.postalCode || "Not provided"}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Country</dt>
                <dd className="font-medium">{formData.country || "Not provided"}</dd>
              </div>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Contact Information
          </h3>
          <Separator className="my-2" />
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-4">
            <div>
              <dt className="text-sm text-muted-foreground">Email</dt>
              <dd className="font-medium">{formData.email || "Not provided"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Phone</dt>
              <dd className="font-medium">{formData.phone || "Not provided"}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-semibold flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Document Information
          </h3>
          <Separator className="my-2" />
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-4">
            <div>
              <dt className="text-sm text-muted-foreground">ID Document Type</dt>
              <dd className="font-medium capitalize">{formData.idDocumentType || "Not selected"}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">ID Document</dt>
              <dd className="font-medium">{formatDocumentName(formData.idDocument)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Proof of Address</dt>
              <dd className="font-medium">{formatDocumentName(formData.addressProof)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Selfie</dt>
              <dd className="font-medium">{formatDocumentName(formData.selfie)}</dd>
            </div>
          </dl>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Please ensure all information is accurate before submitting. Providing false information may result in
            rejection of your verification.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" checked={termsAccepted} onCheckedChange={setTermsAccepted} />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the Terms of Service
              </Label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you agree to our Terms of Service and conditions.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="privacy" checked={privacyAccepted} onCheckedChange={setPrivacyAccepted} />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="privacy"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the Privacy Policy
              </Label>
              <p className="text-sm text-muted-foreground">
                By checking this box, you consent to our Privacy Policy regarding the handling of your personal data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

