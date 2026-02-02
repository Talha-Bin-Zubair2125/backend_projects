import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/adminprofile.css";

function Adminprofile() {
  const { loggedinuser, setloggedinuser, users, setusers } =
    useContext(AuthContext);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login first.");
          setTimeout(() => navigate("/"), 2000);
          return;
        }

        const res = await axios.get("http://localhost:3000/auth/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setloggedinuser(res.data);
        setResponseMsg("Profile loaded successfully");
        setTimeout(() => setResponseMsg(""), 3000);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
        setTimeout(() => setError(""), 3000);
      }
    };
    fetchProfile();
  }, [setloggedinuser, navigate]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(
          "http://localhost:3000/auth/totaluser",
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setusers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [setusers]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setloggedinuser(null);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="loading-spinner">
          <div className="spinner-large"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-wrapper">
        <div className="admin-header">
          <div className="profile-avatar">
            <span className="avatar-text">
              {loggedinuser?.username?.charAt(0).toUpperCase() || "A"}
            </span>
          </div>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage users and system settings</p>
        </div>

        {responseMsg && (
          <div className="alert alert-success">
            <svg
              className="alert-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {responseMsg}
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <svg
              className="alert-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon-users">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Users</p>
              <p className="stat-value">{users?.length || 0}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-admin">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Admins</p>
              <p className="stat-value">
                {users?.filter((u) => u.role === "admin").length || 0}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-author">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Authors</p>
              <p className="stat-value">
                {users?.filter((u) => u.role === "author").length || 0}
              </p>
            </div>
          </div>

          {/* New Editor Card */}
          <div className="stat-card">
            <div className="stat-icon stat-icon-editor">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5zm0 7v-6m0 0L3 9m9 6l9-6"
                />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Editors</p>
              <p className="stat-value">
                {users?.filter((u) => u.role === "editor").length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <h2 className="card-title">Admin Profile</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">
                {loggedinuser?.username || "N/A"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{loggedinuser?.email || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Role</span>
              <span className="role-badge role-admin">
                {loggedinuser?.role || "admin"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Privileges</span>
              <span className="status-badge status-full">Full Access</span>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="users-card">
          <h2 className="card-title">User Management</h2>
          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id || user.email}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge role-${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn action-btn-edit">
                          Edit
                        </button>
                        <button className="action-btn action-btn-delete">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-danger" onClick={handleSignOut}>
            <svg
              className="btn-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Adminprofile;
