import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/userprofile.css";

function User_profile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            withCredentials: true,
          },
        );
        setUser(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch profile:",
          error.response ? error.response.data : error.message,
        );
      }
    };
    fetchProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true },
      );
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleUpdate = () => {
    navigate("/updateprofile"); // adjust route as needed
  };

  // Generate avatar initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="profile-wrapper">
      {/* ── Hero Banner ── */}
      <div className="profile-hero">
        <div className="app-badge">
          <span className="dot"></span>Notes App
        </div>
        <h1>
          Your thoughts,
          <br />
          <span>organized.</span>
        </h1>
        <div className="hero-divider"></div>
        <p>
          Capture ideas, manage tasks, and stay focused — all in one place.
          Simple, fast, and always in sync.
        </p>
      </div>

      {/* ── Profile Card ── */}
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-card-inner">
            {/* Left: Avatar + Name */}
            <div className="profile-identity">
              <div className="profile-avatar">
                {getInitials(user?.username || user?.name)}
              </div>
              <div className="profile-name-block">
                <span className="label">Logged in as</span>
                <h2>{user?.username || user?.name || "User"}</h2>
                <span className="profile-email">{user?.email || "—"}</span>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="profile-actions">
              <button className="btn-update" onClick={handleUpdate}>
                Update Profile
              </button>
              <button className="btn-signout" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>

          <div className="profile-card-divider"></div>

          {/* Info Row */}
          <div className="profile-info-row">
            <div className="profile-info-item">
              <span className="info-label">Username</span>
              <span className="info-value">{user?.username || "—"}</span>
            </div>
            <div className="profile-info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user?.email || "—"}</span>
            </div>
            <button
              className="btn-addnote"
              onClick={() => navigate("/addnotes")}
            >
              Add Note
            </button>
            <button
              className="btn-getnotes"
              onClick={() => navigate("/getnotes")}
            >
              View Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User_profile;
