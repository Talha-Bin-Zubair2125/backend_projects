const mongoose = require("mongoose");

// Creating a Schema
const demo_schema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    email : String,
    company_name : String,
    date : String,
});

module.exports = mongoose.model("Demo",demo_schema);