const task_model = require("../models/task");
const user_model = require("../models/user");

const createtask = async (req, res) => {
  const { taskname, taskdescription, assignedUser, status } = req.body;
  try {
    const task_data = new task_model({
      taskname,
      taskdescription,
      assignedUser,
      status,
    });
    await task_data.save();
    res.status(201).json({ message: "Task Saved Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const gettask = async (req, res) => {
  try {
    const task_to_fetch = await task_model.find({});
    res.json(task_to_fetch);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const totalusers = async (req, res) => {
  try {
    const data_to_fetch = await user_model
      .find({ role: "user" })
      .select("name email role");
    res.json(data_to_fetch); // Sends data as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const gettaskbyid = async (req, res) => {
  const user_id = req.user.id;
  const data_from_frontend = req.body;
 
  try {
    const data = await task_model
      .find({ assignedUser: user_id })
      .select("taskname taskdescription status assignedUser createdAt");
    console.log("Hey",data);
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

const updatetaskbyid = async (req, res) => {
  const user_id = req.user.id;
  const { taskid, status } = req.body;

  try {
    const task = await task_model.findOneAndUpdate(
      { _id: taskid, assignedUser: user_id },
      { status },
      { new: true },
    );
   
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

module.exports = {
  createtask,
  gettask,
  totalusers,
  gettaskbyid,
  updatetaskbyid,
};
