import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Edit_profile from "../../components/edit_profile";
import "../../style/userprofile.css";

function Userprofile() {
  const { loggedinuser, setloggedinuser, post, setposts } =
    useContext(AuthContext);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [publishedPosts, setPublishedPosts] = useState([]);
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
      } finally {
        // always runs
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [setloggedinuser, navigate]);

  // get all posts so that editor can review it
  useEffect(() => {
    const fetchPublishedPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/post/getposts`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data_received = res.data;
        console.log("All posts:", data_received);

        const filtered_data = data_received.filter(
          (p) => p.submit_type === "Review"
        );
        console.log("posts for review:", filtered_data);

        setPublishedPosts(filtered_data);
      } catch (error) {
        setError("Failed to load posts for review");
        console.error(error);
      }
    };
    fetchPublishedPosts();
  }, [post]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setloggedinuser(null);
    navigate("/");
  };

  const edit_author_details = () => {
    // We send data via id to editprofile page / state is like an invisible bag it's like carrying information from one page to another
    navigate(`/editprofile/${loggedinuser._id}`, {
      state: { returnTo: "/userprofile" },
    });
  };

  const handleReviewPost = (postId) => {
    navigate(`/reviewpost/${postId}`);
  };

  const handleApprovePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/post/approve/${postId}`,
        { status: "Published", submit_type : "Published"  },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResponseMsg("Post approved successfully");
      setTimeout(() => setResponseMsg(""), 3000);
      // Refresh the posts list
      setPublishedPosts(publishedPosts.filter((p) => p._id !== postId));
    } catch (err) {
      setError("Failed to approve post");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleRejectPost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/post/reject/${postId}`,
        { status: "Rejected", submit_type : "Published" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResponseMsg("Post rejected");
      setTimeout(() => setResponseMsg(""), 3000);
      // Refresh the posts list
      setPublishedPosts(publishedPosts.filter((p) => p._id !== postId));
    } catch (err) {
      setError("Failed to reject post");
      setTimeout(() => setError(""), 3000);
    }
  };

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
            Manage your account and review submissions
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

        {/* Posts for Review Section */}
        <div className="profile-card">
          <h2 className="card-title">
            Posts Pending Review ({publishedPosts.length})
          </h2>

          {publishedPosts.length === 0 ? (
            <div className="no-posts-review">
              <svg
                className="no-posts-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p>No posts pending review at the moment</p>
            </div>
          ) : (
            <div className="posts-review-grid">
              {publishedPosts.map((post) => (
                <div key={post._id} className="review-post-card">
                  <div className="review-post-header">
                    <h3 className="review-post-title">
                      {post.post_topic || "Untitled Post"}
                    </h3>
                    <span className="review-status-badge">Pending Review</span>
                  </div>

                  <div className="review-post-content">
                    <p className="review-post-excerpt">
                      {post.post_content
                        ? post.post_content.substring(0, 120) +
                          (post.post_content.length > 120 ? "..." : "")
                        : "No content available"}
                    </p>
                  </div>

                  <div className="review-post-meta">
                    {post.author_name && (
                      <span className="review-author">
                        <svg
                          className="meta-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {post.author_name}
                      </span>
                    )}
                    {post.post_type && (
                      <span className="review-category">{post.post_type}</span>
                    )}
                    {post.createdAt && (
                      <span className="review-date">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div className="review-post-actions">
                    <button
                      className="review-btn view-btn"
                      onClick={() => handleReviewPost(post._id)}
                    >
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Review
                    </button>
                    <button
                      className="review-btn approve-btn"
                      onClick={() => handleApprovePost(post._id)}
                    >
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Approve
                    </button>
                    <button
                      className="review-btn reject-btn"
                      onClick={() => handleRejectPost(post._id)}
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button className="btn btn-secondary" onClick={edit_author_details}>
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Profile
          </button>
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