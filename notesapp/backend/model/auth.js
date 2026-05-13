// creating auth model
const mongoose = require("mongoose");
// Table Structure
const authSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// Table Name
module.exports = mongoose.model("Auth", authSchema);
