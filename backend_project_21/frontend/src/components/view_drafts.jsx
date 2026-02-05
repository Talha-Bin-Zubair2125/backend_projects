import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/authcontext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/viewdrafts.css";

function View_drafts() {
  const { post, setposts } = useContext(AuthContext);
  const { loggedinuser } = useContext(AuthContext);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch posts
  useEffect(() => {
    const fetch_tasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/post/getposts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data_to_filter = res.data;

        // Filter by both Draft status AND current user
        const filteredPosts = data_to_filter.filter((data) => {
          const authorId = typeof data.author === 'object' ? data.author?._id : data.author;
          return data.submit_type === "Draft" && authorId === loggedinuser?._id;
        });

        setposts(filteredPosts);
     
        setResponseMsg("Drafts loaded successfully");
        setTimeout(() => setResponseMsg(""), 3000);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch drafts");
        setTimeout(() => setError(""), 3000);
      } finally {
        setIsLoading(false);
      }
    };
    fetch_tasks();
  }, [setposts, loggedinuser]);

  const edit_btn = (id) => {
    navigate(`/editdraft/${id}`, {
      state: { returnTo: "/drafts" },
    });
  };

  const delete_draft = async (id) => {
    if (!window.confirm("Are you sure you want to delete this draft?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/post/deletepost/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Remove the deleted post from state
      setposts(post.filter((p) => p._id !== id));
      setResponseMsg("Draft deleted successfully");
      setTimeout(() => setResponseMsg(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete draft");
      setTimeout(() => setError(""), 3000);
    }
  };

  const back_btn = () => {
    navigate("/authordashboard");
  };

  if (isLoading) {
    return (
      <div className="drafts-container">
        <div className="loading-spinner">
          <div className="spinner-large"></div>
          <p>Loading drafts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="drafts-container">
      {/* Background Orbs */}
      <div className="drafts-orb drafts-orb-1"></div>
      <div className="drafts-orb drafts-orb-2"></div>
      <div className="drafts-orb drafts-orb-3"></div>

      <div className="drafts-wrapper">
        {/* Header */}
        <div className="drafts-header">
          <div className="drafts-icon-wrapper">
            <svg
              className="drafts-icon"
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
          <h1 className="drafts-title">Draft Posts</h1>
          <p className="drafts-subtitle">
            Continue working on your saved drafts
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

        {/* Drafts Grid */}
        {post.length === 0 ? (
          <div className="empty-state">
            <svg
              className="empty-icon"
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
            <h2 className="empty-title">No drafts found</h2>
            <p className="empty-text">
              Start creating content and save drafts to continue later
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/createpost")}>
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Post
            </button>
          </div>
        ) : (
          <div className="drafts-grid">
            {post.map((item) => (
              <div key={item._id} className="draft-card">
                <div className="draft-card-header">
                  <div className="draft-badge">
                    <svg
                      className="badge-icon"
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
                    Draft
                  </div>
                  <div className="post-type-badge">{item.post_type}</div>
                </div>

                <h3 className="draft-title">{item.post_topic}</h3>
                <p className="draft-content">
                  {item.post_content.length > 150
                    ? `${item.post_content.substring(0, 150)}...`
                    : item.post_content}
                </p>

                <div className="draft-meta">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="draft-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => edit_btn(item._id)}
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Draft
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => delete_draft(item._id)}
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back Button */}
        <div className="back-button-wrapper">
          <button className="btn btn-back" onClick={back_btn}>
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

export default View_drafts;