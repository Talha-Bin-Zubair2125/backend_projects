const mongoose = require("mongoose");

// Creating a Schema
const contact_schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  assistance: String,
});



module.exports = mongoose.model("Contact", contact_schema);