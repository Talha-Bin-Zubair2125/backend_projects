const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());
let contacts = [];

// Default Route
app.get('/',(req,res)=>{
    res.send('Hey There! I Am Backend')
});


/*
    Error : Limit to 6 
    
    In your backend code, you are logging the POST body, but you never save it anywhere (not in memory, not in a file, not in a DB).

    That means each time you POST /Contact, it just logs the data to the console, then the request ends without a response body.

    Since there’s no res.send() or res.json(), Express will hang the connection after a few requests, and the client may appear to “stop” working (sometimes around 6 requests, depending on how the browser handles keep-alive connections).

*/


// POST Req (/Contact)
app.post('/Contact',(req,res)=>{
    const data = req.body;
    console.log(data);
    // Save the Contacts
    contacts.push(data);
    res.json({message:"Contact Saved"})
});

// GET Req (/GetContacts)
app.get('/GetContacts',(req,res)=>{
    // res in JSON format
    res.json(contacts);
});

// Starting Server
app.listen(port,()=>{
    console.log(`Server is Starting at Port ${port}`);
});
