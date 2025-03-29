const mongoose = require('mongoose');

const DataSharingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures one record per user
  },
  dataPreferences: {
    idProof: { type: Boolean, default: false },
    addressProof: { type: Boolean, default: false },
    incomeProof: { type: Boolean, default: false },
    personalInfo: { type: Boolean, default: false },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the `updatedAt` field
DataSharingSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});



module.exports = mongoose.model('UserConsent', DataSharingSchema);
