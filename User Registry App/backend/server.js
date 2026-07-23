const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const Port = 3000;


// If you want GET to return the users you’ve added, you need to store them somewhere in your backend
let users = [];

app.get('/',(req,res)=>{
    res.send("Hello I Am Backend"); 
});

app.get('/GetUsers',(req,res)=>{
    res.json(users);
});

app.post('/User',(req,res)=>{
    const data = req.body;
    console.log(data);
    // Add user(s) to storage
    if (Array.isArray(data)) {
        users = [...users, ...data];
        console.log(users);  
    }
    res.json({message:"User Added Successfully"})
    
})


app.listen(Port,()=>{
    console.log(`Server Running on Port ${Port}`);
});