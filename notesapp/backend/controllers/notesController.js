const Notes_Model = require("../model/notes");
const JOI = require("joi");

// Validation schema for adding a note
const addNoteSchema = JOI.object({
  user_id: JOI.string().required(),
  title: JOI.string().required(),
  content: JOI.string().required(),
});

// Add Note Route

const addNote = async (req, res) => {
  const { error } = addNoteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { user_id, title, content } = req.body;
  try {
    const newNote = await Notes_Model.create({
      user: user_id,
      title,
      content,
    });
    res.status(201).json({ message: "Note added successfully", note: newNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding note", error });
  }
};

// Get Notes Route

const getNotes = async (req, res) => {
  const userId = req.params.userId;
  try {
    const notes = await Notes_Model.find({ user: userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

// Get Notes by Note ID Route (for updating a specific note)
const getNoteById = async (req, res) => {
  const noteId = req.params.id;
  console.log("Fetching note with ID:", noteId); // Debug log
  try {
    const note = await Notes_Model.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Error fetching note", error });
  }
}

// Update Note Route
const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;
  try {
    const updatedNote = await Notes_Model.findByIdAndUpdate(
      noteId,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    } 
    res.status(200).json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {   
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Error updating note", error });
  }
};

module.exports = { addNote, getNotes, getNoteById, updateNote };
