import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styling/Updatenotes.css";
import useAI from "../../hooks/useAI"; // custom hook for AI interactions

function Updatenotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newtitle, setnewTitle] = useState("");
  const [newcontent, setnewContent] = useState("");
  const [userPrompt, setUserPrompt] = useState(""); // user prompt for AI

  const { improveNote, loading } = useAI();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/notes/getnote/${id}`,
          { withCredentials: true },
        );
        setnewTitle(response.data.title);
        setnewContent(response.data.content);
      } catch (error) {
        console.error(
          "Failed to fetch note:",
          error.response ? error.response.data : error.message,
        );
      }
    };
    fetchNote();
  }, [id]);

  // AI improve handler — uses userPrompt if typed, otherwise uses existing title+content
  const handleImprove = async () => {
    // passes userPrompt so AI knows what topic to generate about
    const result = await improveNote(newtitle, newcontent, userPrompt);
    if (result) {
      setnewTitle(result.title);
      setnewContent(result.content);
      setUserPrompt(""); // clear prompt after improvement
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    const data = { title: newtitle, content: newcontent };
    try {
      await axios.put(
        `http://localhost:3000/api/notes/updatenote/${id}`,
        data,
        { withCredentials: true },
      );
      navigate("/getnotes");
    } catch (error) {
      console.error(
        "Failed to update note:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <div className="updatenotes-wrapper">
      <div className="updatenotes-hero">
        <div className="app-badge">
          <span className="dot"></span>Notes App
        </div>
        <h1>
          Edit your <span>note.</span>
        </h1>
        <div className="hero-divider"></div>
        <p>Make your changes below. Your updates will be saved instantly.</p>
      </div>

      <div className="updatenotes-content">
        <div className="updatenotes-card">
          <div className="updatenotes-card-header">
            <span className="tag">Editing note</span>
            <h2>Update your note</h2>
          </div>

          <form className="updatenotes-form" onSubmit={updateNote}>
            {/* AI Prompt Input */}
            <div className="updatenotes-field">
              <label>Ask AI (optional)</label>
              <input
                type="text"
                placeholder="e.g. make this about Node.js instead..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />
            </div>

            <div className="updatenotes-field">
              <label>Title</label>
              <input
                type="text"
                placeholder="Note title..."
                value={newtitle}
                required
                onChange={(e) => setnewTitle(e.target.value)}
              />
            </div>

            <div className="updatenotes-field">
              <label>Content</label>
              <textarea
                placeholder="Note content..."
                value={newcontent}
                required
                onChange={(e) => setnewContent(e.target.value)}
              ></textarea>
            </div>

            <div className="updatenotes-btn-row">
              {/* AI Improve Button */}
              <button
                type="button"
                className="btn-updatenote-ai"
                onClick={handleImprove}
                disabled={loading}
              >
                {loading ? "Improving..." : "✨ Improve with AI"}
              </button>

              <button type="submit" className="btn-updatenote-submit">
                Save Changes
              </button>
              <button
                type="button"
                className="btn-updatenote-back"
                onClick={() => navigate("/getnotes")}
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

export default Updatenotes;
