import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/edit_profile.css";

function Delete_profile_admin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [focusedField, setFocusedField] = useState(null);

  const returnTo = location.state?.returnTo || "/dashboard";

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const res = await axios.get(`http://localhost:3000/auth/getuser/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        setAlert({ type: "error", message: "Failed to load profile data." });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, navigate]);

  const handleDelete = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert({ type: "", message: "" });
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/auth/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ type: "success", message: "Profile deleted successfully!" });
      setTimeout(() => navigate(returnTo), 1800);
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Deletion failed. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = () => (username ? username.charAt(0).toUpperCase() : "U");

  if (loading) {
    return (
      <div className="ep-loading-screen">
        <div className="ep-loader">
          <div className="ep-loader-ring"></div>
          <div className="ep-loader-ring"></div>
          <div className="ep-loader-ring"></div>
        </div>
        <p className="ep-loading-text">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="ep-container">
      <div className="ep-orb ep-orb-1"></div>
      <div className="ep-orb ep-orb-2"></div>
      <div className="ep-orb ep-orb-3"></div>

      <div className="ep-wrapper">
        {alert.message && (
          <div className={`ep-alert ep-alert-${alert.type}`}>
            <span>{alert.message}</span>
          </div>
        )}

        <div className="ep-header">
          <div className="ep-avatar-ring">
            <div className="ep-avatar">
              <span className="ep-avatar-initials">{getInitials()}</span>
            </div>
          </div>
          <h1 className="ep-title">Delete Profile</h1>
          <p className="ep-subtitle">Are you sure you want to delete this profile?</p>
        </div>

        <div className="ep-card">
          <form onSubmit={handleDelete} noValidate>
            <div className={`ep-field-group ${focusedField === "username" ? "ep-focused" : ""}`}>
              <label className="ep-label">Username</label>
              <input
                type="text"
                className="ep-input"
                value={username}
                disabled
              />
            </div>

            <div className={`ep-field-group ${focusedField === "email" ? "ep-focused" : ""}`}>
              <label className="ep-label">Email Address</label>
              <input
                type="email"
                className="ep-input"
                value={email}
                disabled
              />
            </div>

            <div className="ep-divider"></div>

            <div className="ep-actions">
              <button
                type="button"
                className="ep-btn ep-btn-cancel"
                onClick={() => navigate(returnTo)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ep-btn ep-btn-delete"
                disabled={submitting}
              >
                {submitting ? "Deleting..." : "Delete Profile"}
              </button>
            </div>
          </form>
        </div>

        <button className="ep-back-link" onClick={() => navigate(returnTo)}>
          &larr; Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Delete_profile_admin;
