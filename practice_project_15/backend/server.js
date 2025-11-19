const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

// Default Route
app.get('/',(req,res)=>{
    res.send("Hey There Welcome to Backend!");
});

// Routes
const feedback_route = require('./router/feedback');
app.use('/feedbacks',feedback_route);

app.listen(port,()=>{
    console.log(`Server is Running On Port ${port}`);
});