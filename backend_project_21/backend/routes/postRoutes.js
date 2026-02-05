const express = require("express");
const router = express.Router();
const {
  create_post,
  edit_post,
  delete_post,
  get_posts,
  edit_draft,
  get_posts_by_id,
  reject_post,
  review_post,
  approve_post,
} = require("../controllers/postController");
const { protect } = require("../middlewares/authmiddleware");

router.post("/createpost", protect, create_post);
router.patch("/editpost/:id", protect, edit_post);
router.delete("/deletepost/:id", protect, delete_post);
router.get("/getposts", protect, get_posts);
router.get("/getpost/:id", protect, get_posts_by_id);
router.patch("/editdraft/:id", protect, edit_draft);
router.patch("/reject/:id", protect, reject_post);
router.patch("/reviewdraft/:id", protect, review_post);
router.patch("/approve/:id", protect, approve_post);
module.exports = router;
