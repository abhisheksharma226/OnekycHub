const express = require("express");
const User = require("../models/User");
const userRegistration = require("../models/userRegistration");
const {authenticateToken } = require("../middleware/Authorization");

const router = express.Router();

// Route to get user data by email
router.get("/dashboard/user", authenticateToken, async (req, res) => {
  const { email } = req.query; // Extract email from query parameters

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Search for user across both schemas
    const userDetails = await User.findOne({ email });
    const userRegistrationDetails = await userRegistration.findOne({ email });

    if (userRegistrationDetails) {
      // If the email exists in UserDetails, prioritize this data
      return res.status(200).json({
        
        token: req.headers.authorization.split(" ")[1], // Send token back


        userId: userRegistrationDetails._id,
        firstName: userRegistrationDetails.firstName || "N/A",
        lastName: userRegistrationDetails.lastName || "N/A",
        email: userRegistrationDetails.email,
        phone: userRegistrationDetails.phone || "N/A",
        idDocumentType: userRegistrationDetails.idDocumentType || "N/A",
        idDocument: userRegistrationDetails.idDocument || null,
        addressProof: userRegistrationDetails.addressProof || null,
        selfie: userRegistrationDetails.selfie || null,
        nationality: userRegistrationDetails.nationality || "N/A",
        dateOfBirth: userRegistrationDetails.dateOfBirth || "N/A",
        address: userRegistrationDetails.address || "N/A",
        city: userRegistrationDetails.city || "N/A",
        postalCode: userRegistrationDetails.postalCode || "N/A",
        country: userRegistrationDetails.country || "N/A",
        createdAt: userRegistrationDetails.createdAt,
        updatedAt: userRegistrationDetails.updatedAt,
      });
    } else if (userDetails) {
      // Fallback to userRegistration if email is not found in UserDetails
      return res.status(200).json({
        userId: userDetails._id,
        firstName: userDetails.firstName || "N/A",
        lastName: userDetails.lastName || "N/A",
        email: userDetails.email,
        documents: userDetails.documents || [],
        institutions: userDetails.institutions || [],
        verificationStatus: userDetails.verificationStatus || "Pending",
        securityScore: userDetails.securityScore || 0,
      });
    } else {
      // If the email is not found in either schema
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user data by email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
