import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import "../stylings/profile.css";

function Getprofile() {
  const { user, setuser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPassword, setupdatedPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const profile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/profile", {
          withCredentials: true,
        });
        console.log(response.data);
        setuser(response.data);
        setUpdatedName(response.data?.user_name || "");
        setUpdatedEmail(response.data?.email || "");
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    profile();
  }, []);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/auth/logout",
        {},
        { withCredentials: true },
      );
      setuser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/auth/updateprofile",
        {
          updatedName,
          updatedEmail,
          updatedPassword,
          confirmPassword,
        },
        { withCredentials: true },
      );
      console.log(res.data);
      setuser((prev) => ({
        ...prev,
        user_name: updatedName,
        email: updatedEmail,
      }));
      setIsEditing(false);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <div className="profile-wrapper">
      {/* Brand heading */}
      <div className="auth-brand">
        <span className="auth-brand-name">AuthSystem</span>
        <span className="auth-brand-tagline">Secure · Simple · Fast</span>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.user_name?.charAt(0).toUpperCase() || "U"}
          </div>
          <span className="profile-tag">Your Profile</span>
          <h2>Welcome, {user?.user_name || "User"}</h2>
        </div>

        <div className="profile-info">
          {isEditing ? (
            <>
              <div className="profile-info-row">
                <span className="info-label">Name</span>
                <input
                  className="profile-edit-input"
                  type="text"
                  value={updatedName}
                  placeholder="Enter your name"
                  onChange={(e) => setUpdatedName(e.target.value)}
                />
              </div>
              <div className="profile-info-row">
                <span className="info-label">Email</span>
                <input
                  className="profile-edit-input"
                  type="text"
                  value={updatedEmail}
                  placeholder="you@example.com"
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                />
              </div>
              <div className="profile-info-row">
                <span className="info-label">New Password</span>
                <input
                  className="profile-edit-input"
                  type="password"
                  value={updatedPassword}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  onChange={(e) => setupdatedPassword(e.target.value)}
                />
              </div>

              <div className="profile-info-row">
                <span className="info-label">Confirm Password</span>
                <input
                  className="profile-edit-input"
                  type="password"
                  value={confirmPassword}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="profile-info-row">
                <span className="info-label">Name</span>
                <span className="info-value">{user?.user_name}</span>
              </div>
              <div className="profile-info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{user?.email}</span>
              </div>
            </>
          )}
        </div>

        <div className="profile-footer">
          {isEditing ? (
            <>
              <button className="update-btn" onClick={handleUpdate}>
                Save Changes
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="update-btn" onClick={() => setIsEditing(true)}>
              Update Profile
            </button>
          )}
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Getprofile;
