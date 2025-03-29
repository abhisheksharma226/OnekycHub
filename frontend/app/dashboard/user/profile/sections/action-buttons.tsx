"use client";

import { Button } from "@/components/ui/button";
import { Download, Edit, Trash2 } from "lucide-react";
import DeleteAccount from "@/lib/deleteUser";
import { useRouter } from "next/navigation";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useState, useEffect } from "react";
import CONFIG from "@/utils/config";

interface ActionButtonsProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

export function ActionButtons({ isEditing, onEdit, onCancel }: ActionButtonsProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Start loading
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        if (!email || !token) {
          alert("Error: Missing user authentication data. Please log in again.");
          setLoading(false); // Stop loading
          return;
        }

        // Fetch user data from your API
        const response = await fetch(`${CONFIG.BASE_URL}/dashboard/user?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    // Show loading spinner or message while fetching data
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  if (!userData) {
    // Show a message if user data is not available
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No user data available. Please log in again.</p>
      </div>
    );
  }

  const handleUpdateProfile = () => {
    router.push("/register");
  };

  const handleDownloadProfile = async () => {
    if (!userData) {
      alert("User data is not loaded yet.");
      return;
    }

    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Title
      page.drawText("User Profile Data", {
        x: 50,
        y: height - 50,
        size: 20,
        font,
        color: rgb(0, 0.53, 0.71),
      });

      // Field labels and values
      const startX = 50;
      let currentY = height - 100;
      const lineHeight = 20;

      const drawField = (label: string, value: string) => {
        page.drawText(`${label}:`, {
          x: startX,
          y: currentY,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
        page.drawText(value, {
          x: startX + 120,
          y: currentY,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
        currentY -= lineHeight;
      };

      drawField("First Name", userData.firstName || "N/A");
      drawField("Last Name", userData.lastName || "N/A");
      drawField("Email", userData.email || "N/A");
      drawField("Phone", userData.phone || "N/A");
      drawField("Date of Birth", userData.dateOfBirth || "N/A");
      drawField("Nationality", userData.nationality || "N/A");
      drawField("Country", userData.country || "N/A");
      drawField("City", userData.city || "N/A");
      drawField("Postal Code", userData.postalCode || "N/A");
      drawField("ID Document Type", userData.idDocumentType || "N/A");
      // drawField("ID Document", userData.idDocument || "N/A");
      // drawField("Address Proof", userData.addressProof || "N/A");

      // Serialize the PDF document to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a blob and trigger the download
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "UserProfile.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const confirmation = confirm("Are you sure you want to delete your account?");
      if (!confirmation) return;

      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      if (!email || !token) {
        alert("Error: Missing user authentication data. Please log in again.");
        return;
      }

      const response = await DeleteAccount(email, token);

      if (response.success) {
        alert("Account deleted successfully.");
        window.location.href = "/login";
      } else {
        alert(`Failed to delete account: ${response.message}`);
      }
    } catch (error: any) {
      console.error("Error deleting account:", error);
      alert("An error occurred while deleting your account. Please try again.");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-wrap gap-2">
        {!isEditing && (
          <>
            <Button variant="outline" className="flex items-center" onClick={handleUpdateProfile}>
              <Edit className="h-4 w-4 mr-2" />
              Update Profile
            </Button>

            <Button variant="outline" className="flex items-center" onClick={handleDownloadProfile}>
              <Download className="h-4 w-4 mr-2" />
              Download Profile Data
            </Button>
          </>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <Button
          variant="destructive"
          className="bg-white text-red-600 border border-red-600 hover:bg-red-50"
          onClick={handleDeleteAccount}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Account
        </Button>
        <p className="mt-2 text-xs text-gray-500">
          This action cannot be undone. All your data will be permanently removed.
        </p>
      </div>
    </div>
  );
}
