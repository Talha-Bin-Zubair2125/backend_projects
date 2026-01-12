const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

// Default Route
app.get('/',(req,res)=>{
    res.send("Hey! There Welcome to TuneWave – Web-Based Music Search and Preview Player!");
});


// Importing the Router 
const music_route = require('./routes/music');
app.use('/music',music_route);

// Creating a Server
app.listen(port,()=>{
    console.log(`Server is Running at Port ${port}`);
});