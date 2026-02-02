const mongoose = require("mongoose");
// Table Structure
const user_schema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "editor" , "author"],
      default: "admin",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", user_schema);
