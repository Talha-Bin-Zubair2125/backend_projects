const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Connectivity
mongoose
  .connect("mongodb://localhost:27017/feedback")
  .then(() => console.log(`Connection is Eastablished`))
  .catch((error) => console.log(`Error Connecting With Database`, error));

// Defining Schema
const feedback_schema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  feedbackmessage: String,
});

// Defining Model
const feedback_model = mongoose.model("Feedback", feedback_schema);

// Default Route
router.get("/", (req, res) => {
  res.send("Hey! Welcome to Feedback Route");
});

// Route for Post (/feedbackfromusers)
router.post("/feedbackfromusers", async (req, res) => {
  try {
    const data_from_frontend = new feedback_model(req.body);
    // Saving Feedback
    await data_from_frontend.save();
    res.status(201).send("Data Saved Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Saving Data");
  }
});

// Route for Get (/getfeedbacks)
router.get("/getfeedbacks", async (req, res) => {
  try {
    const data_to_send = await feedback_model.find({});
    res.status(201).json(data_to_send);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Fetching Data");
  }
});

// Router for Date-Range (/getresults)
router.get("/getresults", async (req, res) => {
  const start_date_received = req.query.startdate;
  const end_date_received = req.query.enddate;
  console.log(start_date_received, end_date_received);

  try {
    const data_to_find = await feedback_model.find({
      date: {
        /* 
            
            Syntax
            db.collection.find({
                // gte and lte with $
                dateField: { gte: startDate, lte: endDate }
            })
            
            gte is greater than equal to and lte is less than equal to  
        */

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

// export the router
module.exports = router;
