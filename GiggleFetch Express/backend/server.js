const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const port = 3000;

const jokes = [
  "Why don’t skeletons fight each other? Because they don’t have the guts.",
  "Why can’t your nose be 12 inches long? Because then it would be a foot.",
  "Why don’t eggs tell jokes? They’d crack each other up. ",
  "Why did the math book look sad? Because it had too many problems.",
  "Why don’t scientists trust atoms? Because they make up everything.",
  "What do you call fake spaghetti? An impasta.",
  "Why did the computer go to the doctor? Because it caught a virus.",
  "Why don’t some couples go to the gym? Because some relationships don’t work out.",
  "Why was the broom late? It swept in.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
];

/*Applying Random Function on Arrays (
    Math.random() -- Generates a decimal number between 0 (inclusive) and 1 (exclusive).
    Math.floor() -- Converts the decimal into a whole number (integer) by rounding down.
    array.length -- This scales the random decimal into the range of the array’s indices
)
*/
const randomjoke = jokes[Math.floor(Math.random() * jokes.length)];
console.log(randomjoke);

// Get Method (Default Route)
app.get("/", (req, res) => {
  res.send("Hello From Backend");
});

// Get the Random Jokes (End Point /GetJokes)
app.get("/GetJokes", (req, res) => {
  const randomjoke = jokes[Math.floor(Math.random() * jokes.length)];
  // Yes we can send response in textual form (on frontend we use res.text())
  res.type("text/plain");
  res.send(randomjoke);
});

//Starting the Server
app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
});
