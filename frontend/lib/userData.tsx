// utils/useUserData.ts
import CONFIG from "@/utils/config";
import { useEffect, useState } from "react";

interface UserData {
    address: string;
    addressProof: string;
    city: string;
    country: string;
    createdAt: string;
    dateOfBirth: string;
    email: string;
    firstName: string;
    idDocument: string;
    idDocumentType: string;
    lastName: string;
    nationality: string;
    phone: string;
    postalCode: string;
    selfie: string;
    updatedAt: string;
    userId: string;
}

const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (!token || !email) {
        setError("User is not logged in.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${CONFIG.BASE_URL}/dashboard/user?email=${email}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message || "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userData, isLoading, error };
};

export default useUserData;
