const express = require("express");
const router = express.Router();
const {
  login_user,
  register_user,
  get_profile,
  totalusers,
  edit_user,
  get_profile_by_id,
  delete_user,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authmiddleware");

router.get("/", (req, res) => {
  res.send("Hey! There");
});

router.post("/register", register_user);
router.post("/login", login_user);
router.get("/getuser", protect, get_profile);
router.get("/getuser/:id",protect,get_profile_by_id);
router.get("/totaluser",protect,totalusers);
router.patch("/user/:id",protect,edit_user);
router.delete("/user/:id",protect,delete_user);


module.exports = router;
