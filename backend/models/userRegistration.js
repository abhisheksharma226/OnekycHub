const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String,  trim: true },
    email: { type: String, unique: true, trim: true },
    password: { type: String, },
    dateOfBirth: { type: Date },
    nationality: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true },
   phone: { 
    type: String, 
    match: [/^\+?\d{1,4}[\s]?\d{10,15}$/, 'Please enter a valid phone number'] 
    },
    idDocumentType: { type: String },
    idDocument: { type: String }, // Cloudinary URL for ID document
    addressProof: { type: String }, // Cloudinary URL for address proof
    selfie: { type: String }, // Cloudinary URL for selfie
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserDetails', userDetailsSchema);
