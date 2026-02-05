import React, { useState, useEffect } from "react";
import { AuthContext } from "../context/authcontext";
import { useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/view_published_author.css";

function View_published_author() {
  const { post, setposts } = useContext(AuthContext);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [response, setresponse] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const returnTo = location.state?.returnTo || "/authordashboard";

  // Fetch the published posts data when component mounts
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
          (p) => p.status === "Published",
        );
        console.log("Published posts:", filtered_data);

        setPublishedPosts(filtered_data);
      } catch (error) {
        setresponse("Failed to load published posts");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPublishedPosts();
  }, [post]);

  const handleBackToDashboard = () => {
    navigate(returnTo);
  };

  const handleViewPost = (postId) => {
    navigate(`/viewpost/${postId}`);
  };

  if (isLoading) {
    return (
      <div className="published-container">
        <div className="loading-spinner">
          <div className="spinner-large"></div>
          <p>Loading published posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="published-container">
      {/* Background Orbs */}
      <div className="published-orb published-orb-1"></div>
      <div className="published-orb published-orb-2"></div>
      <div className="published-orb published-orb-3"></div>

      <div className="published-wrapper">
        {/* Header */}
        <div className="published-header">
          <div className="published-icon-wrapper">
            <svg
              className="published-icon"
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
          <h1 className="published-title">Published Posts</h1>
          <p className="published-subtitle">
            View and manage your published content
          </p>
        </div>

        {/* Response Message */}
        {response && (
          <div className="response-message error">
            <svg
              className="response-icon"
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
            {response}
          </div>
        )}

        {/* Published Posts List */}
        {publishedPosts.length === 0 ? (
          <div className="no-posts">
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
            <h2>No Published Posts</h2>
            <p>You haven't published any posts yet.</p>
          </div>
        ) : (
          <div className="posts-grid">
            {publishedPosts.map((post) => (
              <div key={post._id} className="post-card">
                <div className="post-card-header">
                  <h3 className="post-card-title">
                    {post.post_topic || "Untitled Post"}
                  </h3>
                  <span className="post-status-badge published">Published</span>
                </div>

                <div className="post-card-content">
                  <p className="post-card-excerpt">
                    {post.post_content
                      ? post.post_content.substring(0, 150) +
                        (post.post_content.length > 150 ? "..." : "")
                      : "No content available"}
                  </p>
                </div>

                <div className="post-card-meta">
                  {post.post_type && (
                    <span className="post-category">{post.post_type}</span>
                  )}
                  {post.createdAt && (
                    <span className="post-date">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="post-card-actions">
                  <button
                    className="action-btn view-btn"
                    onClick={() => handleViewPost(post._id)}
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
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="back-button-wrapper">
          <button className="back-btn" onClick={handleBackToDashboard}>
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

export default View_published_author;