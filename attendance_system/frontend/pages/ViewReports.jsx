import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 
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

  // fetch employees for dropdown and salary reference
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

  // Fetch ALL attendance and filter by Month/Year locally
  const fetchReport = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:3000/api/admin/attendance/getall`,
        { withCredentials: true }
      );

      const allRecords = res.data.attendance || res.data || [];

      const filteredData = allRecords.filter((record) => {
        if (!record.date) return false;
        const recordDate = new Date(record.date);
        return (
          recordDate.getMonth() + 1 === selectedMonth &&
          recordDate.getFullYear() === selectedYear
        );
      });

      setAttendance(filteredData);
    } catch (err) {
      setError("Failed to fetch report data. Please check connection.");
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
      const empId = record.employeeId?._id || record.employeeID;
      if (!empId) return;

      const empDetails = employees.find(e => e._id === empId) || {};

      if (!summary[empId]) {
        summary[empId] = {
          employeeID: record.employeeId?.employeeID || empDetails.employeeID || "Unknown",
          name: record.employeeId?.EmployeeName || empDetails.EmployeeName || "Unknown",
          salary: Number(empDetails.salary || empDetails.EmployeeSalary || record.employeeId?.salary || record.employeeId?.EmployeeSalary || 0),
          present: 0,
          late: 0,
          absent: 0,
          halfDay: 0,
          totalDeduction: 0,
        };
      }

      const status = record.status ? record.status.toString().toLowerCase().trim() : "";
      if (status === "present" || status === "on time") summary[empId].present++;
      if (status === "late") summary[empId].late++;
      if (status === "absent") summary[empId].absent++;
      if (status === "half-day" || status === "halfday") summary[empId].halfDay++;
      summary[empId].totalDeduction += record.deduction || 0;
    });

    return Object.values(summary);
  };

  const getDetailedData = () => {
    if (!selectedEmployee) return [];
    return attendance.filter(
      (r) => r.employeeId?._id === selectedEmployee || r.employeeID === selectedEmployee
    );
  };

  const summaryData = getSummaryData();
  const detailedData = getDetailedData();

  const getStatusClass = (status) => {
    const s = status ? status.toString().toLowerCase().trim() : "";
    switch (s) {
      case "present":
      case "on time": return "status-present";
      case "late": return "status-late";
      case "absent": return "status-absent";
      case "half-day":
      case "halfday": return "status-halfday";
      default: return "";
    }
  };

  //  CRASH-PROOF PDF GENERATOR WITH VITE & LIVE DETAILED SALARY SUMMARY SUPPORT
  const handleDownloadPDF = () => {
    try {
      console.log("Starting PDF generation process...");
      const doc = new jsPDF();
      const monthName = months[selectedMonth - 1] || "Report";

      if (activeTab === "summary") {
        if (summaryData.length === 0) {
          alert("No data available to print!");
          return;
        }

        doc.setFontSize(16);
        doc.text(`FirmTrack - Monthly Summary Report`, 14, 15);
        doc.setFontSize(12);
        doc.text(`Month: ${monthName} ${selectedYear}`, 14, 22);

        const tableColumn = ["#", "Emp ID", "Name", "Present", "Late", "Half Day", "Absent", "Deduction", "Base Salary", "Final Salary"];
        const tableRows = [];

        summaryData.forEach((emp, index) => {
          const recordData = [
            index + 1,
            emp.employeeID || "N/A",
            emp.name || "Unknown",
            emp.present,
            emp.late,
            emp.halfDay,
            emp.absent,
            `-${(emp.totalDeduction || 0).toLocaleString()}`,
            (emp.salary || 0).toLocaleString(),
            ((emp.salary || 0) - (emp.totalDeduction || 0)).toLocaleString()
          ];
          tableRows.push(recordData);
        });

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 28,
          theme: 'grid',
          headStyles: { fillColor: [33, 37, 41] },
        });

        doc.save(`Summary_Report_${monthName}_${selectedYear}.pdf`);
        console.log("Summary PDF Downloaded Successfully!");

      } else {
        if (!selectedEmployee) {
          alert("Please select an employee first!");
          return;
        }
        if (detailedData.length === 0) {
          alert("No detailed records found for this employee to print!");
          return;
        }
        
        const empDetails = employees.find(e => e._id === selectedEmployee) || {};
        const empName = empDetails.EmployeeName || "Employee";
        const empIdText = empDetails.employeeID || "";

        // Calculate metrics for PDF header
        const baseSalaryDetailed = Number(empDetails.salary || empDetails.EmployeeSalary || 0);
        const totalDeductionDetailed = detailedData.reduce((sum, r) => sum + (r.deduction || 0), 0);
        const finalSalaryDetailed = baseSalaryDetailed - totalDeductionDetailed;

        doc.setFontSize(16);
        doc.text(`FirmTrack - Detailed Attendance Report`, 14, 15);
        doc.setFontSize(11);
        doc.text(`Employee: ${empName} (${empIdText})`, 14, 23);
        doc.text(`Month: ${monthName} ${selectedYear}`, 14, 29);
        
        // ADDED SALARY METRICS IN DETAILED PDF HEADER TOO
        doc.text(`Base Salary: PKR ${baseSalaryDetailed.toLocaleString()}`, 120, 23);
        doc.text(`Final Net Salary: PKR ${finalSalaryDetailed.toLocaleString()}`, 120, 29);

        const tableColumn = ["#", "Date", "Check In Time", "Status", "Deduction (PKR)"];
        const tableRows = [];

        detailedData.forEach((record, index) => {
          let dateStr = "N/A";
          if (record.date) {
            dateStr = new Date(record.date).toLocaleDateString("en-PK", { weekday: "short", day: "numeric", month: "short" });
          }

          let timeStr = "N/A";
          if (record.checkInTime) {
            timeStr = new Date(record.checkInTime).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" });
          }
          
          const recordData = [
            index + 1,
            dateStr,
            timeStr,
            record.status || "N/A",
            record.deduction > 0 ? `-${record.deduction.toLocaleString()}` : "0"
          ];
          tableRows.push(recordData);
        });

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 36,
          theme: 'grid',
          headStyles: { fillColor: [33, 37, 41] },
        });

        doc.save(`Detailed_Report_${empName.replace(/\s+/g, '_')}_${monthName}_${selectedYear}.pdf`);
        console.log("Detailed PDF Downloaded Successfully!");
      }
    } catch (pdfError) {
      console.error("CRITICAL ERROR DURING PDF GENERATION:", pdfError);
      alert("PDF generation failed. Please check browser console.");
    }
  };

  // Pre-calculate Detailed Salary values safely for layout usage
  const currentDetailedEmp = employees.find(e => e._id === selectedEmployee) || {};
  const baseSalaryDetailed = Number(currentDetailedEmp.salary || currentDetailedEmp.EmployeeSalary || 0);
  const totalDeductionDetailed = detailedData.reduce((sum, r) => sum + (r.deduction || 0), 0);
  const finalSalaryDetailed = baseSalaryDetailed - totalDeductionDetailed;

  return (
    <div className="reports-wrapper">

      {/* Back Button */}
      <button className="reports-back" onClick={() => navigate("/profile")}>
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div className="reports-header">
        <div>
          <h1>Reports</h1>
          <p>Monthly attendance and salary summary</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="reports-error">
          <span>⚠</span> {error}
        </div>
      )}

      {/* Filters & Action Buttons */}
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
          disabled={loading}
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
        </select>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button className="btn-generate" onClick={fetchReport} disabled={loading}>
            {loading ? <span className="btn-spinner"></span> : "↻ Generate Report"}
          </button>
          
          <button 
            className="btn-generate" 
            style={{ backgroundColor: "#2e7d32", cursor: "pointer" }}
            onClick={handleDownloadPDF} 
            disabled={loading}
          >
            📥 Download PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
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

      {/* Summary Tab */}
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
                        {(emp.name && emp.name.length > 0) ? emp.name.charAt(0).toUpperCase() : "?"}
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

      {/* Detailed Tab */}
      {activeTab === "detailed" && (
        <div>
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
              <div className="detailed-summary-card">
                <div className="summary-item">
                  <h4>Total Days</h4>
                  <p>{detailedData.length}</p>
                </div>
                <div className="summary-item">
                  <h4>Present</h4>
                  <p className="text-green">{detailedData.filter(r => r.status?.toLowerCase() === "present" || r.status?.toLowerCase() === "on time").length}</p>
                </div>
                <div className="summary-item">
                  <h4>Late</h4>
                  <p className="text-orange">{detailedData.filter(r => r.status?.toLowerCase() === "late").length}</p>
                </div>
                <div className="summary-item">
                  <h4>Half Day</h4>
                  <p className="text-purple">{detailedData.filter(r => r.status?.toLowerCase() === "half-day" || r.status?.toLowerCase() === "halfday").length}</p>
                </div>
                <div className="summary-item">
                  <h4>Absent</h4>
                  <p className="text-red">{detailedData.filter(r => r.status?.toLowerCase() === "absent").length}</p>
                </div>
                <div className="summary-item">
                  <h4>Total Deduction</h4>
                  <p className="text-red">-{totalDeductionDetailed.toLocaleString()}</p>
                </div>
                
                {/* 🔥 NAYE COLUMNS (CARDS) ADDED HERE PERFECTLY */}
                <div className="summary-item">
                  <h4>Base Salary</h4>
                  <p style={{ color: "#212529", fontWeight: "bold" }}>Rs. {baseSalaryDetailed.toLocaleString()}</p>
                </div>
                <div className="summary-item">
                  <h4>Final Salary</h4>
                  <p style={{ color: "green", fontWeight: "bold" }}>Rs. {finalSalaryDetailed.toLocaleString()}</p>
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
                      <td>{record.date ? new Date(record.date).toLocaleDateString("en-PK", { weekday: "short", day: "numeric", month: "short" }) : "N/A"}</td>
                      <td>{record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" }) : "N/A"}</td>
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