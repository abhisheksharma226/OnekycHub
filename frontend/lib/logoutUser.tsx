import CONFIG from "@/utils/config";
import { useNavigate } from "react-router-dom";

export function logoutUser() {
  const navigate = useNavigate();

  // Make a request to the backend logout route
  fetch(`${CONFIG.BASE_URL}/logout`, {
    method: "POST",
    credentials: "include", // Ensures cookies are sent with the request
  })
    .then((response) => {
      if (response.ok) {
        // Clear local storage
        localStorage.clear();

        // Redirect to login page
        navigate("/login");
      } else {
        console.error("Failed to logout:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Logout Error:", error);
    });
}
