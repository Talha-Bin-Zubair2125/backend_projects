const express = require("express");
const router = express.Router();
const axios = require("axios");

// Default Route
router.get("/", (req, res) => {
  res.send("Hey! There From Music Route File!");
});

// Search Music Route
router.get("/search", async (req, res) => {
  const data = req.query.music_to_search;
  // For Debugging
  console.log(data);
  /*
  encodeURIComponent() is a JavaScript function that encodes a string so it can safely be used in a URL.
  It does NOT just remove spaces.
  It replaces special characters (like spaces, &, ?, /, #, =) with percent-encoded values, which URLs require.
  */
  const query = encodeURIComponent(data);
  try {
    const response = await axios.get(
      `https://api.deezer.com/search?q=${query}`
    );
    res.status(200).json({ data: response.data.data });
  } catch (error) {
    res.status(500).json({ error: "Deezer API Error" });
  }
});

module.exports = router;
