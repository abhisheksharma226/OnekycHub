const express = require("express");
const User = require("../models/User");
const Institution = require("../models/Institution"); // Add this if needed
const Admin = require("../models/Admin"); // Add this if needed
const router = express.Router();

// Route to get user data by email
router.get("/dashboard/user", async (req, res) => {
  const { email } = req.query; // Extract email from query parameters

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Search for user by email across multiple collections/models
    const user = await User.findOne({ email }) ||
                 await Institution.findOne({ email }) ||
                 await Admin.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    res.status(200).json({
      userId: user._id,
      firstName: user.firstName || "N/A",
      lastName: user.lastName || "N/A",
      email: user.email,
      loginType: user.loginType || "Unknown",
    });
    
  } catch (error) {
    console.error("Error fetching user data by email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
