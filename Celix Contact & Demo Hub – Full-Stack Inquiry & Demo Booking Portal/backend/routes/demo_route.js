const express = require("express");
const router = express.Router();
const db_connection = require("../models/bookdemo");

// Connectivity With MongoDB
/*

Error ! Mongoose already having an active connection i am calling mongoose.connect() again in another file (demo_route.js).
Mongoose does not allow multiple connects on the same default connection with different URIs.
It only allows one active connection per default connection.

mongoose
  .connect("mongodb://localhost:27017/demo_book_data")
  .then(() => console.log("Congrats! MongoDB Connection is Eastablished!"))
  .catch((error) => console.error(error));

*/

// Default Route
router.get("/", (req, res) => {
  res.send("Hey! Welcome to Demo Route Page!");
});

router.post("/add_demo_data", async (req, res) => {
  try {
    const data_from_frontend = new db_connection(req.body);
    await data_from_frontend.save();
    res.status(201).send("Demo Scheduled!");
  } catch (error) {
    res.status(500).send("Error Saving Data");
  }
});

// Exporting the Route File
module.exports = router;
