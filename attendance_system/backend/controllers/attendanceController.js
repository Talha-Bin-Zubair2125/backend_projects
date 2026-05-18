const Attendance = require("../models/AttendanceModel");
const QR = require("../models/qrModel");
const Employee = require("../models/Employee_Model");
const Deduction = require("../models/deductionModel");

// Controller for marking attendance using QR code
const markAttendance = async (req, res) => {
    const { token, employeeID } = req.body;

    try {
        const activeQR = await QR.findOne({ token, isActive: true });
        if (!activeQR) {
            return res.status(400).json({ message: "Invalid QR code" });
        }

        if (new Date() > activeQR.expiresAt) {
            return res.status(400).json({ message: "QR code expired. Ask admin to refresh." });
        }

        const employee = await Employee.findOne({ employeeID });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const alreadyMarked = await Attendance.findOne({
            employeeId: employee._id,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (alreadyMarked) {
            return res.status(400).json({ message: "Attendance already marked for today" });
        }

        const settings = await Deduction.findOne();
        if (!settings) {
            return res.status(500).json({ message: "Deduction settings not configured" });
        }

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

        let status = "present";
        let deduction = 0;

        if (currentTime > settings.allowedHalfDayTime) {
            status = "half-day";
            deduction = settings.deductionPerHalfDay;
        } else if (currentTime > settings.lateArrivalTime) {
            status = "late";
            deduction = settings.deductionPerLate;
        }

        const attendance = await Attendance.create({
            employeeId: employee._id,
            date: new Date(),
            checkInTime: new Date(),
            status,
            month: now.getMonth() + 1,
            year: now.getFullYear(),
            deduction
        });

        res.status(201).json({
            message: `Attendance marked as ${status}`,
            attendance: {
                employeeName: employee.EmployeeName,
                status,
                checkInTime: attendance.checkInTime,
                deduction
            }
        });

    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).json({ message: "Server error marking attendance" });
    }
};

// Controller to get all attendance records (for admin)
const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate("employeeId", "EmployeeName employeeID EmployeeRole")
            .sort({ date: -1 });

        res.status(200).json({ attendance });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error fetching attendance" });
    }
};

// Controller to get attendance records for a specific employee by month and year
const getAttendanceByMonth = async (req, res) => {
    const { employeeID, month, year } = req.query;
    try {
        const employee = await Employee.findOne({ employeeID });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const records = await Attendance.find({ 
            employeeId: employee._id, 
            month: Number(month), 
            year: Number(year) 
        }).sort({ date: -1 });

        const registrationDate = employee.createdAt || employee.joiningDate || employee._id.getTimestamp();

        res.status(200).json({ 
            success: true,
            employeeCreatedAt: registrationDate, 
            records 
        });
        
    } catch (error) {
        console.error("Error fetching attendance history:", error);
        res.status(500).json({ message: "Server error fetching history data" });
    }
};

// Controller to check if employee has marked attendance today and get status
const getTodayAttendanceStatus = async (req, res) => {
    const { employeeID } = req.params;

    try {
        const employee = await Employee.findOne({ employeeID });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const attendance = await Attendance.findOne({
            employeeId: employee._id,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (attendance) {
            return res.status(200).json({ marked: true, status: attendance.status });
        } else {
            return res.status(200).json({ marked: false, status: "Not Marked" });
        }
    } catch (error) {
        console.error("Error checking today status:", error);
        res.status(500).json({ message: "Server error checking status" });
    }
};

module.exports = { 
    markAttendance, 
    getAllAttendance, 
    getAttendanceByMonth,
    getTodayAttendanceStatus 
};