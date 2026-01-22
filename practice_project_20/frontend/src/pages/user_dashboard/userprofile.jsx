import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Style/auth.css";

function Userprofile() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const { tasks, setTasks } = useContext(AuthContext);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        setTimeout(() => setResponseMsg(""), 3000);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
        setTimeout(() => setError(""), 3000);
      }
    };

    fetchProfile();
  }, [setAuthUser]);

  // Fetch all tasks
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(
          "http://localhost:3000/user/viewtask",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [setTasks]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const view_all_tasks = () => {
    navigate("/viewalltasks");
  };

  // Calculate task statistics
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status !== "Completed").length;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="profile-page-wrapper">
      {/* Dashboard Navbar */}
      <nav className="dashboard-navbar">
        <div className="dashboard-logo">Task Management System</div>
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
          <h1>Welcome back, {authUser?.name}! 👋</h1>
          <p>Here's what's happening with your tasks today</p>
        </div>

        {/* Messages */}
        {responseMsg && <p className="success-msg">{responseMsg}</p>}
        {error && <p className="error-msg">{error}</p>}

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Total Tasks Card */}
          <div className="dashboard-card">
            <h3>📊 Total Tasks</h3>
            <div className="card-stat-large">{totalTasks}</div>
            <p>All tasks in your workspace</p>
            <button onClick={view_all_tasks} className="view-users-btn">
              View All Tasks
            </button>
          </div>

          {/* Pending Tasks Card */}
          <div className="dashboard-card pending-card">
            <h3>⏳ Pending Tasks</h3>
            <div className="card-stat-large pending-stat">{pendingTasks}</div>
            <p>Tasks waiting to be completed</p>
            <div className="card-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill pending-fill" 
                  style={{ width: `${totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0}% of total
              </span>
            </div>
          </div>

          {/* Completed Tasks Card */}
          <div className="dashboard-card completed-card">
            <h3>✅ Completed Tasks</h3>
            <div className="card-stat-large completed-stat">{completedTasks}</div>
            <p>Tasks you've finished</p>
            <div className="card-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill completed-fill" 
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <span className="progress-text">{completionRate}% completion rate</span>
            </div>
          </div>

          {/* In Progress Tasks Card */}
          <div className="dashboard-card inprogress-card">
            <h3>🔄 In Progress</h3>
            <div className="card-stat-large inprogress-stat">{inProgressTasks}</div>
            <p>Tasks currently being worked on</p>
            <div className="quick-actions">
              <button onClick={view_all_tasks} className="quick-action-btn">
                View Details →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="summary-section">
          <div className="summary-card">
            <h3>📈 Your Progress</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Completion Rate</span>
                <span className="summary-value">{completionRate}%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Tasks Remaining</span>
                <span className="summary-value">{pendingTasks + inProgressTasks}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Tasks Completed</span>
                <span className="summary-value">{completedTasks}</span>
              </div>
            </div>
            {totalTasks === 0 ? (
              <p className="summary-message">Start by adding your first task!</p>
            ) : completedTasks === totalTasks ? (
              <p className="summary-message success-message">🎉 Congratulations! All tasks completed!</p>
            ) : (
              <p className="summary-message">Keep up the great work! You're making progress.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;