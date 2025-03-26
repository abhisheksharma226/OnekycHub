import CONFIG from "@/utils/config";

// Function to delete the user account
const DeleteAccount = async (email: string, token: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/delete-user`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return { success: false, message: errorResponse?.message || "Failed to delete account." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error in DeleteAccount:", error);
    return { success: false, message: "An error occurred while deleting the account." };
  }
};

export default DeleteAccount;
