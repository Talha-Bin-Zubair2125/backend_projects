const Attendance = require("../models/AttendanceModel");
const QR = require("../models/qrModel");
const Employee = require("../models/Employee_Model");
const Deduction = require("../models/deductionModel");

const markAttendance = async (req, res) => {
    const { token, employeeID } = req.body;

    try {
        // Step 1 — validate QR token
        const activeQR = await QR.findOne({ token, isActive: true });
        if (!activeQR) {
            return res.status(400).json({ message: "Invalid QR code" });
        }

        // Step 2 — check token not expired
        if (new Date() > activeQR.expiresAt) {
            return res.status(400).json({ message: "QR code expired. Ask admin to refresh." });
        }

        // Step 3 — find employee
        const employee = await Employee.findOne({ employeeID });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Step 4 — check already marked today
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

        // Step 5 — get deduction settings
        const settings = await Deduction.findOne();
        if (!settings) {
            return res.status(500).json({ message: "Deduction settings not configured" });
        }

        // Step 6 — determine status based on check in time
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

        let status = "present";
        let deduction = 0;

        if (currentTime > settings.allowedHalfDayTime) {
            // after half day time → half day
            status = "half-day";
            deduction = settings.deductionPerHalfDay;
        } else if (currentTime > settings.lateArrivalTime) {
            // after late arrival time → late
            status = "late";
            deduction = settings.deductionPerLate;
        }
        // before lateArrivalTime → present, deduction = 0

        // Step 7 — save attendance
        const attendance = await Attendance.create({
            employeeId: employee._id,
            date: new Date(),
            checkInTime: new Date(),
            status,
            deduction,
            month: now.getMonth() + 1,
            year: now.getFullYear()
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

// Get all attendance — for web app admin view
const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate("employeeId", "EmployeeName employeeID EmployeeRole")
            .sort({ date: -1 }); // newest first

        res.status(200).json({ attendance });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error fetching attendance" });
    }
};

// Get attendance by month — for reports
const getAttendanceByMonth = async (req, res) => {
    const { month, year } = req.query;
    try {
        const attendance = await Attendance.find({ month, year })
            .populate("employeeId", "EmployeeName employeeID EmployeeSalary")
            .sort({ date: -1 });

        res.status(200).json({ attendance });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { markAttendance, getAllAttendance, getAttendanceByMonth };