const express = require("express");
const router = express.Router();
const { markAttendance, getAllAttendance, getAttendanceByMonth } = require("../controllers/attendanceController");
const { protect } = require("../middlewares/authMiddleware");

// mobile app 
router.post("/mark", markAttendance);

router.get("attendance/getall", protect, getAllAttendance);
router.get("report/bymonth", protect, getAttendanceByMonth);

module.exports = router;