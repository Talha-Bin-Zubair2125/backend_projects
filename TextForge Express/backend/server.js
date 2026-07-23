const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { json } = require("stream/consumers");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
let results = [];

// Default Route
app.get("/", (req, res) => {
  res.send("Hello From Backend");
});

app.post("/SaveFile", async (req, res) => {
  const data_from_frontend = req.body;

  for (let value of data_from_frontend.data) {
    if (value.File_Name.endsWith(".txt")) {
      try {
        // For Checking File Exists or Not we use existssync method
        if (fs.existsSync(value.File_Name)) {
          const existing_content = fs.readFileSync(value.File_Name, "utf-8");
          if (existing_content === value.File_Content) {
            results.push({ file: value.File_Name, status: "Same File" });
          } else {
            fs.writeFileSync(value.File_Name, value.File_Content);
            results.push({ file: value.File_Name, status: "Updated" });
          }
        } else {
          fs.writeFileSync(value.File_Name, value.File_Content);
          results.push({
            file: value.File_Name,
            status: "Created",
            filecontent: value.File_Content,
          });
        }
      } catch (err) {
        results.push({ file: value.File_Name, status: "Error writing file" });
      }
    } else {
      results.push({ file: value.File_Name, status: "Only .txt allowed" });
    }
  }
});
// Route For Read File /Read (GET)
app.get("/ReadFile", (req, res) => {
  res.json(results);
});

app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
