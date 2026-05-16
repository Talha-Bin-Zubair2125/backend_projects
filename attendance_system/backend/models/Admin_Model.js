const moongoose = require("mongoose");

// Creating a schema for admin authentication
const adminSchema = new moongoose.Schema({
  adminID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Creating a model for admin authentication
const Admin = moongoose.model("Admin", adminSchema);
module.exports = Admin;
