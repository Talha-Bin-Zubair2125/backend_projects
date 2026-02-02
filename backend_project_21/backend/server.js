const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

// Default Route
app.get('/',(req,res)=>{
    res.send("Hey! Welcome to Server.js File!");
});

// Importing Route
const auth_route = require('./routes/authroutes');
app.use('/auth',auth_route);
// Importing DB Connection
const connectDB = require('./db');
connectDB();

// Server Creation
app.listen(process.env.port,()=>{
    console.log(`Server is Running at Port ${process.env.port}`);
});
