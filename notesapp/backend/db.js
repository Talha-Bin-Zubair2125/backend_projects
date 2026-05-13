const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = async () => {
  try {
    // means we don't connect again if already connected
    if (mongoose.connection.readyState == 0) {
      await mongoose.connect(process.env.MONGO_URI); 
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = ConnectDB;