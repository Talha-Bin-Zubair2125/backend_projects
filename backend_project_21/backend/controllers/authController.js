const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user_model = require("../models/user");

const register_user = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await user_model.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    // For New Users
    const user = new user_model({ username, email, password: hashedpassword });
    // Saving New User to DB
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: err.message });
  }
};

const login_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await user_model.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const matchpassword = await bcrypt.compare(password, existingUser.password);
    if (!matchpassword) {
      return res.status(400).json({ message: "Password Incorrect" });
    }
    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.json({
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const get_profile = async (req, res) => {
  try {
    const user = await user_model.findById(req.user.id); // Find user via id in db and send res as a json
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const get_profile_by_id = async (req, res) => {
  const data = req.params.id;
  try {
    const user = await user_model.findById(data); // Find user via id in db and send res as a json
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const totalusers = async (req, res) => {
  try {
    const data_to_fetch = await user_model
      .find({})
      .select("username email role");
    res.json(data_to_fetch); // Sends data as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const edit_user = async (req, res) => {
  const data = req.params.id;
  const { username, email, password } = req.body;

  const updateData = {};
  if (username) updateData.username = username;
  if (email) updateData.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(password, salt);
  }

  try {
    const updatedUser = await user_model.findByIdAndUpdate(
      data,
      { $set: updateData },
      { new: true }, // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser); // send updated user back
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update" });
  }
};

const delete_user = async (req,res) => {
  const data = req.params.id
  try {
    const user_to_del = await user_model.findByIdAndDelete(data);
    res.json(user_to_del);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Failed to update" });
  }
}

module.exports = {
  login_user,
  register_user,
  get_profile,
  totalusers,
  edit_user,
  get_profile_by_id,
  delete_user,
};
