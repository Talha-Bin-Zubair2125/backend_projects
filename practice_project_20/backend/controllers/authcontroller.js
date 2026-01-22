const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user_model = require("../models/user");

const register_user = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await user_model.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    // For New Users
    const user = new user_model({ name, email, password: hashedpassword });
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
        name: existingUser.name,
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
    const user = await user_model.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { login_user, register_user, get_profile };
