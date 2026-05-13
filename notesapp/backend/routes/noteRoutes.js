const { protect } = require("../middlewares/authMiddleware");
const { addNote,getNotes,getNoteById,updateNote } = require("../controllers/notesController");

const router = require("express").Router();

// Add Note Route
router.post("/add", protect, addNote);

// Get Notes Route
router.get("/getnotes/:userId", protect, getNotes);

// Get Note by Note ID Route (for updating a specific note)
router.get("/getnote/:id", protect, getNoteById);

// Update Note Route
router.put("/updatenote/:id", protect, updateNote);

module.exports = router;
