const express = require("express");
const router = express.Router();
const { adminLogin, UpdateAdminProfile, getAdminProfile, LogoutProfile} = require("../controllers/AdminController");
const { protect } = require("../middlewares/authMiddleware");

// Admin login route
router.post("/admin/login", adminLogin);
// Admin profile update route
router.put("/admin/updateprofile", protect ,UpdateAdminProfile);
// Admin logout route
router.post("/admin/logout",LogoutProfile);
// Get admin profile route
router.get("/admin/getprofile", protect, getAdminProfile);

module.exports = router;