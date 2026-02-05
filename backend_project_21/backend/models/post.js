const mongoose = require("mongoose");
// Table Structure
const post_schema = new mongoose.Schema(
  {
    post_topic: { type: "String", required: true },
    post_content: { type: "String", required: true },
    status: { type: "String" },
    submit_type: { type: "String", enum: ["Review", "Draft","Published"] },
    post_type: { type: "String", enum: ["Blog", "Article"] },
    author_name: { type: "String" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Posts", post_schema);
