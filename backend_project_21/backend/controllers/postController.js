const post_model = require("../models/post");

const create_post = async (req, res) => {
  const {
    post_topic,
    post_content,
    status,
    submit_type,
    post_type,
    author_name,
  } = req.body;

  try {
    const new_post = new post_model({
      post_topic,
      post_content,
      status,
      submit_type,
      post_type,
      author_name,
    });

    if (submit_type === "Draft") {
      await new_post.save();
      res.status(201).json({ message: "Draft Saved Successfully!" });
    } else if (submit_type === "Review") {
      await new_post.save();
      res.status(201).json({ message: "Post Saved Successfully for Review!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const edit_post = async (req, res) => {};

const delete_post = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await post_model.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post_model.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const get_posts = async (req, res) => {
  try {
    const data = await post_model.find({});
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const get_posts_by_id = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await post_model.findById(id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const edit_draft = async (req, res) => {
  const { id } = req.params;
  const { post_topic, post_content, status, submit_type, post_type } = req.body;

  try {
    const post = await post_model.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Draft not found" });
    }
    // Update the draft
    post.post_topic = post_topic || post.post_topic;
    post.post_content = post_content || post.post_content;
    post.status = status || post.status;
    post.submit_type = submit_type || post.submit_type;
    post.post_type = post_type || post.post_type;
    post.updatedAt = Date.now();

    await post.save();

    if (submit_type === "Draft") {
      res.status(200).json({ message: "Draft updated successfully", post });
    } else if (submit_type === "Review") {
      res
        .status(200)
        .json({ message: "Draft submitted for review successfully", post });
    } else {
      res.status(200).json({ message: "Draft updated successfully", post });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const approve_post = async (req, res) => {
  const id = req.params.id;

  const { status, submit_type } = req.body;

  try {
    const post = await post_model.findById(id);
    post.status = status;
    post.submit_type = submit_type;
    await post.save();
    res.status(200).json({ message: "post updated successfully", post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const reject_post = async (req, res) => {
  const id = req.params.id;

  const { status, submit_type } = req.body;

  try {
    const post = await post_model.findById(id);
    post.status = status;
    post.submit_type = submit_type;
    await post.save();
    res.status(200).json({ message: "post updated successfully", post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const review_post = async (req, res) => {
  const id = req.params.id;

  const { status, submit_type } = req.body;

  try {
    const post = await post_model.findById(id);
    post.status = status;
    post.submit_type = submit_type;
    await post.save();
    res.status(200).json({ message: "post updated successfully", post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  create_post,
  edit_post,
  delete_post,
  get_posts,
  edit_draft,
  get_posts_by_id,
  reject_post,
  review_post,
  approve_post,
};
