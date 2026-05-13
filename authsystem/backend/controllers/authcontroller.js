const express = require("express");
const auth_model = require("../model/auth_db");
const bcrypt = require("bcrypt");
const Joi = require("joi");
require("dotenv").config();

// joi schemas
const register_schema = Joi.object({
  user: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirm_password: Joi.ref("password"),
}).with("password", "confirm_password");

const login_schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const update_schema = Joi.object({
  updatedName: Joi.string().min(3).max(30).required(),
  updatedEmail: Joi.string().email().required(),
  updatedPassword: Joi.string().min(6).required(),
  confirmPassword: Joi.ref("updatedPassword"),
}).with("updatedPassword", "confirmPassword");

// register user
const register_user = async (req, res) => {
  // validate first before anything else
  const { error } = register_schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { user, email, password } = req.body;
  try {
    const existing_user = await auth_model.findOne({ email });
    if (existing_user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashed_password = await bcrypt.hash(password, 10);
    await auth_model.create({ user, email, password: hashed_password });
    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!" });
  }
};

// login user
const login_user = async (req, res) => {
  // validate first
  const { error } = login_schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;
  try {
    const existing_user = await auth_model.findOne({ email });
    if (!existing_user) {
      return res
        .status(400)
        .json({ message: "User not found! Register Yourself first" });
    }

    const password_match = await bcrypt.compare(
      password,
      existing_user.password,
    );
    if (!password_match) {
      return res.status(400).json({ message: "Password Incorrect!" });
    }

    res.cookie("user_id", existing_user.id, {
      signed: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({ user: existing_user.id, message: "LogIn Success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

// get user profile
const get_profile = async (req, res) => {
  try {
    const user_id = await auth_model.findById(req.user_id);
    if (!user_id) {
      return res.status(400).json({ message: "User not found!" });
    }

    res.status(200).json({ user_name: user_id.user, email: user_id.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

const updateprofile = async (req, res) => {
  // validate first
  const { error } = update_schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { updatedName, updatedEmail, updatedPassword } = req.body;

  try {
    // find user
    const user = await auth_model.findById(req.user_id);
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // hash new password
    const hashed_password = await bcrypt.hash(updatedPassword, 10);

    // update user
    const updatedUser = await auth_model.findByIdAndUpdate(
      req.user_id,
      {
        user: updatedName,
        email: updatedEmail,
        password: hashed_password,
      },
      { new: true }, // return updated data
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

// logout
const logout = async (req, res) => {
  res.clearCookie("user_id", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  register_user,
  login_user,
  get_profile,
  logout,
  updateprofile,
};
