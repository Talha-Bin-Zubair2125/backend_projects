const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model("Note", noteSchema);