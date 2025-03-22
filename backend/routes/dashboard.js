const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("dashboard/user/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Determine the model based on the login type
      const user = await User.findById(userId) || 
                   await Institution.findById(userId) || 
                   await Admin.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        userId: user._id,
        name: user.name,
        email: user.email,
        loginType: user.loginType,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
module.exports = router;
