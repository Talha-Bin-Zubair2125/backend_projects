const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;



// Use the Router
const blogs = require('./routes/blogroutes');
app.use('/blogs',blogs)


// Default Route -- EndPoint === (/)
app.get('/',(req,res)=>{
    res.send("Hey There I Am Backend");
});


app.listen(port,()=>{
    console.log(`Server Is Running On Port ${port}`);
});