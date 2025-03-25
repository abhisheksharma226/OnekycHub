const User = require('../models/User'); // Import the User model

const uploadDocument = async (req, res) => {
  try {
    const { email } = req.body; // Extract email from the request body

    // Check if the file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Prepare the uploaded document details
    const uploadedFile = {
      documentUrl: req.file.path, // Cloudinary file URL
      documentPublicId: req.file.filename, // Cloudinary file public ID
      documentType: req.file.mimetype, // e.g., application/pdf
    };

    // Update the user record with the uploaded document details
    user.idDocument = uploadedFile.documentUrl;
    user.idDocumentType = req.file.mimetype.split('/')[1]; // Extract document type
    await user.save();

    res.status(200).json({
      message: 'Document uploaded and saved successfully.',
      user: {
        email: user.email,
        idDocument: user.idDocument,
        idDocumentType: user.idDocumentType,
      },
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ message: 'An error occurred during document upload.' });
  }
};

module.exports = { uploadDocument };
