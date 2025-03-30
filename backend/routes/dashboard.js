const express = require("express");
const User = require("../models/User");
const userRegistration = require("../models/userRegistration");
const {authenticateToken } = require("../middleware/Authorization");
const DataSharing = require("../models/UserConsent"); // Import the DataSharing model


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


router.post('/preferences/save', async (req, res) => {
  const email = req.body.email; // Expecting email from request body
  const dataPreferences = req.body.dataPreferences; // Get dataPreferences from request body

  // console.log("Received email:", email);
  // console.log("Received dataPreferences:", dataPreferences);

  // Check if email is provided
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Find user by email and update dataPreferences, or create a new user if not found
    const user = await DataSharing.findOneAndUpdate(
      { email }, // Find user by email
      { $set: { dataPreferences } }, // Update the dataPreferences field
      { upsert: true, new: true } // Create a new record if not found
    );

    res.status(200).json({ message: 'Preferences saved successfully', user });
  } catch (err) {
    console.error("Error saving preferences:", err);
    res.status(500).json({ error: 'Error saving preferences', details: err });
  }
});


router.get("/preferences/get", async (req, res) => {
  const { email } = req.query; // Retrieve the email from query parameters

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Find the preferences for the user with the given email
    const userPreferences = await DataSharing.findOne({ email });

    if (!userPreferences) {
      // If no preferences are found, return a default response
      return res.status(200).json({
        dataPreferences: {
          idProof: true,
          addressProof: true,
          incomeProof: false,
          personalInfo: true,
        },
      });
    }

    // If preferences are found, return them
    res.status(200).json({ dataPreferences: userPreferences.dataPreferences });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res.status(500).json({ error: "An error occurred while fetching preferences" });
  }
});


// ✅ **Route to update user preferences**
router.post("/settings/save", async (req, res) => {
  try {
    const { email, securityPreferences, dataPrivacy } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // ✅ **Find existing user preferences or create a new one**
    let userPreferences = await DataSharing.findOne({ email });

    if (!userPreferences) {
      userPreferences = new DataSharing({ email, securityPreferences, dataPrivacy });
    } else {
      userPreferences.securityPreferences = securityPreferences;
      userPreferences.dataPrivacy = dataPrivacy;
    }

    await userPreferences.save();

    return res.status(200).json({ message: "Preferences saved successfully" });
  } catch (error) {
    console.error("Error saving preferences:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ **Route to fetch user preferences**
router.get("/settings/get", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const userPreferences = await DataSharing.findOne({ email });

    if (!userPreferences) {
      return res.status(404).json({ error: "User preferences not found" });
    }

    return res.status(200).json({ data: userPreferences });
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



module.exports = router;
