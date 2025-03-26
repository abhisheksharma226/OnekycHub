"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import CONFIG from "@/utils/config";

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "India",
  "Brazil",
  "South Africa",
];

export default function PersonalInfoStep({ formData, updateFormData }) {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    // Fetch token and email from localStorage
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (email) {
      // Simulate an API call to fetch user details based on the email
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`${CONFIG.BASE_URL}/dashboard/user?email=${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            // Update the form data with the fetched user details
            updateFormData({
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
            });
          } else {
            console.error("Failed to fetch user details.");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [updateFormData]);

  const validateField = (name, value) => {
    if (!value && name !== "dateOfBirth") {
      return `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1")} is required`;
    }
    if (name === "dateOfBirth" && !value) {
      return "Date of birth is required";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    updateFormData({ [name]: value });
  };

  const handleDateChange = (date) => {
    const error = validateField("dateOfBirth", date);

    setErrors((prev) => ({
      ...prev,
      dateOfBirth: error,
    }));

    updateFormData({ dateOfBirth: date });
  };

  const handleSelectChange = (name, value) => {
    const error = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    updateFormData({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <p className="text-muted-foreground">
          Please provide your personal details as they appear on your official identification documents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName || ""}
            readOnly
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName || ""}
            readOnly
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.dateOfBirth && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.dateOfBirth}
                onSelect={handleDateChange}
                initialFocus
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
              />
            </PopoverContent>
          </Popover>
          {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Select value={formData.nationality} onValueChange={(value) => handleSelectChange("nationality", value)}>
            <SelectTrigger id="nationality">
              <SelectValue placeholder="Select your nationality" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.nationality && <p className="text-sm text-red-500">{errors.nationality}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your street address"
        />
        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="Enter your city" />
          {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Enter your postal code"
          />
          {errors.postalCode && <p className="text-sm text-red-500">{errors.postalCode}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
        </div>
      </div>
    </div>
  )
}

