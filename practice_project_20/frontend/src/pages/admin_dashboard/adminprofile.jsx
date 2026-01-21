import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Style/auth.css";

function Adminprofile() {
  const { authUser, users, setAuthUser, setUsers } = useContext(AuthContext);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login first.");
          return;
        }

        const res = await axios.get("http://localhost:3000/auth/getuser", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAuthUser(res.data);
        setResponseMsg("Profile loaded successfully");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [setAuthUser]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(
          "http://localhost:3000/admin/getusers",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [setUsers]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const viewUsers = () => navigate("/viewusers");
  const createTask = () => navigate("/createtask");

  return (
    <div className="profile-page-wrapper">
      {/* Dashboard Navbar */}
      <nav className="dashboard-navbar">
        <div className="dashboard-logo">Admin Dashboard</div>
        <div className="dashboard-user-section">
          {authUser && <span className="user-name">{authUser.name}</span>}
          <button onClick={handleSignOut} className="signout-btn">
            Sign Out
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        {/* Welcome Section */}
        <div className="dashboard-welcome">
          <h1>Welcome Admin, {authUser?.name}! 🛡️</h1>
          <p>Manage your system and monitor all activities</p>
        </div>

        {/* Messages */}
        {responseMsg && <p className="success-msg">{responseMsg}</p>}
        {error && <p className="error-msg">{error}</p>}

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>👥 Total Users ({users.length})</h3>
            <p>
              Manage all registered users and their activities in the system.
            </p>
            <button onClick={viewUsers} className="view-users-btn">
              View Users
            </button>
          </div>

          <div className="dashboard-card">
            <h3>📝 Task Management</h3>
            <p>
              Create and manage all tasks assigned to users across the platform.
            </p>
            <button onClick={createTask} className="view-users-btn">
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminprofile;
