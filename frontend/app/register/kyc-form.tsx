"use client"

import { useState } from "react"
import { Check, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PersonalInfoStep from "./steps/personal-info-step"
import ContactInfoStep from "./steps/contact-info-step"
import DocumentUploadStep from "./steps/document-upload-step"
import ReviewStep from "./steps/review-step"
import SuccessStep from "./steps/success-step"

type FormData = {
  firstName: string
  lastName: string
  dateOfBirth: Date | undefined
  nationality: string
  address: string
  city: string
  postalCode: string
  country: string
  email: string
  phone: string
  idDocument: File | null
  idDocumentType: string
  addressProof: File | null
  selfie: File | null
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: undefined,
  nationality: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  email: "",
  phone: "",
  idDocument: null,
  idDocumentType: "passport",
  addressProof: null,
  selfie: null,
}

export default function KycForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const steps = [
    { name: "Personal Information", component: PersonalInfoStep },
    { name: "Contact Information", component: ContactInfoStep },
    { name: "Document Upload", component: DocumentUploadStep },
    { name: "Review", component: ReviewStep },
    { name: "Success", component: SuccessStep },
  ]

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Move to success step
    setCurrentStep(4)
    setIsSubmitting(false)
  }

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="flex justify-between">
        {steps.slice(0, 4).map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                index < currentStep
                  ? "bg-green-500 border-green-500 text-white"
                  : index === currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-gray-300 text-gray-400"
              }`}
            >
              {index < currentStep ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
            </div>
            <span
              className={`mt-2 text-sm ${index <= currentStep ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              {step.name}
            </span>
            {index < steps.length - 2 && (
              <div className="hidden sm:block w-full h-[2px] bg-gray-200 absolute left-0 top-5 -z-10" />
            )}
          </div>
        ))}
      </div>

      {/* Form card */}
      <Card className="p-6">
        <CurrentStepComponent formData={formData} updateFormData={updateFormData} />

        {/* Navigation buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
              Back
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext}>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

