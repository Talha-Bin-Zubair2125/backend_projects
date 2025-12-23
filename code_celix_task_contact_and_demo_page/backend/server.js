const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;



// Default Route
app.get('/',(req,res)=>{
    res.send("Hey! Welcome to Main Server File");
});


// Importing the Router File
const contact_us_route = require('./routes/contact_route');
app.use('/contact',contact_us_route);

const demo_booking_route = require('./routes/demo_route');
app.use('/demo',demo_booking_route);


// Calling the Connect Function
const connectDB = require("./db");
connectDB();

app.listen(port,()=>{
    console.log(`Server is Running On Port ${port}`);
});