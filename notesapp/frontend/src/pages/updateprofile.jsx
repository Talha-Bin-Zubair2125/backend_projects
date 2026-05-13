import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/updateprofile.css";

function Updateprofile() {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const updateProfile = async (e) => {
    e.preventDefault();

    const data = { updatedName, updatedEmail, updatedPassword, confirmPassword };

    try {
      const response = await axios.put(
        "http://localhost:3000/api/auth/updateprofile",
        data,
        { withCredentials: true }
      );
      navigate("/profile");
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="update-wrapper">

      {/* ── Hero Banner ── */}
      <div className="update-hero">
        <div className="app-badge">
          <span className="dot"></span>Notes App
        </div>
        <h1>Update your <span>profile.</span></h1>
        <div className="hero-divider"></div>
        <p>Keep your information up to date. Changes will be saved securely.</p>
      </div>

      {/* ── Update Card ── */}
      <div className="update-content">
        <div className="update-card">

          <div className="update-card-header">
            <span className="tag">Account settings</span>
            <h2>Edit your details</h2>
          </div>

          <form className="update-form" onSubmit={updateProfile}>

            <div className="update-field">
              <label>Full name</label>
              <input
                type="text"
                placeholder="Enter new name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>

            <div className="update-field">
              <label>Email address</label>
              <input
                type="email"
                placeholder="Enter new email"
                value={updatedEmail}
                autoComplete="new-email"
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </div>

            <div className="update-field">
              <label>New password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={updatedPassword}
                autoComplete="new-password"
                onChange={(e) => setUpdatedPassword(e.target.value)}
              />
            </div>

            <div className="update-field">
              <label>Confirm new password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="update-btn-row">
              <button type="submit" className="btn-save">
                Save Changes
              </button>
              <button
                type="button"
                className="btn-back"
                onClick={() => navigate("/profile")}
              >
                Back
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}

export default Updateprofile;