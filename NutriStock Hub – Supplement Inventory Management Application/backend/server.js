const express = require('express');
// Cors is used for cross-origin communication if we don't use it browswer blocks the request made from one origin to another
const cors = require('cors');
// Creating an Express Application which provide cors functionalities of express framwork
const app = express();
// We are using the CORS middleware to enable cross-origin requests for the Express application -- which register it with express app
app.use(cors());
// We are using Express’s built-in JSON middleware to parse incoming JSON request bodies.
app.use(express.json());


const port = 3000;

// importing a Router instance
const product_router = require('./routes/product_route');
// This line registers the product route as middleware under route /product 
app.use('/product',product_router);

// Default Route
app.get('/',(req,res)=>{
    res.send("Hey! Welcome to Server.js File");
});

// Creating a Server
app.listen(port,()=>{
    console.log(`Server Is Running At Port ${port}`);
});