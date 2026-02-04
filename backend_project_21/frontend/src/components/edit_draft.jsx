import React, { useState, useEffect } from "react";
import { AuthContext } from "../context/authcontext";
import { useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../style/createpost.css";

function Edit_draft() {
  const { post, setposts } = useContext(AuthContext);
  const { id } = useParams(); // Get the draft ID from URL
  const [post_topic, set_post_topic] = useState("");
  const [post_content, set_post_content] = useState("");
  const [post_type, set_post_type] = useState("");
  const [status, setstatus] = useState("Pending");
  const [submittype, set_submit_type] = useState(["Review", "Draft"]);
  const [response, setresponse] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const returnTo = location.state?.returnTo || "/authordashboard";

  // Fetch the draft post data when component mounts
  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/post/getposts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Find the specific draft by ID
        const draft = res.data.find((p) => p._id === id);
        
        if (draft) {
          set_post_topic(draft.post_topic);
          set_post_content(draft.post_content);
          set_post_type(draft.post_type);
          setstatus(draft.status);
        } else {
          setresponse("Draft not found");
        }
      } catch (error) {
        setresponse("Failed to load draft");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDraft();
    }
  }, [id]);

  const submit_post_for_review = async () => {
    const token = localStorage.getItem("token");

    const data = {
      post_topic,
      post_content,
      status,
      submit_type: submittype[0],
      post_type,
    };

    try {
      const res = await axios.patch(
        `http://localhost:3000/post/editdraft/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setresponse(
        res.data.message || "Post submitted for review successfully!"
      );
      setTimeout(() => {
        navigate(returnTo);
      }, 2000);
    } catch (error) {
      setresponse(error.response?.data?.message || "Failed to submit post");
      setTimeout(() => setresponse(""), 4000);
      console.log(error);
    }
  };

  const update_draft = async () => {
    const token = localStorage.getItem("token");

    const data = {
      post_topic,
      post_content,
      status,
      submit_type: submittype[1],
      post_type,
    };

    try {
      const res = await axios.patch(
        `http://localhost:3000/post/editdraft/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setresponse(res.data.message || "Draft updated successfully!");
      setTimeout(() => setresponse(""), 4000);
    } catch (error) {
      setresponse(error.response?.data?.message || "Failed to update draft");
      setTimeout(() => setresponse(""), 4000);
    }
  };

  const handleBackToDashboard = () => {
    navigate(returnTo);
  };

  if (isLoading) {
    return (
      <div className="create-post-container">
        <div className="loading-spinner">
          <div className="spinner-large"></div>
          <p>Loading draft...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="create-post-container">
      {/* Background Orbs */}
      <div className="create-post-orb create-post-orb-1"></div>
      <div className="create-post-orb create-post-orb-2"></div>
      <div className="create-post-orb create-post-orb-3"></div>

      <div className="create-post-wrapper">
        {/* Header */}
        <div className="create-post-header">
          <div className="create-post-icon-wrapper">
            <svg
              className="create-post-icon"
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
          </div>
          <h1 className="create-post-title">Edit Your Draft</h1>
          <p className="create-post-subtitle">
            Update and refine your content before publishing
          </p>
        </div>

        {/* Response Message */}
        {response && (
          <div className="response-message">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            {response}
          </div>
        )}

        {/* Form Card */}
        <div className="create-post-form-card">
          <form className="post-form" onSubmit={(e) => e.preventDefault()}>
            {/* Post Topic */}
            <div className="form-group">
              <label className="form-label">
                <svg
                  className="label-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                Post Topic
              </label>
              <input
                type="text"
                className="form-input"
                required
                value={post_topic}
                onChange={(e) => set_post_topic(e.target.value)}
                placeholder="Enter an engaging topic for your post..."
              />
            </div>

            {/* Post Content */}
            <div className="form-group">
              <label className="form-label">
                <svg
                  className="label-icon"
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
                Post Content
              </label>
              <textarea
                className="form-textarea"
                required
                value={post_content}
                onChange={(e) => set_post_content(e.target.value)}
                placeholder="Write your amazing content here..."
              ></textarea>
            </div>

            {/* Post Type */}
            <div className="form-group">
              <label className="form-label">
                <svg
                  className="label-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                Post Type
              </label>
              <select
                className="form-select"
                required
                value={post_type}
                onChange={(e) => set_post_type(e.target.value)}
              >
                <option value="">Choose post type...</option>
                <option value="Blog">Blog</option>
                <option value="Article">Article</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                type="button"
                className="submit-btn btn-review"
                onClick={submit_post_for_review}
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="btn-text">Submit for Review</span>
              </button>

              <button
                type="button"
                className="submit-btn btn-draft"
                onClick={update_draft}
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <span className="btn-text">Update Draft</span>
              </button>
            </div>
          </form>
        </div>

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
            Back to Drafts
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit_draft;