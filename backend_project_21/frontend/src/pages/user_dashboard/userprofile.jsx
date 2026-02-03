import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Edit_profile from "../../components/edit_profile";
import "../../style/userprofile.css";

function Userprofile() {
  const { loggedinuser, setloggedinuser } = useContext(AuthContext);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Gets the token from local storage
        const token = localStorage.getItem("token");
  
        if (!token) {
          setError("No token found. Please login first.");
          setTimeout(() => navigate("/"), 2000);
          return;
        }

        // Sends data as a req to this path firstly it verifies the identity
        const res = await axios.get("http://localhost:3000/auth/getuser", {
          headers: { authorization: `Bearer ${token}` },
        });

        setloggedinuser(res.data);
        setResponseMsg("Profile loaded successfully");
        setTimeout(() => setResponseMsg(""), 3000);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
        setTimeout(() => setError(""), 3000);
      } finally { // always runs
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

  const edit_author_details = () =>{
    // We send data via id to editprofile page / state is like an invisible bag it's like carrying information from one page to another
    navigate(`/editprofile/${loggedinuser._id}`, {state : { returnTo: "/userprofile" }});
  }
  
  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <div className="spinner-large"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-text">
              {loggedinuser?.username?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <h1 className="profile-title">Editor Dashboard</h1>
          <p className="profile-subtitle">
            Manage your account and preferences
          </p>
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

        <div className="profile-card">
          <h2 className="card-title">Profile Information</h2>
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
              <span className="role-badge role-user">
                {loggedinuser?.role || "user"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Account Status</span>
              <span className="status-badge status-active">Active</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-secondary" onClick={edit_author_details}>Edit Profile</button>
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

export default Userprofile;
