const Attendance = require("../models/AttendanceModel");
const QR = require("../models/qrModel");
const Employee = require("../models/Employee_Model");
const Deduction = require("../models/deductionModel");

// ── Pakistan Time Helpers ──
const getPakistanDayRange = () => {
    const now = new Date();
    const utcTimestamp = now.getTime() + (now.getTimezoneOffset() * 60000);
    const pktTime = new Date(utcTimestamp + (5 * 3600000)); // Hard locked to PKT (UTC+5)

    const yyyy = pktTime.getFullYear();
    const mm = String(pktTime.getMonth() + 1).padStart(2, "0");
    const dd = String(pktTime.getDate()).padStart(2, "0");

    const start = new Date(`${yyyy}-${mm}-${dd}T00:00:00.000Z`);
    const end = new Date(`${yyyy}-${mm}-${dd}T23:59:59.999Z`);

    return { start, end, pktTime };
};

const getDayRangeForDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const mm = String(month).padStart(2, "0");
    const dd = String(day).padStart(2, "0");

    const start = new Date(`${year}-${mm}-${dd}T00:00:00.000Z`);
    const end = new Date(`${year}-${mm}-${dd}T23:59:59.999Z`);

    return { start, end };
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

        const hours = pktTime.getHours();
        const minutes = pktTime.getMinutes();
        
        const currentTimeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

        let status = "present";
        let deduction = 0;

        if (currentTimeStr > settings.allowedHalfDayTime) {
            status = "half-day";
            deduction = settings.deductionPerHalfDay;
        } else if (currentTimeStr > settings.lateArrivalTime) {
            status = "late";
            deduction = settings.deductionPerLate;
        }

        const dynamicPKTDate = new Date(pktTime.getTime());

        const attendance = await Attendance.create({
            employeeId: employee._id,
            date: dynamicPKTDate, 
            checkInTime: dynamicPKTDate, // Schema safety verified
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

// ── Get All Attendance (admin) ──
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

// ── Get Attendance By Month (reports) ──
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
    const [year, month, day] = dateStr.split("-").map(Number);
    const mm = String(month).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    
    const targetDateISO = new Date(`${year}-${mm}-${dd}T00:00:00.000Z`);

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
                date: targetDateISO,
                checkInTime: targetDateISO,
                status: "absent",
                deduction: deductionPerAbsence,
                month: month,
                year: year
            });
            absentCount++;
            console.log(`Absent backfilled for: ${employee.EmployeeName} on ${dateStr}`);
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