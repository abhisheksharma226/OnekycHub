import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

export default function SuccessStep() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") // Extract email from the URL parameters

  const handleGoToDashboard = () => {
    if (email) {
      router.push(`/dashboard/user/?email=${encodeURIComponent(email)}`)
    } else {
      // Fallback in case the email parameter is missing
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-green-100 p-3 mb-4">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Verification Submitted Successfully</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Thank you for submitting your KYC verification. We'll review your information and documents shortly.
      </p>
      <div className="bg-muted p-4 rounded-md max-w-md text-left mb-6">
        <h3 className="font-medium mb-2">What happens next?</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Our team will review your submitted information and documents</li>
          <li>You'll receive an email notification about your verification status</li>
          <li>If additional information is needed, we'll contact you via email</li>
          <li>Once approved, you'll gain full access to all platform features</li>
        </ol>
      </div>
      <Button onClick={handleGoToDashboard} variant="default" size="lg">
        Go to Dashboard
      </Button>
    </div>
  )
}
