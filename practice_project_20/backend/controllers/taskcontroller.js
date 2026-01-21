const task_model = require("../models/task");
const user_model = require("../models/user");
const createtask = async (req, res) => {
  const { taskname, taskdescription,assignedUser } = req.body;
  // For Debugging
  console.log(taskname, taskdescription);

  try {
    const task_data = new task_model({
      taskname,
      taskdescription,
      assignedUser,
    });
    await task_data.save();
    res.status(201).json({ message: "Task Saved Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const gettask = async (req, res) => {};
const totalusers = async (req, res) => {
  try {
    const data_to_fetch = await user_model
      .find({ role: "user" })
      .select("name email role");
    console.log(data_to_fetch);
    res.json(data_to_fetch); // Sends data as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createtask, gettask, totalusers };
