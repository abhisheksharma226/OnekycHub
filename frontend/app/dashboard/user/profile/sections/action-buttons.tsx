"use client";

import { Button } from "@/components/ui/button";
import { Download, Edit, Trash2 } from "lucide-react";
import DeleteAccount from "@/lib/deleteUser";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

export function ActionButtons({ isEditing, onEdit, onCancel }: ActionButtonsProps) {
  const router = useRouter(); // Initialize Next.js router

  const handleUpdateProfile = () => {
    router.push("/register"); // Redirect to the /register route
  };
  
  const handleDeleteAccount = async () => {
    try {
      const confirmation = confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );
      if (!confirmation) return;

      const email = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      if (!email || !token) {
        alert("Error: Missing user authentication data. Please log in again.");
        return;
      }

      // Call the DeleteAccount function
      const response = await DeleteAccount(email, token);

      if (response.success) {
        alert("Account deleted successfully.");
        // Redirect to login page after deletion
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

            <Button variant="outline" className="flex items-center">
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
