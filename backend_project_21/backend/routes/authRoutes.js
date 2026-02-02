const express = require("express");
const router = express.Router();
const {
  login_user,
  register_user,
  get_profile,
  totalusers
} = require("../controllers/authController");
const { protect } = require("../middlewares/authmiddleware");

router.get("/", (req, res) => {
  res.send("Hey! There");
});

router.post("/register", register_user);
router.post("/login", login_user);
router.get("/getuser", protect, get_profile);
router.get("/totaluser",protect,totalusers)

module.exports = router;
