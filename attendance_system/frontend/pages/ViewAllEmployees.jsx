import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylings/ViewAllEmployees.css";

function ViewAllEmployees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/employees/getallemployees",
        { withCredentials: true }
      );
      setEmployees(response.data.employees);
    } catch (error) {
      setError("Failed to fetch employees. Please try again.");
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  // delete employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/admin/employees/deleteemployee/${id}`,
        { withCredentials: true }
      );
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      setDeleteId(null);
      setSuccess("Employee deleted successfully!");
      setTimeout(() => setSuccess(""), 3000); // auto hide after 3s
    } catch (error) {
      setError("Failed to delete employee. Please try again.");
      setDeleteId(null);
      console.error("Error deleting employee:", error);
    }
  };

  // filter employees by search
  const filtered = employees.filter(
    (emp) =>
      emp.EmployeeName?.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeID?.toLowerCase().includes(search.toLowerCase()) ||
      emp.EmployeeRole?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="employees-wrapper">

      {/* ── Back Button ── */}
      <button className="employees-back" onClick={() => navigate("/profile")}>
        ← Back to Dashboard
      </button>

      {/* ── Header ── */}
      <div className="employees-header">
        <div>
          <h1>Employees</h1>
          <p><span>{employees.length}</span> total records</p>
        </div>
        <button
          className="btn-add-employee"
          onClick={() => navigate("/addemployee")}
        >
          + Add Employee
        </button>
      </div>

      {/* ── Notifications ── */}
      {error && (
        <div className="employees-notification error" onClick={() => setError("")}>
          <span>⚠</span> {error}
          <button className="notif-close">✕</button>
        </div>
      )}
      {success && (
        <div className="employees-notification success" onClick={() => setSuccess("")}>
          <span>✓</span> {success}
          <button className="notif-close">✕</button>
        </div>
      )}

      {/* ── Search ── */}
      <div className="employees-search">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search by name, ID or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch("")}>✕</button>
        )}
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div className="employees-loading">
          <div className="loading-spinner"></div>
          <p>Loading employees...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="employees-empty">
          <span>👥</span>
          <h3>No employees found</h3>
          <p>{search ? "Try a different search term" : "Add your first employee to get started"}</p>
          {!search && (
            <button onClick={() => navigate("/addemployee")}>+ Add Employee</button>
          )}
        </div>
      ) : (
        <div className="employees-table-wrapper">
          <table className="employees-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Salary (PKR)</th>
                <th>Joining Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, index) => (
                <tr key={emp._id}>
                  <td className="td-index">{index + 1}</td>
                  <td className="td-id">{emp.employeeID}</td>
                  <td className="td-name">
                    <div className="employee-avatar">
                      {emp.EmployeeName?.charAt(0).toUpperCase() || "?"}
                    </div>
                    {emp.EmployeeName}
                  </td>
                  <td>{emp.EmployeeEmail}</td>
                  <td>{emp.EmployeePhone}</td>
                  <td>
                    <span className="role-badge">{emp.EmployeeRole}</span>
                  </td>
                  <td className="td-salary">
                    {emp.EmployeeSalary ? Number(emp.EmployeeSalary).toLocaleString() : "—"}
                  </td>
                  <td>
                    {emp.EmployeeJoiningDate
                      ? new Date(emp.EmployeeJoiningDate).toLocaleDateString("en-PK")
                      : "—"}
                  </td>
                  <td className="td-actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/editemployee/${emp._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => setDeleteId(emp._id)} 
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Confirm Delete Dialog ── */}
      {deleteId && (
        <div className="delete-overlay" onClick={() => setDeleteId(null)}>
          <div className="delete-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="delete-icon">🗑</div>
            <h3>Delete Employee?</h3>
            <p>This action cannot be undone. The employee record will be permanently removed.</p>
            <div className="delete-btn-row">
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={() => handleDelete(deleteId)}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ViewAllEmployees;