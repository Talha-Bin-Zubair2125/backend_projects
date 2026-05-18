const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const attendanceController = require("../controllers/attendanceController");
const employeeController = require("../controllers/employeeController");


const markAttendance = attendanceController.markAttendance || ((req, res) => res.send("Mark Attendance Working"));
const getAllAttendance = attendanceController.getAllAttendance || ((req, res) => res.send("Get All Working"));
const getAttendanceByMonth = attendanceController.getAttendanceByMonth || ((req, res) => res.send("By Month Working"));
const getTodayAttendanceStatus = attendanceController.getTodayAttendanceStatus || ((req, res) => res.send("Today Status Working"));

// Mobile App Link Endpoint
router.post("/mark", markAttendance);

// Web Admin Analytics & Report Routes
router.get("/attendance/getall", protect, getAllAttendance);

router.get("/report/bymonth", getAttendanceByMonth); 
router.get("/attendance/status/:employeeID", getTodayAttendanceStatus);
router.post("/employees/change-password", employeeController.changePassword);
module.exports = router;