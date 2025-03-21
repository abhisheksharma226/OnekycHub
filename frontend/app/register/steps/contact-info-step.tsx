"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ContactInfoStep({ formData, updateFormData }) {
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  })

  const validateField = (name, value) => {
    if (!value) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return "Please enter a valid email address"
      }
    }

    if (name === "phone") {
      const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/
      if (!phoneRegex.test(value)) {
        return "Please enter a valid phone number"
      }
    }

    return ""
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const error = validateField(name, value)

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))

    updateFormData({ [name]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p className="text-muted-foreground">
          Please provide your contact details. We'll use these to communicate with you about your verification status.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          <p className="text-sm text-muted-foreground">We'll send verification updates to this email address.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number (with country code)"
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          <p className="text-sm text-muted-foreground">
            Format: +1 123 456 7890. We may send verification codes to this number.
          </p>
        </div>
      </div>
    </div>
  )
}

