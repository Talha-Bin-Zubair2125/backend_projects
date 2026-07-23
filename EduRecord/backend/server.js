const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

// Importing the Route File where we define route definitions
const std_route = require("./router/std_data");
// /std (base path -- acts as a prefix), use all the routes defined inside std_data
app.use("/std", std_route);

app.listen(port, () => {
  console.log(`Server is Listening On Port ${port}`);
});
