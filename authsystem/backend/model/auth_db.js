const mongoose = require("mongoose");
// Table Structure
const auth_schema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
});
// Creating Model
module.exports = mongoose.model("auth_db", auth_schema);
