// Institution.js
const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  institutionName: { type: String, required: true },
  address: { type: String },
});

module.exports = mongoose.model("Institution", institutionSchema);
