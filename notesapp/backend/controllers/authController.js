const express = require("express");
const bcrypt = require("bcryptjs");
const Auth_Model = require("../model/auth");
const JOI = require("joi");

// Defining validation schemas using JOI

const registerSchema = JOI.object({
  username: JOI.string().min(3).max(30).required(),
  email: JOI.string().email().required(),
  password: JOI.string().min(6).required(),
  confirmPassword: JOI.string().valid(JOI.ref("password")).required().messages({
    "any.only": "Confirm password must match password",
  }),
});

const loginSchema = JOI.object({
  email: JOI.string().email().required(),
  password: JOI.string().min(6).required(),
});

const updateProfileSchema = JOI.object({
  updatedName: JOI.string().min(3).max(30),
  updatedEmail: JOI.string().email(),
  updatedPassword: JOI.string().min(6),
  confirmPassword: JOI.string().valid(JOI.ref("updatedPassword")).messages({
    "any.only": "Confirm password must match updated password",
  }),
});

// Register Route

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { username, email, password, confirmPassword } = req.body;
  try {
    // Check if user already exists
    const existingUser = await Auth_Model.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user
    const newUser = await Auth_Model.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login Route

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { email, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await Auth_Model.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Signing Cookie
    res.cookie("user_Id", existingUser._id, {
      signed: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get Profile Route

const getProfile = async (req, res) => {
  try {
    const user = await Auth_Model.findById(req.user_Id).select("-password");
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Logout Route

const Logout = async (req, res) => {
  try {
    res.clearCookie("user_Id", {
      httpOnly: true,
      signed: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
};

// Update Profile Route

const updateProfile = async (req, res) => {
  const { error } = updateProfileSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { updatedName, updatedEmail, updatedPassword, confirmPassword } =
    req.body;
  try {
    const user = await Auth_Model.findById(req.user_Id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    if (updatedName) {
      user.username = updatedName;
    }
    if (updatedEmail) {
      user.email = updatedEmail;
    }
    if (updatedPassword) {
      user.password = await bcrypt.hash(updatedPassword, 10);
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

module.exports = { register, login, getProfile, Logout, updateProfile };
