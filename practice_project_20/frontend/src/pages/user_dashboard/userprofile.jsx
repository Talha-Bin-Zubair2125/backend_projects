import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Style/auth.css";

function Userprofile() {
  const { authUser, setAuthUser } = useContext(AuthContext);
  //const { user, setUser } = useContext(AuthContext);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // get JWT token from localStorage
        if (!token) {
          setError("No token found. Please login first.");
          return;
        }

        /*
          Bearer" is a type of authorization scheme used in HTTP headers to tell the server:
          'Here is a token, and whoever bears it (has it) is allowed access.'
        */

        const res = await axios.get("http://localhost:3000/auth/getuser", {
          headers: { Authorization: `Bearer ${token}` }, // Bearer token
        });
        
        console.log(res.data);

        setAuthUser(res.data);

        setResponseMsg("Profile loaded successfully");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [setAuthUser]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
          <div className="dashboard-card">
            <h3>Total Tasks</h3>
            <p>
              You have 0 tasks in your workspace. Start adding tasks to stay
              organized!
            </p>
          </div>
          <div className="dashboard-card">
            <h3>Completed</h3>
            <p>Great job! Keep up the momentum and complete more tasks.</p>
          </div>
          <div className="dashboard-card">
            <h3>Pending</h3>
            <p>Stay focused on your pending tasks to meet your goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
