"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

interface Document {
  type: string;
  url: string;
  status: string; // e.g., "Verified", "Not Uploaded", etc.
}

interface UserDetailsProps {
  userData: any;
  isEditing: boolean;
  onUpdate: (data: any) => void;
}

export function UserDetails({ userData, isEditing, onUpdate }: UserDetailsProps) {
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    nationality: userData.nationality,
    dateOfBirth: userData.dateOfBirth,
    address: userData.address,
    city: userData.city,
    postalCode: userData.postalCode,
    country: userData.country,
    idDocument: userData.idDocument,
    idDocumentType: userData.idDocumentType,
    addressProof: userData.addressProof,
    selfie: userData.selfie,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = () => {
    onUpdate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      nationality: formData.nationality,
      dateOfBirth: formData.dateOfBirth,
      house: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      idDocument: formData.idDocument,
      idDocumentType: formData.idDocumentType,
      addressProof: formData.addressProof,
      selfie: formData.selfie,
    });
  };


  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img 
                    src={userData.selfie} 
                    alt={`${userData.firstName} ${userData.lastName}`} 
                    className="w-full h-full object-cover" 
                  />            
            </div>
            {/* <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full bg-black text-white hover:bg-gray-800"
            >
              <Camera className="h-4 w-4" />
            </Button> */}
          </div>
          {/* <p className="mt-2 text-sm text-gray-500">Upload a profile picture</p> */}
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            {isEditing ? (
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
            ) : (
              <p className="mt-1 text-black">{userData.firstName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            {isEditing ? (
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
            ) : (
              <p className="mt-1 text-black">{userData.lastName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            {isEditing ? (
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            ) : (
              <p className="mt-1 text-black">{userData.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            {isEditing ? (
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            ) : (
              <p className="mt-1 text-black">{userData.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="nationality">Nationality</Label>
            {isEditing ? (
              <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
            ) : (
              <p className="mt-1 text-black">{userData.nationality}</p>
            )}
          </div>

          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            {isEditing ? (
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            ) : (
              <p className="mt-1 text-black">
                {   new Date(userData.dateOfBirth).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="street">Street</Label>
            {isEditing ? (
              <Input id="street" name="street" value={formData.address} onChange={handleChange} />
            ) : (
              <p className="mt-1 text-black">{userData.address}</p>
            )}
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            {isEditing ? (
              <Input id="city" name="city" value={formData.city} onChange={handleChange} />
            ) : (
              <p className="mt-1 text-black">{userData.city}</p>
            )}
          </div>

          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            {isEditing ? (
              <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} />
            ) : (
              <p className="mt-1 text-black">{userData.postalCode}</p>
            )}
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            {isEditing ? (
              <Input id="country" name="country" value={formData.country} onChange={handleChange} />
            ) : (
              <p className="mt-1 text-black">{userData.country}</p>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 flex justify-end">
          <Button variant="outline" className="mr-2" onClick={() => onUpdate(userData)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      )}
    </div>
  )
}

