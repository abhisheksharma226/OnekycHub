"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, CheckCircle2 } from "lucide-react"

// Form schema with validation
const formSchema = z.object({
  userId: z
    .string()
    .min(5, { message: "User ID must be at least 5 characters" })
    .regex(/^KYC-\d+$/, {
      message: "User ID must be in the format KYC-XXXXX",
    }),
  purpose: z.string({
    required_error: "Please select a purpose for the request",
  }),
  comments: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy",
  }),
})

export default function NewRequestForm({ onSubmit }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [requestId, setRequestId] = useState("")

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      purpose: "",
      comments: "",
      consent: false,
    },
  })

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Generate a random request ID
    const generatedRequestId = `REQ-${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`
    setRequestId(generatedRequestId)

    // Call the parent component's onSubmit function
    onSubmit(values)

    // Show confirmation dialog
    setShowConfirmation(true)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Important Information</p>
            <p>
              Before requesting access to KYC documents, ensure you have a valid business reason. All requests are
              logged and audited for compliance purposes.
            </p>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter user ID (e.g., KYC-12345)" {...field} className="bg-white" />
                </FormControl>
                <FormDescription>Enter the KYC user ID in the format KYC-XXXXX</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select the purpose of your request" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="verification">Verification</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="onboarding">Onboarding</SelectItem>
                    <SelectItem value="audit">Audit</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the primary purpose for requesting these documents</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Comments</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide any additional details about your request"
                    className="resize-none bg-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This information will be shared with the user</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I confirm that I will only use the requested documents for the stated purpose and in compliance with
                    all applicable data protection regulations.
                  </FormLabel>
                  <FormDescription>All document access requests are logged and audited.</FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-black hover:bg-gray-800">
            Submit Request
          </Button>
        </form>
      </Form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Request Submitted Successfully
            </DialogTitle>
            <DialogDescription>Your document access request has been sent to the user.</DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm font-medium">Request Details:</p>
            <div className="mt-2 space-y-1 text-sm">
              <p>
                <span className="font-medium">User ID:</span> {form.getValues().userId}
              </p>
              <p>
                <span className="font-medium">Purpose:</span>{" "}
                {form.getValues().purpose.charAt(0).toUpperCase() + form.getValues().purpose.slice(1)}
              </p>
              <p>
                <span className="font-medium">Status:</span> Pending
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowConfirmation(false)} className="bg-black hover:bg-gray-800">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

