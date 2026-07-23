const express = require("express");
const cors = require("cors");
const url = require("url");
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
// Using the Date Contructor
const d = new Date();

// Default Route
app.get("/", (req, res) => {
  res.send("<h1>Hello From Backend</h1>");
});
// Route For POST (Time)
app.post("/Time", (req, res) => {  
  const myurl = url.parse(req.url, true);
  console.log(myurl);
  const data_format = myurl.query.format;

  if (data_format == 12) {
    res.json({
      message: `Date Format is: ${data_format} Hour Format`,
      date: `${d.getDate()} - ${d.getMonth()} - ${d.getFullYear()}`,
      time: d.toLocaleTimeString("en-US"),
    });
  } else {
    res.json({
      message: `Date Format is: ${data_format} Hour Format`,
      date: `${d.getDate()} - ${d.getMonth()} - ${d.getFullYear()}`,
      time: d.toLocaleTimeString("en-GB"),
    });
  }
});

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
