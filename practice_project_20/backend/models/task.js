const mongoose = require("mongoose");
const task_schema = new mongoose.Schema(
  {
    taskname: { type: String, required: true },
    taskdescription: { type: String, required: true },
    assignedUser: { type: String, required: true },
    status: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", task_schema);
