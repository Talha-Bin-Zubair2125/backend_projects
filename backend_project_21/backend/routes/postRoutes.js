const express = require("express");
const router = express.Router();
const {
  create_post,
  edit_post,
  delete_post,
  get_posts,
} = require("../controllers/postController");
const { protect } = require("../middlewares/authmiddleware");

router.post("/createpost", protect, create_post);
router.patch("/editpost/:id", protect, edit_post);
router.delete("/deletepost/:id", protect, delete_post);
router.get("/getposts", get_posts);

module.exports = router;
