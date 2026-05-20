const Attendance = require("../models/AttendanceModel");
const QR = require("../models/qrModel");
const Employee = require("../models/Employee_Model");
const Deduction = require("../models/deductionModel");

// ── Pakistan Time Helpers ──
const getPakistanTime = () => {
    const now = new Date();
    const pakistanOffset = 5 * 60;
    return new Date(now.getTime() + pakistanOffset * 60000);
};

const getPakistanDayRange = () => {
    const pkt = getPakistanTime();
    const pakistanOffsetMs = 5 * 60 * 60000;

    const startOfDayPKT = new Date(pkt);
    startOfDayPKT.setHours(0, 0, 0, 0);

    const endOfDayPKT = new Date(pkt);
    endOfDayPKT.setHours(23, 59, 59, 999);

    return {
        start: new Date(startOfDayPKT.getTime() - pakistanOffsetMs),
        end: new Date(endOfDayPKT.getTime() - pakistanOffsetMs),
        pktTime: pkt
    };
};

const getDayRangeForDate = (dateStr) => {
    const pakistanOffsetMs = 5 * 60 * 60000;
    const [year, month, day] = dateStr.split("-").map(Number);

    const startPKT = new Date(year, month - 1, day, 0, 0, 0, 0);
    const endPKT = new Date(year, month - 1, day, 23, 59, 59, 999);

    return {
        start: new Date(startPKT.getTime() - pakistanOffsetMs),
        end: new Date(endPKT.getTime() - pakistanOffsetMs),
    };
};

// ── Mark Attendance via QR ──
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

        const { start, end, pktTime } = getPakistanDayRange();

        const alreadyMarked = await Attendance.findOne({
            employeeId: employee._id,
            date: { $gte: start, $lte: end }
        });

        if (alreadyMarked) {
            return res.status(400).json({ message: "Attendance already marked for today" });
        }

        const settings = await Deduction.findOne();
        if (!settings) {
            return res.status(500).json({ message: "Deduction settings not configured" });
        }

        const currentTime = `${String(pktTime.getHours()).padStart(2, "0")}:${String(pktTime.getMinutes()).padStart(2, "0")}`;

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
            month: pktTime.getMonth() + 1,
            year: pktTime.getFullYear(),
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

// ── Get All Attendance (admin) ── ✅ added EmployeeJoiningDate
const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate("employeeId", "EmployeeName employeeID EmployeeRole EmployeeSalary EmployeeJoiningDate")
            .sort({ date: -1 });

        res.status(200).json({ attendance });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error fetching attendance" });
    }
};

// ── Get Attendance By Month (reports) ── ✅ added EmployeeJoiningDate
const getAttendanceByMonth = async (req, res) => {
    const { month, year } = req.query;
    try {
        const attendance = await Attendance.find({
            month: parseInt(month),
            year: parseInt(year)
        })
        .populate("employeeId", "EmployeeName employeeID EmployeeRole EmployeeSalary EmployeeJoiningDate")
        .sort({ date: -1 });

        res.status(200).json({ attendance });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ── Get Today Attendance Status (mobile) ──
const getTodayAttendanceStatus = async (req, res) => {
    const { employeeID } = req.params;

    try {
        const employee = await Employee.findOne({ employeeID });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const { start, end } = getPakistanDayRange();

        const attendance = await Attendance.findOne({
            employeeId: employee._id,
            date: { $gte: start, $lte: end }
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

// ── Backfill Absent for Specific Date ──
const backfillAbsentForDate = async (dateStr) => {
    const { start, end } = getDayRangeForDate(dateStr);
    const pakistanOffsetMs = 5 * 60 * 60000;
    const [year, month, day] = dateStr.split("-").map(Number);
    const targetDate = new Date(year, month - 1, day);
    const pktDate = new Date(targetDate.getTime() + pakistanOffsetMs);

    const allEmployees = await Employee.find();
    const settings = await Deduction.findOne();
    const deductionPerAbsence = settings?.deductionPerAbsence || 0;

    let absentCount = 0;

    for (const employee of allEmployees) {
        const marked = await Attendance.findOne({
            employeeId: employee._id,
            date: { $gte: start, $lte: end }
        });

        if (!marked) {
            await Attendance.create({
                employeeId: employee._id,
                date: targetDate,
                checkInTime: targetDate,
                status: "absent",
                deduction: deductionPerAbsence,
                month: pktDate.getMonth() + 1,
                year: pktDate.getFullYear()
            });
            absentCount++;
            console.log(`❌ Absent backfilled for: ${employee.EmployeeName} on ${dateStr}`);
        }
    }

    return absentCount;
};

module.exports = {
    markAttendance,
    getAllAttendance,
    getAttendanceByMonth,
    getTodayAttendanceStatus,
    backfillAbsentForDate
};