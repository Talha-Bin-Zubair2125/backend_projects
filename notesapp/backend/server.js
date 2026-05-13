const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ConnectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET || "default_secret";

// Middleware
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Connect to MongoDB
ConnectDB();

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Notes App API");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Server Creation
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
