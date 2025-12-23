// db.js
const mongoose = require("mongoose");

// we are connecting to a default db and all models use this default connection 
const connectDB = async () => {
    // it means we don't connect again if already connected
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect("mongodb://localhost:27017/contact_data");
      console.log("MongoDB connected successfully!");
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
