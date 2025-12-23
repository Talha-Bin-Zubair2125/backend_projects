const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Connectivity

/*
    If blogs_DB doesn’t exist, MongoDB will automatically create it when you insert your first document.
*/

mongoose
  .connect("mongodb://localhost:27017/blogs_DB")
  .then(() => console.log("Connectivity is Successfull"))
  .catch((error) => console.log("Error Connecting With MongoDB"));

// Defining Schema
const blogs_schema = new mongoose.Schema({
  // it contains the key along with data it stores
  title: String,
  Blog_Content: String,
  author_name: String,
  date: Date,
});

// Creating a Model -- means we are creating a collection that contains the schema properties
const blog_model = mongoose.model("Blogs", blogs_schema);

// Default Route
router.get("/", (req, res) => {
  res.send("Welcome! This is the Router File");
});

// Route for POST (/addblog)
router.post("/addblog", async (req, res) => {
  try {
    // Received Data From Frontend and inserting data
    const data_received_from_frontend = new blog_model(req.body);
    // Saving Data
    await data_received_from_frontend.save();
    res.status(201).send("Data Saved Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Saving Data");
  }
});

// Route for GET (/getblog)
router.get("/getblog", async (req, res) => {
  try {
    // Sending Data to Frontend
    const data_to_frontend = await blog_model.find({});
    res.status(201).json(data_to_frontend);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Fetching Data");
  }
});

// Route for GET (/search_data) -- via $ we perform queries, updates, or aggregations.
router.get("/searchdata", async (req, res) => {
    const start_date_received = req.query.startdate;
    const end_date_received = req.query.enddate;
  try {
    const data_to_find = await blog_model.find({
      date: {
        $gte: start_date_received,
        $lte: end_date_received,
      },
    });
    res.status(201).json(data_to_find);
  } catch (error) {
    console.error(error);
    res.status(500).send("Not Found");
  }
});

// Exporting the Router
module.exports = router;
