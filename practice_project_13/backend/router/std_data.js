const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// Connectivity
mongoose
  .connect("mongodb://localhost:27017/students_data")
  .then(() => console.log("MongoDB Connection is Eastablished"))
  .catch((err) => console.log("Connection Failed", err));

// Defined Schema
const std_schema = new mongoose.Schema({
  name: String,
  fathername: String,
  course: String,
  semester: String,
});

// Model
const students = mongoose.model("Student", std_schema);

// Default Route
router.get("/", (req, res) => {
  res.send("Hey There i am backend");
});

// Post Req End Point --- (/studentsdata)

/*
    backend expects data in form of objects like this
    {
        key : value,
        key : value
    }
    
    Not Like This

    "key" : {
        key : value,
        key : value
    }
*/

router.post("/studentsdata", async (req, res) => {
  try {
    const new_std = new students(req.body);
    await new_std.save();
    res.status(201).send("Data Saved Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Saving Data");
  }
});

// GET Req End Point --- (/getstd)

/*
    to get all documents we use find({})
    {} is the filter object which means there is no need to filter just return all the documents

*/
router.get("/getstd", async (req, res) => {
  try {
    const students_from_db = await students.find({});
    res.status(201).json(students_from_db);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Fetching Data");
  }
});

router.patch("/updatestd/:name", async (req, res) => {
  const data_via_name = req.params.name;
  console.log(data_via_name);

  const data_received_via_frontend = req.body;
  console.log(data_received_via_frontend.name);

  try {
    const find_std = await students.find({ name: data_via_name });
    console.log(find_std);
    const updatedStudent = await students.findOneAndUpdate(
      { name: data_via_name },
      { $set: data_received_via_frontend },
      { new: true } // return updated doc
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Fetching Data");
  }
});

router.delete("/delstddata/:name", async (req, res) => {
  const data_of_std_via_name = req.params.name;
  try {
    const del_std = await students.findOneAndDelete({
      name: data_of_std_via_name,
    });
    res.status(200).send("Data Deleted Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Deleting Data");
  }
});

// export the router
module.exports = router;
