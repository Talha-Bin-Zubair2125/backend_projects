const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// Default Route
app.get('/',(req,res)=>{
    res.send("Welcome! to Blog Management API");
});

// Importing the Router
const blog_router = require('./routes/blog_route');
// /blog this is the prefix for all the route definitions in blog_route.js
app.use('/blog',blog_router);

// Creating a Server
app.listen(port,()=>{
    console.log(`Server is Running at Port ${port}`);
});