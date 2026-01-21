const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  // it means we don't connect again if already connected
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("MongoDB connected successfully!");
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
};

module.exports = connectDB;