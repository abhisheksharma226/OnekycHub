const express = require("express");
const User = require("../models/User");
const Institution = require("../models/Institution");
const router = express.Router(); 


router.post("/signup", async (req, res) => {
    try {
      const { firstName, lastName, email, password, confirmPassword, acceptTerms } = req.body;
  
      // Validate required fields
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Validate password confirmation
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      // Check if terms and conditions are accepted
    //   if (!acceptTerms) {
    //     return res.status(400).json({ message: "You must accept the terms and conditions" });
    //   }
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      // Create a new user
      const newUser = new User({ firstName, lastName, email, password });
      await newUser.save();
  
      // Respond with success
      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      console.error("Error in signup:", error.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  });


  router.post("/register-institution", async (req, res) => {
    try {
      const { name, registrationId, email, password } = req.body;
  
      // Validate required fields
      if (!name || !registrationId || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
  
      // Check if the email is already registered
      const existingInstitution = await Institution.findOne({ email });
      if (existingInstitution) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      // Check if the registration ID is already used
      const existingRegistrationId = await Institution.findOne({ registrationId });
      if (existingRegistrationId) {
        return res.status(400).json({ message: "Registration ID already in use" });
      }
  
      
      // Create a new institution
      const newInstitution = new Institution({ name, registrationId, email, password });
      await newInstitution.save();
  
      // Respond with success
      res.status(201).json({ message: "Institution registered successfully!" });
    } catch (error) {
      console.error("Error in register-institution:", error.message);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  });
  
  

  module.exports = router;