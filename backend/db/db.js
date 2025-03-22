const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log("Connected to MongoDB Atlas successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectToMongoDB;
