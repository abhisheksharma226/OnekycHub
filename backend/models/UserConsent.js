const mongoose = require("mongoose");

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

// ✅ **Security Preferences**
const SecurityPreferencesSchema = new mongoose.Schema({
  twoFactorAuth: { type: Boolean, default: false }, // Two-Factor Authentication (2FA)
  emailVerification: { type: Boolean, default: false }, // Email Verification
  loginAlerts: { type: Boolean, default: false }, // Login Alerts
});

// ✅ **Data Privacy Options**
const DataPrivacySchema = new mongoose.Schema({
  dataSharing: { type: Boolean, default: false }, // Allow sharing verification status with partners
  marketingCommunications: { type: Boolean, default: false }, // Receive marketing emails
});

// Add the schemas to the main schema
DataSharingSchema.add({
  securityPreferences: SecurityPreferencesSchema,
  dataPrivacy: DataPrivacySchema,
});

// ✅ Middleware to update the `updatedAt` field on save
DataSharingSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("UserConsent", DataSharingSchema);
