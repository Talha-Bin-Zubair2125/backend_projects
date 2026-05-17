import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylings/Reports.css";

function ViewReports() {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // filters
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedEmployee, setSelectedEmployee] = useState(""); // for detailed view
  const [activeTab, setActiveTab] = useState("summary"); // summary | detailed

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // fetch employees for dropdown
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/employees/getallemployees",
          { withCredentials: true }
        );
        setEmployees(res.data.employees || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  // fetch attendance by month
  const fetchReport = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:3000/api/admin/report/bymonth?month=${selectedMonth}&year=${selectedYear}`,
        { withCredentials: true }
      );
      setAttendance(res.data.attendance || []);
    } catch (err) {
      setError("Failed to fetch report data");
      console.error("Error fetching report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [selectedMonth, selectedYear]);

  // ── Summary Report — group by employee ──
  const getSummaryData = () => {
    const summary = {};

    attendance.forEach((record) => {
      const empId = record.employeeId?._id;
      if (!empId) return;

      if (!summary[empId]) {
        summary[empId] = {
          employeeID: record.employeeId?.employeeID,
          name: record.employeeId?.EmployeeName,
          salary: record.employeeId?.EmployeeSalary || 0,
          present: 0,
          late: 0,
          absent: 0,
          halfDay: 0,
          totalDeduction: 0,
        };
      }

      if (record.status === "present") summary[empId].present++;
      if (record.status === "late") summary[empId].late++;
      if (record.status === "absent") summary[empId].absent++;
      if (record.status === "half-day") summary[empId].halfDay++;
      summary[empId].totalDeduction += record.deduction || 0;
    });

    return Object.values(summary);
  };

  // ── Detailed Report — day by day for one employee ──
  const getDetailedData = () => {
    if (!selectedEmployee) return [];
    return attendance.filter(
      (r) => r.employeeId?._id === selectedEmployee
    );
  };

  const summaryData = getSummaryData();
  const detailedData = getDetailedData();

  const getStatusClass = (status) => {
    switch (status) {
      case "present": return "status-present";
      case "late": return "status-late";
      case "absent": return "status-absent";
      case "half-day": return "status-halfday";
      default: return "";
    }
  };

  return (
    <div className="reports-wrapper">

      {/* ── Back Button ── */}
      <button className="reports-back" onClick={() => navigate("/profile")}>
        ← Back to Dashboard
      </button>

      {/* ── Header ── */}
      <div className="reports-header">
        <div>
          <h1>Reports</h1>
          <p>Monthly attendance and salary summary</p>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="reports-error">
          <span>⚠</span> {error}
        </div>
      )}

      {/* ── Filters ── */}
      <div className="reports-filters">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="reports-select"
        >
          {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="reports-select"
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
        </select>

        <button className="btn-generate" onClick={fetchReport} disabled={loading}>
          {loading ? <span className="btn-spinner"></span> : "↻ Generate Report"}
        </button>
      </div>

      {/* ── Tabs ── */}
      <div className="reports-tabs">
        <button
          className={`tab-btn ${activeTab === "summary" ? "active" : ""}`}
          onClick={() => setActiveTab("summary")}
        >
          📊 Monthly Summary
        </button>
        <button
          className={`tab-btn ${activeTab === "detailed" ? "active" : ""}`}
          onClick={() => setActiveTab("detailed")}
        >
          📋 Detailed View
        </button>
      </div>

      {/* ── Summary Tab ── */}
      {activeTab === "summary" && (
        loading ? (
          <div className="reports-loading">
            <div className="loading-spinner"></div>
            <p>Generating report...</p>
          </div>
        ) : summaryData.length === 0 ? (
          <div className="reports-empty">
            <span>📊</span>
            <h3>No data for {months[selectedMonth - 1]} {selectedYear}</h3>
            <p>No attendance records found for this period</p>
          </div>
        ) : (
          <div className="reports-table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Present</th>
                  <th>Late</th>
                  <th>Half Day</th>
                  <th>Absent</th>
                  <th>Total Deduction</th>
                  <th>Base Salary</th>
                  <th>Final Salary</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.map((emp, index) => (
                  <tr key={index}>
                    <td className="td-index">{index + 1}</td>
                    <td className="td-id">{emp.employeeID}</td>
                    <td className="td-name">
                      <div className="emp-avatar">
                        {emp.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      {emp.name}
                    </td>
                    <td><span className="status-badge status-present">{emp.present}</span></td>
                    <td><span className="status-badge status-late">{emp.late}</span></td>
                    <td><span className="status-badge status-halfday">{emp.halfDay}</span></td>
                    <td><span className="status-badge status-absent">{emp.absent}</span></td>
                    <td className="td-deduction has-deduction">
                      -{emp.totalDeduction.toLocaleString()}
                    </td>
                    <td className="td-salary">
                      {emp.salary.toLocaleString()}
                    </td>
                    <td className="td-final-salary">
                      {(emp.salary - emp.totalDeduction).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}

      {/* ── Detailed Tab ── */}
      {activeTab === "detailed" && (
        <div>
          {/* Employee selector */}
          <div className="detailed-filter">
            <label>Select Employee:</label>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="reports-select"
            >
              <option value="">-- Select Employee --</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeID} - {emp.EmployeeName}
                </option>
              ))}
            </select>
          </div>

          {!selectedEmployee ? (
            <div className="reports-empty">
              <span>👤</span>
              <h3>Select an employee</h3>
              <p>Choose an employee to view their detailed attendance</p>
            </div>
          ) : detailedData.length === 0 ? (
            <div className="reports-empty">
              <span>📋</span>
              <h3>No records found</h3>
              <p>No attendance for this employee in {months[selectedMonth - 1]} {selectedYear}</p>
            </div>
          ) : (
            <div className="reports-table-wrapper">
              {/* Employee Summary Card */}
              <div className="detailed-summary-card">
                <div className="summary-item">
                  <h4>Total Days</h4>
                  <p>{detailedData.length}</p>
                </div>
                <div className="summary-item">
                  <h4>Present</h4>
                  <p className="text-green">{detailedData.filter(r => r.status === "present").length}</p>
                </div>
                <div className="summary-item">
                  <h4>Late</h4>
                  <p className="text-orange">{detailedData.filter(r => r.status === "late").length}</p>
                </div>
                <div className="summary-item">
                  <h4>Half Day</h4>
                  <p className="text-purple">{detailedData.filter(r => r.status === "half-day").length}</p>
                </div>
                <div className="summary-item">
                  <h4>Absent</h4>
                  <p className="text-red">{detailedData.filter(r => r.status === "absent").length}</p>
                </div>
                <div className="summary-item">
                  <h4>Total Deduction</h4>
                  <p className="text-red">-{detailedData.reduce((sum, r) => sum + (r.deduction || 0), 0).toLocaleString()}</p>
                </div>
              </div>

              <table className="reports-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Check In Time</th>
                    <th>Status</th>
                    <th>Deduction (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedData.map((record, index) => (
                    <tr key={record._id}>
                      <td className="td-index">{index + 1}</td>
                      <td>{new Date(record.date).toLocaleDateString("en-PK", {
                        weekday: "short", day: "numeric", month: "short"
                      })}</td>
                      <td>{new Date(record.checkInTime).toLocaleTimeString("en-PK", {
                        hour: "2-digit", minute: "2-digit"
                      })}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className={`td-deduction ${record.deduction > 0 ? "has-deduction" : ""}`}>
                        {record.deduction > 0 ? `-${record.deduction.toLocaleString()}` : "0"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default ViewReports;