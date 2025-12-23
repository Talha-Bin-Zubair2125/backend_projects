const express = require("express");
const router = express.Router();
const db_connection = require('../models/contactdemo');



// Default Route
router.get("/", (req, res) => {
  res.send("Hey! Welcome to Contact Route Page!");
});

// POST Route (/addcontact)
router.post("/addcontact", async (req, res) => {
  try {
    const data_from_frontend = new db_connection(req.body);
    await data_from_frontend.save();
    res.status(201).send("Data Saved Successfully");
  } catch (error) {
    res.status(500).send("Error Saving Data");
  }
});

// Exporting the Router File
module.exports = router;
