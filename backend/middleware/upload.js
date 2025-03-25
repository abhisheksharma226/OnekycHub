const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'OneKYCHub/User-documents', // Cloudinary folder name
    allowed_formats: ['jpeg', 'png', 'pdf'], // Allowed file formats
    resource_type: 'auto', // Automatically detect file type
  },
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage });

module.exports = upload;
