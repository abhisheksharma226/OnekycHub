const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Institution = require("../models/Institution");
const Admin = require("../models/Admin");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { email, password, loginType } = req.body;

console.log("Active tab:", loginType);


  try {
    let model;
    switch (loginType) {
      case "user":
        model = User;
        break;
      case "institution":
        model = Institution;
        break;
      case "admin":
        model = Admin;
        break;
      default:
        return res.status(400).json({ message: "Invalid login type" });
    }

    // Find user in the relevant collection
    const account = await model.findOne({ email });
    // console.log("Account:", account);
    if (!account) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: account.email, id: account._id }, // Payload
        process.env.JWT_SECRET, // Secret key
      { expiresIn: "1hr" } // Token expiry
    );
    console.log("Generated Token:", token); // Debug generated token

    res.status(200).json({ message: "Login successful",email: account.email, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
