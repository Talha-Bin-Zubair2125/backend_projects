// First import the express library
const express = require("express");
// Import the CORS Library
const cors = require("cors");
// Import the URL Module
const url = require("url");
// Create an Express Application Object
const app = express();
app.use(cors());
// Parsing of Body Data
app.use(express.json());

// Define the Port
const port = 3000;

// Create the first Route
app.get("/", (req, res) => {
  res.send("Hello From Backend");
});



/*

For taking Values from URL QueryString

app.post("/Add", (req, res) => {
    const myurl = url.parse(req.url,true);
    console.log(myurl);
    
});

*/

app.post("/Add", (req, res) => {
  const data = req.body;
  let Result = Number(data.num1) + Number(data.num2);
  res.json({ message: "Received", "Result" : Result });
});

// Create a POST Req for Sub
app.post("/Sub", (req, res) => {
  const data = req.body;
  let Result = Number(data.num1) - Number(data.num2);
  res.json({ message: "Received", "Result" : Result });
});

// Create a POST Req for Mul
app.post("/Mul", (req, res) => {
  const data = req.body;
  let Result = Number(data.num1) * Number(data.num2);
  res.json({ message: "Received", "Result" : Result });
});

// Create a POST Req for Div (we can't add two responses we only send one response at a time)
app.post("/Divide", (req, res) => {
  const data = req.body;
  if (data.num2==0) {
    return res.status(400).json("Bad request");
  }
  let Result = Number(data.num1) / Number(data.num2);
  res.json({ message: "Received", "Result" : Result });
});

// Create a Server
app.listen(port, () => {
  console.log(`Server is Running On PORT ${port}`);
});
