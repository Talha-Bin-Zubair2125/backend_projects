const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// for routes create a router object
const router = express.Router();

// Temporary Storage
let blogs = [];

// POST REQ -- EndPoint === (/blogs/AddBlog)
router.post("/AddBlog", (req, res) => {
  let data = req.body;
  // Pushing Data Into Array
  blogs.push(data);
  res.json({ message: "Blog Added Successfully" });
});

// GET REQ -- EndPoint === (/blogs/GetBlogs)
router.get("/GetBlogs", (req, res) => {
  res.json(blogs);
});

// GET REQ -- EndPoint === (/blogs/:authorname)
router.get("/:authorname", (req, res) => {
  // Take the Value from URL
  const authorname = req.params.authorname;
  const result = blogs.filter((value) => value.Blog_Author === authorname);

  if (result.length > 0) {
    res.json(result);
  } else {
    res.status(404).json({ message: "No blogs found for this author" });
  }
});

// export the router
module.exports = router;
