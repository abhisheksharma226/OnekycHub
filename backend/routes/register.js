const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Multer middleware
const UserDetails = require('../models/userRegistration'); // User schema

router.post(
  '/register',
  upload.fields([
    { name: 'idDocument', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 },
    { name: 'selfie', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Log uploaded files and request body
      console.log('Uploaded files:', req.files);
      console.log('Request body:', req.body);

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

      // Create a new user record
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

      // Save to MongoDB
      const savedUser = await newUser.save();

      // Respond with success
      res.status(201).json({
        message: 'User registered successfully!',
        user: savedUser,
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }
);

module.exports = router;
