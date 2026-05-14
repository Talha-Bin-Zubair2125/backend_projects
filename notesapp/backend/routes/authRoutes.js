const express = require("express");
const Router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  register,
  login,
  getProfile,
  Logout,
  updateProfile,
} = require("../controllers/authController");

// Routes
Router.post("/register", register);
Router.post("/login", login);
Router.get("/profile", protect, getProfile);
Router.post("/logout", protect, Logout);
Router.put("/updateprofile", protect, updateProfile);

module.exports = Router;
