const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Password hashing middleware
institutionSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
institutionSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Institution = mongoose.model("Institution", institutionSchema);
module.exports = Institution;
