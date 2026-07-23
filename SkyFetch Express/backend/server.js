const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const app = express();

// Dotnev -- dotenv is a Node.js library that lets you store sensitive information (like API keys, database passwords, or secret tokens) in a separate .env file — instead of hardcoding them in your code. we create a .env file and store data in it

// This require('dotenv') imports the dotenv library into your file and .config this runs the .dotnev configuration function Reads your .env file (from the project root),Parses all the key–value pairs (like API_KEY=12345),Adds them into process.env.

// For API we have to create a file having name .env

// .env syntax is very strict we don't have add any semicolon or spaces

require("dotenv").config();

const apiKey = process.env.API_KEY;
console.log(apiKey);

app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hey There I Am Backend");
});

/* app.post('/:citynane',(req,res)=>{
    const city = req.params.citynane;
    res.send({cityname: city});
});
*/

app.get("/:citynane", async (req, res) => {
  const city = req.params.citynane;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    /*
        if i print this it is returing me response headers for data i have to use response.json()
        console.log(response);
    */

    // For Data  (because response should be in json format)
    const data = await response.json();

    // if i use filter it is not applicable because data is in form of obj so we have to manually extract the data
    const filtered_data = {
      longitude: data.coord.lon,
      latitude: data.coord.lat,
      temperature: data.main.temp,
      temperature_humidity: data.main.humidity,
      feels_like: data.main.feels_like,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      wind_gust: data.wind.gust,
      wind_deg: data.wind.deg,
      country: data.sys.country,
      city: data.name,
    };

    res.json(filtered_data);
  } catch (error) {
    res.json(error);
  }
});

app.listen(port, () => {
  console.log(`Server is Starting On Port ${port}`);
});
