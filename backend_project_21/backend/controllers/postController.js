const post_model = require("../models/post");

const create_post = async (req, res) => {
  const { post_topic, post_content, status, submit_type, post_type } = req.body;

  try {
    const new_post = new post_model({
      post_topic,
      post_content,
      status,
      submit_type,
      post_type,
    });

    await new_post.save();
    if (submit_type === "Draft") {
      res.status(201).json({ message: "Draft Saved Successfully!" });
    } else if (submit_type === "Review") {
      res.status(201).json({ message: "Post Saved Successfully for Review!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const edit_post = async (req, res) => {};

const delete_post = async (req, res) => {};

const get_posts = async (req, res) => {
  try {
    const data = await post_model.find({});
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { create_post, edit_post, delete_post, get_posts };
