import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../stylings/UpdateProfile.css";

function UpdateProfile() {
  const { adminInfo, setAdminInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [UpdateAdminID, setUpdateAdminID] = useState("");
  const [UpdatePassword, setUpdatePassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/admin/getprofile",
          { withCredentials: true }
        );
        console.log(response.data.user);
        
        setAdminInfo(response.data.user);
        setUpdateAdminID(response.data.user?.adminID || "");
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };
    fetchProfile();
  }, []); 

  const UpdateAdminProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:3000/api/auth/admin/updateprofile",
        { adminID: UpdateAdminID, password: UpdatePassword },
        { withCredentials: true }
      );
      setAdminInfo(response.data.user);
      setSuccess("Profile updated successfully!");
      setUpdatePassword(""); // clear password field after update
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-wrapper">

      {/* ── Back Button ── */}
      <button className="update-back" onClick={() => navigate("/profile")}>
        ← Back to Dashboard
      </button>

      <div className="update-card">
        <div className="update-card-header">
          <div className="update-avatar">
            {adminInfo?.adminID?.charAt(0) || "A"}
          </div>
          <div>
            <h2>Update Profile</h2>
            <p>Change your Admin ID or password</p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="update-notification error">
            <span>⚠</span> {error}
          </div>
        )}

        {/* Success Notification */}
        {success && (
          <div className="update-notification success">
            <span>✓</span> {success}
          </div>
        )}

        <form className="update-form" onSubmit={UpdateAdminProfile}>
          <div className="update-field">
            <label>Admin ID</label>
            <input
              type="text"
              placeholder="Update Admin ID"
              value={UpdateAdminID}
              autoComplete="new-id"
              onChange={(e) => setUpdateAdminID(e.target.value)}
              required
            />
          </div>

          <div className="update-field">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={UpdatePassword}
                autoComplete="new-password"
              onChange={(e) => setUpdatePassword(e.target.value)}
            />
            <span className="update-hint">Leave blank to keep current password</span>
          </div>

          <div className="update-btn-row">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-save"
              disabled={loading}
            >
              {loading ? <span className="update-spinner"></span> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;