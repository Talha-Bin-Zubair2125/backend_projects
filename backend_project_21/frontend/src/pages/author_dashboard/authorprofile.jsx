import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/authorprofile.css";

function Authorprofile() {
  const { loggedinuser, setloggedinuser } = useContext(AuthContext);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [setloggedinuser, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setloggedinuser(null);
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="author-container">
        <div className="loading-spinner">
          <div className="spinner-large"></div>
          <p>Loading author dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="author-container">
      <div className="author-wrapper">
        <div className="author-header">
          <div className="profile-avatar">
            <span className="avatar-text">
              {loggedinuser?.username?.charAt(0).toUpperCase() || "A"}
            </span>
          </div>
          <h1 className="author-title">Author Dashboard</h1>
          <p className="author-subtitle">Create and manage your content</p>
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

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon-posts">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <div className="stat-content">
              <p className="stat-label">Total Posts</p>
              <p className="stat-value">0</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon stat-icon-drafts">
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
              <p className="stat-label">Drafts</p>
              <p className="stat-value">0</p>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h2 className="card-title">Author Profile</h2>
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
              <span className="role-badge role-author">
                {loggedinuser?.role || "author"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className="status-badge status-active">Active</span>
            </div>
          </div>
        </div>

        <div className="quick-actions-card">
          <h2 className="card-title">Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-card">
              <div className="action-icon action-icon-new">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="action-title">New Post</h3>
              <p className="action-description">
                Create a new article or blog post
              </p>
            </button>

            <button className="action-card">
              <div className="action-icon action-icon-drafts">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="action-title">View Drafts</h3>
              <p className="action-description">
                Continue working on saved drafts
              </p>
            </button>

            <button className="action-card">
              <div className="action-icon action-icon-published">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="action-title">Published</h3>
              <p className="action-description">
                Manage your published content
              </p>
            </button>
          </div>
        </div>

        <div className="profile-actions">
          {/* <button className="btn btn-secondary">Edit Profile</button> */}
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

export default Authorprofile;
