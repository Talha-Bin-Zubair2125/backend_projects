import React, { useState, useEffect } from "react";
import { AuthContext } from "../context/authcontext";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styling/addnotes.css";
import useAI from "../../hooks/useAI";

function Addnotes() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userPrompt, setUserPrompt] = useState("");

  const navigate = useNavigate();
  const { generateNote, loading } = useAI();
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          { withCredentials: true },
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

  const handleGenerate = async () => {
    const result = await generateNote(userPrompt, title, content);
    if (result) {
      setTitle(result.title);
      setContent(result.content);
      setUserPrompt(""); // clear prompt after generation
    }
  };

  const addNotes = async (e) => {
    e.preventDefault();
    const data = { user_id: user?._id, title, content };
    try {
      await axios.post("http://localhost:3000/api/notes/add", data, {
        withCredentials: true,
      });
      navigate("/profile");
    } catch (error) {
      console.error(
        "Failed to add note:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <div className="addnotes-wrapper">
      {/* ── Hero Banner ── */}
      <div className="addnotes-hero">
        <div className="app-badge">
          <span className="dot"></span>Notes App
        </div>
        <h1>
          Capture your <span>ideas.</span>
        </h1>
        <div className="hero-divider"></div>
        <p>
          Write it down before it slips away. Your notes are saved securely and
          always within reach.
        </p>
      </div>

      {/* ── Add Note Card ── */}
      <div className="addnotes-content">
        <div className="addnotes-card">
          <div className="addnotes-card-header">
            <span className="tag">New note</span>
            <h2>What's on your mind?</h2>
          </div>

          <form className="addnotes-form" onSubmit={addNotes}>
            {/* AI Prompt Input */}
            <div className="addnotes-field">
              <label>Ask AI (optional)</label>
              <input
                type="text"
                placeholder="e.g. write a note about React hooks..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />
            </div>

            <div className="addnotes-field">
              <label>Title</label>
              <input
                type="text"
                placeholder="Give your note a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="addnotes-field">
              <label>Content</label>
              <textarea
                placeholder="Start writing your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="addnotes-btn-row">
              {/* AI Button */}
              <button
                type="button"
                className="btn-addnote-ai"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? "Thinking..." : "✨ Generate with AI"}
              </button>

              <button type="submit" className="btn-addnote-submit">
                Add Note
              </button>

              <button
                type="button"
                className="btn-addnote-back"
                onClick={() => navigate("/profile")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addnotes;
