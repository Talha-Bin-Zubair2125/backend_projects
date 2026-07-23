const express = require("express");
const {
  register_user,
  login_user,
  get_profile,
  logout,
  updateprofile,
} = require("../controllers/authcontroller");
const { protect } = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/register", register_user);
router.post("/login", login_user);
router.post("/logout", logout);
router.get("/profile", protect, get_profile);
router.put("/updateprofile", protect, updateprofile);

module.exports = router;
