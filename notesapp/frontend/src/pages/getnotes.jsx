import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import axios from "axios";
import "../styling/getnotes.css";

function Getnotes() {
  const { user, setUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/profile", { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user?._id) return;
      try {
        const response = await axios.get(`http://localhost:3000/api/notes/getnotes/${user._id}`, { withCredentials: true });
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, [user]);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/deletenote/${id}`, { withCredentials: true });
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="getnotes-wrapper">

      {/* ── Hero ── */}
      <div className="getnotes-hero">
        <div className="app-badge"><span className="dot"></span>Notes App</div>
        <h1>All your <span>notes.</span></h1>
        <div className="hero-divider"></div>
        <p>Everything you've written, right here. Pick up where you left off.</p>
      </div>

      <div className="getnotes-content">

        {/* ── Top Bar ── */}
        <div className="getnotes-topbar">
          <p className="notes-count">
            <span>{notes.length}</span> {notes.length === 1 ? "note" : "notes"} found
          </p>
          <button className="btn-back-top" onClick={() => navigate("/profile")}>Back</button>
        </div>

        {/* ── Empty State ── */}
        {notes.length === 0 ? (
          <div className="getnotes-empty">
            <div className="empty-icon">📝</div>
            <h3>No notes yet</h3>
            <p>You haven't written anything yet. Start capturing your ideas!</p>
            <button className="btn-add-first" onClick={() => navigate("/addnotes")}>+ Write your first note</button>
          </div>
        ) : (
          <div className="getnotes-grid">
            {notes.map((note, index) => (
              <div className="note-card" key={note._id}>
                <div className="note-card-top">
                  <h3 className="note-title">{note.title}</h3>
                  <span className="note-index">#{index + 1}</span>
                </div>
                <div className="note-divider"></div>
                <p className="note-content">{note.content}</p>
                <div className="note-actions">
                  <button className="btn-note-read" onClick={() => setSelectedNote(note)}>Read</button>
                  <button className="btn-note-update" onClick={() => navigate(`/updatenotes/${note._id}`)}>Update</button>
                  <button className="btn-note-delete" onClick={() => deleteNote(note._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Read Modal ── */}
      {selectedNote && (
        <div className="note-modal-overlay" onClick={() => setSelectedNote(null)}>
          <div className="note-modal" onClick={(e) => e.stopPropagation()}>
            <div className="note-modal-header">
              <h2>{selectedNote.title}</h2>
              <button className="btn-modal-close" onClick={() => setSelectedNote(null)}>✕</button>
            </div>
            <div className="note-modal-divider"></div>
            <p className="note-modal-body">{selectedNote.content}</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default Getnotes;