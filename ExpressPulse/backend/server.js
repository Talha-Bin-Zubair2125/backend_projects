const express = require("express");
const cors = require("cors");
const app = express();

// reads json body
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json({ text: "Hello from Backend 🚀" });
});

app.post("/Message", (req, res) => {
  const name = req.body;
  console.log(name);

  res.json({ message: `User ${name.name} created successfully!` });
});

app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});
