import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/delete_profile.css";

function Edit_profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  // uselocation() is a React Router hook that gives you information about the current page you're on. It returns an object
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const returnTo = location.state?.returnTo;
  console.log(returnTo);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3000/auth/getuser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert({ type: "", message: "" });

    const token = localStorage.getItem("token");

    try {
      await axios.patch(
        `http://localhost:3000/auth/user/${id}`,
        { username, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setAlert({ type: "success", message: "Profile updated successfully!" });
      setTimeout(() => navigate(returnTo), 1800);
    } catch (err) {
      setAlert({
        type: "error",
        message:
          err.response?.data?.message || "Update failed. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = () => {
    return username ? username.charAt(0).toUpperCase() : "U";
  };

  /* ── Loading Screen ── */
  if (loading) {
    return (
      <div className="ep-loading-screen">
        <div className="ep-loader">
          <div className="ep-loader-ring"></div>
          <div className="ep-loader-ring"></div>
          <div className="ep-loader-ring"></div>
        </div>
        <p className="ep-loading-text">Loading your profile...</p>
      </div>
    );
  }

  /* ── Main Render ── */
  return (
    <div className="ep-container">
      {/* Floating background orbs */}
      <div className="ep-orb ep-orb-1"></div>
      <div className="ep-orb ep-orb-2"></div>
      <div className="ep-orb ep-orb-3"></div>

      <div className="ep-wrapper">
        {/* Alert Banner */}
        {alert.message && (
          <div className={`ep-alert ep-alert-${alert.type}`}>
            <svg
              className="ep-alert-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {alert.type === "success" ? (
                <>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </>
              ) : (
                <>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </>
              )}
            </svg>
            <span>{alert.message}</span>
          </div>
        )}

        {/* Header */}
        <div className="ep-header">
          <div className="ep-avatar-ring">
            <div className="ep-avatar">
              <span className="ep-avatar-initials">{getInitials()}</span>
            </div>
          </div>
          <h1 className="ep-title">Edit Profile</h1>
          <p className="ep-subtitle">Update your personal information below</p>
        </div>

        {/* Form Card */}
        <div className="ep-card">
          <form onSubmit={handleUpdate} noValidate>
            {/* Username Field */}
            <div
              className={`ep-field-group ${focusedField === "username" ? "ep-focused" : ""}`}
            >
              <label className="ep-label">
                <svg
                  className="ep-label-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="8" r="4" />
                </svg>
                Username
              </label>
              <div className="ep-input-wrapper">
                <input
                  type="text"
                  className="ep-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your username"
                  autoComplete="username"
                />
                {username && (
                  <span className="ep-input-check">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div
              className={`ep-field-group ${focusedField === "email" ? "ep-focused" : ""}`}
            >
              <label className="ep-label">
                <svg
                  className="ep-label-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Email Address
              </label>
              <div className="ep-input-wrapper">
                <input
                  type="email"
                  className="ep-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                {email && (
                  <span className="ep-input-check">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div
              className={`ep-field-group ${focusedField === "password" ? "ep-focused" : ""}`}
            >
              <label className="ep-label">
                <svg
                  className="ep-label-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                New Password
              </label>
              <div className="ep-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="ep-input ep-input-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter new password (optional)"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="ep-toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              <p className="ep-hint">
                Leave blank to keep your current password
              </p>
            </div>

            {/* Divider */}
            <div className="ep-divider">
              <span className="ep-divider-line"></span>
            </div>

            {/* Action Buttons */}
            <div className="ep-actions">
              <button
                type="button"
                className="ep-btn ep-btn-cancel"
                onClick={() => navigate(returnTo)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                className="ep-btn ep-btn-submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="ep-btn-spinner"></span> Saving...
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 15 3 15 7" />
                    </svg>{" "}
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Back link */}
        <button className="ep-back-link" onClick={() => navigate(returnTo)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Edit_profile;
