import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../stylings/ProfileScreen.css";

function ProfileScreen() {
  const { adminInfo, setAdminInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [totalEmployees, setTotalEmployees] = useState(0);

  // fetch total employees count for dashboard stat
  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/employees/getallemployees",
          { withCredentials: true }
        );
        setTotalEmployees(response.data.employees?.length || 0);
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };
    fetchEmployeeCount();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/admin/logout",
        {},
        { withCredentials: true }
      );
      console.log(response.data);
      setAdminInfo(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // helper to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="profile-wrapper">

      {/* ── Sidebar ── */}
      <aside className="profile-sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">A</div>
          <span>AttendX</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-link ${isActive("/profile") ? "active" : ""}`}
            onClick={() => navigate("/profile")}
          >
            <span className="sidebar-icon">⊞</span> Dashboard
          </button>

          {/* Employees section with sub links */}
          <button
            className={`sidebar-link ${isActive("/viewemployees") || isActive("/addemployee") ? "active" : ""}`}
            onClick={() => navigate("/viewemployees")}
          >
            <span className="sidebar-icon">👥</span> Employees
          </button>

          <div className="sidebar-sub">
            <button
              className={`sidebar-sublink ${isActive("/viewemployees") ? "active" : ""}`}
              onClick={() => navigate("/viewemployees")}
            >
              View All
            </button>
            <button
              className={`sidebar-sublink ${isActive("/addemployee") ? "active" : ""}`}
              onClick={() => navigate("/addemployee")}
            >
              Add New
            </button>
          </div>

          <button
            className={`sidebar-link ${isActive("/qr") ? "active" : ""}`}
            onClick={() => navigate("/qr")}
          >
            <span className="sidebar-icon">⊡</span> QR Code
          </button>

          <button
            className={`sidebar-link ${isActive("/attendance") ? "active" : ""}`}
            onClick={() => navigate("/attendance")}
          >
            <span className="sidebar-icon">📋</span> Attendance
          </button>

          <button
            className={`sidebar-link ${isActive("/reports") ? "active" : ""}`}
            onClick={() => navigate("/reports")}
          >
            <span className="sidebar-icon">📊</span> Reports
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button
            className={`sidebar-link ${isActive("/updateprofile") ? "active" : ""}`}
            onClick={() => navigate("/updateprofile")}
          >
            <span className="sidebar-icon">⚙</span> Settings
          </button>
          <button className="sidebar-logout" onClick={handleLogout}>
            <span className="sidebar-icon">→</span> Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="profile-main">

        {/* ── Top Bar ── */}
        <div className="profile-topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, <span>{adminInfo?.adminID || "Admin"}</span></p>
          </div>
          <div className="profile-avatar">
            {adminInfo?.adminID?.charAt(0) || "A"}
          </div>
        </div>

        {/* ── Stats Cards ── */}
        <div className="profile-stats">
          <div className="stat-card" onClick={() => navigate("/viewemployees")} style={{ cursor: "pointer" }}>
            <div className="stat-icon" style={{ background: "#eff6ff" }}>👥</div>
            <div>
              <h3>Total Employees</h3>
              <p>{totalEmployees}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#f0fdf4" }}>✅</div>
            <div>
              <h3>Present Today</h3>
              <p>0</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fff7ed" }}>⏰</div>
            <div>
              <h3>Late Today</h3>
              <p>0</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: "#fff1f2" }}>❌</div>
            <div>
              <h3>Absent Today</h3>
              <p>0</p>
            </div>
          </div>
        </div>

        {/* ── Quick Actions ── */}
        <div className="profile-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-card" onClick={() => navigate("/viewemployees")}>
              <span>👥</span>
              <p>View Employees</p>
            </button>
            <button className="action-card" onClick={() => navigate("/addemployee")}>
              <span>👤</span>
              <p>Add Employee</p>
            </button>
            <button className="action-card" onClick={() => navigate("/qr")}>
              <span>⊡</span>
              <p>Generate QR</p>
            </button>
            <button className="action-card" onClick={() => navigate("/attendance")}>
              <span>📋</span>
              <p>View Attendance</p>
            </button>
            <button className="action-card" onClick={() => navigate("/reports")}>
              <span>📊</span>
              <p>Generate Report</p>
            </button>
            <button className="action-card" onClick={() => navigate("/updateprofile")}>
              <span>⚙</span>
              <p>Settings</p>
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}

export default ProfileScreen;