"use client";

import { useEffect, useState } from "react";
import { UserDetails } from "./user-details";
import { DocumentsSection } from "./documents-section";
import { AdditionalInfo } from "./additional-info";
import { ActionButtons } from "./action-buttons";
import CONFIG from "@/utils/config";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false); // Manage edit mode
  const [userData, setUserData] = useState<any>(null); // Initialize user data as null
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) {
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${CONFIG.BASE_URL}/dashboard/user?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        // Map document fields into a structured array
        const documents = [
          {
            type: data.idDocumentType || "ID Document",
            link: data.idDocument,
            status: "Verified",
            lastUpdated: new Date().toLocaleDateString(),
          },
          {
            type: "Address Proof",
            link: data.addressProof,
            status: "Verified",
            lastUpdated: new Date().toLocaleDateString(),
          },
          {
            type: "Selfie",
            link: data.selfie,
            status: "Verified",
            lastUpdated: new Date().toLocaleDateString(),
          },
        ];

        // Enhance the user data with documents
        setUserData({ ...data, documents });
      } catch (error: any) {
        setError(error.message || "An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = (updatedData: any) => {
    setUserData({ ...userData, ...updatedData });
    setIsEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold text-black">User Profile</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-6">
          {/* User Details */}
          <UserDetails userData={userData} isEditing={isEditing} onUpdate={handleUpdateProfile} />

          <hr className="my-6 border-gray-200" />

          {/* Documents Section */}
          <DocumentsSection documents={userData.documents} />

          <hr className="my-6 border-gray-200" />

          {/* Additional Info */}
          <AdditionalInfo
            accountCreated={new Date().toLocaleDateString()} // Mocked for now
            lastLogin={new Date().toLocaleString()} // Mocked for now
            consentStatus="Consent Given" // Mocked
            twoFactorEnabled={true} // Mocked
          />

          <hr className="my-6 border-gray-200" />

          {/* Action Buttons */}
          <ActionButtons
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    </div>
  );
}
