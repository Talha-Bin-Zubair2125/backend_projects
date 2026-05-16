const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const ConnectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const cookie_secret = process.env.CookieSecret;
app.use(cookieParser(cookie_secret));
app.use(express.json());

// Connect to MongoDB
ConnectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", employeeRoutes);

// Create a simple route to test the server
app.get("/", (req, res) => {
  res.send("Welcome to the Attendance System API!");
});

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});