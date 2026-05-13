const express = require("express");
const cors = require("cors");
require('dotenv').config();
const cookie_parser = require("cookie-parser");
const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true                
}));
const port = process.env.port;
const cookiesecret = process.env.cookie_secret;
// just for debugging
console.log("Secret",cookiesecret);
// for debugging
console.log(port);
app.use(cookie_parser(cookiesecret));
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("Hey There!");
});

const auth_route = require('./routes/authroutes');
// creating a route prefix -- all routes prefixed with /auth
app.use('/auth',auth_route);

// Importing DB Connection
const connectDB = require('./db');
connectDB();

/*app.post("/register", (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    res.json({ success: "Data Received Successfully", data : req.body });
  } catch (error) {
    res.json({ err: error });
  }
});

app.post("/login", (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    res.json({ success: "Data Received Successfully", data : req.body });
  } catch (error) {
    res.json({ err: error });
  }
});*/

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
