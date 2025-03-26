const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // Multer middleware
const UserDetails = require("../models/userRegistration"); // User schema

router.post(
  "/register",
  upload.fields([
    { name: "idDocument", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "selfie", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Log uploaded files and request body
      console.log("Uploaded files:", req.files);
      console.log("Request body:", req.body);

      // Extract form data
      const {
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        nationality,
        address,
        city,
        postalCode,
        country,
        phone,
        idDocumentType,
      } = req.body;

      // Extract URLs from uploaded files
      const idDocumentUrl = req.files?.idDocument?.[0]?.path || null;
      const addressProofUrl = req.files?.addressProof?.[0]?.path || null;
      const selfieUrl = req.files?.selfie?.[0]?.path || null;

      // Check if the user with the given email already exists
      const existingUser = await UserDetails.findOne({ email });

      if (existingUser) {
        // Update the existing user's details, except email, firstName, and lastName
        existingUser.password = password || existingUser.password;
        existingUser.dateOfBirth = dateOfBirth || existingUser.dateOfBirth;
        existingUser.nationality = nationality || existingUser.nationality;
        existingUser.address = address || existingUser.address;
        existingUser.city = city || existingUser.city;
        existingUser.postalCode = postalCode || existingUser.postalCode;
        existingUser.country = country || existingUser.country;
        existingUser.phone = phone || existingUser.phone;
        existingUser.idDocumentType = idDocumentType || existingUser.idDocumentType;
        existingUser.idDocument = idDocumentUrl || existingUser.idDocument;
        existingUser.addressProof = addressProofUrl || existingUser.addressProof;
        existingUser.selfie = selfieUrl || existingUser.selfie;

        // Save the updated user
        const updatedUser = await existingUser.save();

        // Respond with success for update
        return res.status(200).json({
          message: "User details updated successfully!",
          user: updatedUser,
        });
      } else {
        // If no user exists, create a new user record
        const newUser = new UserDetails({
          firstName,
          lastName,
          email,
          password,
          dateOfBirth,
          nationality,
          address,
          city,
          postalCode,
          country,
          phone,
          idDocumentType,
          idDocument: idDocumentUrl,
          addressProof: addressProofUrl,
          selfie: selfieUrl,
        });

        // Save the new user to MongoDB
        const savedUser = await newUser.save();

        // Respond with success for creation
        return res.status(201).json({
          message: "User registered successfully!",
          user: savedUser,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
);

module.exports = router;
