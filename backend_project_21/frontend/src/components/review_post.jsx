import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/review_post.css";

function Review_post() {
  const { loggedinuser, setloggedinuser, post, setposts } = useContext(AuthContext);
  const { id } = useParams(); // Get the post ID from URL
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState(null);
  const navigate = useNavigate();

  // Fetch the specific post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/post/getpost/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentPost(res.data);
        setResponseMsg("Post loaded successfully");
        setTimeout(() => setResponseMsg(""), 3000);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch post");
        setTimeout(() => setError(""), 3000);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Function to refresh posts in context
  const refreshPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/post/getposts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setposts(res.data);
    } catch (err) {
      console.error("Failed to refresh posts:", err);
    }
  };

  const handleApprovePost = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/post/approve/${id}`,
        { 
          status: "Published", submit_type : "Published"
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Refresh posts in context to update the user profile page
      await refreshPosts();
      
      setResponseMsg("Post approved and published successfully!");
      setTimeout(() => {
        navigate("/userprofile", { state: { refresh: true } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to approve post");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleRejectPost = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/post/reject/${id}`,
        { 
          status: "Rejected", submit_type : "Published"
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Refresh posts in context to update the user profile page
      await refreshPosts();
      
      setResponseMsg("Post rejected");
      setTimeout(() => {
        navigate("/userprofile", { state: { refresh: true } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reject post");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleRequestRevision = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/post/reviewdraft/${id}`,
        { 
          status: "Revision Required", submit_type : "Published"
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      // Refresh posts in context to update the user profile page
      await refreshPosts();
      
      setResponseMsg("Revision request sent to author");
      setTimeout(() => {
        navigate("/userprofile", { state: { refresh: true } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to request revision");
      setTimeout(() => setError(""), 3000);
    }
  };

  const backToProfile = () => {
    navigate("/userprofile");
  };

  if (isLoading) {
    return (
      <div className="review-container">
        <div className="loading-spinner">
          <div className="spinner-large"></div>
          <p>Loading post for review...</p>
        </div>
      </div>
    );
  }

  if (!currentPost) {
    return (
      <div className="review-container">
        <div className="error-state">
          <svg
            className="error-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2>Post Not Found</h2>
          <p>The post you're looking for doesn't exist or has been removed.</p>
          <button className="btn btn-primary" onClick={backToProfile}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-container">
      {/* Background Orbs */}
      <div className="review-orb review-orb-1"></div>
      <div className="review-orb review-orb-2"></div>
      <div className="review-orb review-orb-3"></div>

      <div className="review-wrapper">
        {/* Header */}
        <div className="review-header">
          <div className="review-icon-wrapper">
            <svg
              className="review-icon"
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
          </div>
          <h1 className="review-title">Review Post</h1>
          <p className="review-subtitle">
            Review and provide feedback on submitted content
          </p>
        </div>

        {/* Messages */}
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

        {/* Post Content Card */}
        <div className="post-content-card">
          {/* Post Header */}
          <div className="post-header-section">
            <div className="post-title-wrapper">
              <h2 className="post-title">
                {currentPost.post_topic || "Untitled Post"}
              </h2>
              <span className="status-badge status-pending">
                Pending Review
              </span>
            </div>

            <div className="post-meta-info">
              {currentPost.author_name && (
                <div className="meta-item">
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
                  <span>Author: {currentPost.author_name}</span>
                </div>
              )}
              {currentPost.post_type && (
                <div className="meta-item">
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
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <span>Category: {currentPost.post_type}</span>
                </div>
              )}
              {currentPost.createdAt && (
                <div className="meta-item">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    Submitted: {new Date(currentPost.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          <div className="post-content-section">
            <h3 className="section-title">Content</h3>
            <div className="post-content-text">
              {currentPost.post_content || "No content available"}
            </div>
          </div>

          {/* Additional Information */}
          {currentPost.tags && currentPost.tags.length > 0 && (
            <div className="post-tags-section">
              <h3 className="section-title">Tags</h3>
              <div className="tags-list">
                {currentPost.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons-wrapper">
          <button
            className="action-btn approve-btn"
            onClick={handleApprovePost}
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
            Approve & Publish
          </button>

          <button
            className="action-btn revision-btn"
            onClick={handleRequestRevision}
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Request Revision
          </button>

          <button
            className="action-btn reject-btn"
            onClick={handleRejectPost}
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
            Reject Post
          </button>
        </div>

        {/* Back Button */}
        <div className="back-button-wrapper">
          <button className="btn btn-back" onClick={backToProfile}>
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review_post;