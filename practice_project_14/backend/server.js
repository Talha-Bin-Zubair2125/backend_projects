const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())
const port = 3000;

// Defualt Route
app.get('/',(req,res)=>{
    res.send("Hey There Welcome To Backend!");
});

const product_route = require('./routes/product_route');
app.use('/product',product_route);

// Creating a Server
app.listen(port,()=>{
    console.log(`Server is Running On Port ${port}`);
});