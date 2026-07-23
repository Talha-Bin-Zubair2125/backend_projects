const express = require('express');
const cors = require('cors');
// Marked is a Node.js library that converts Markdown text → HTML.
// It’s basically a Markdown parser — meaning it reads Markdown syntax and translates it into HTML elements that browsers can understand.

/*

    This imports the marked library into your file.
    It uses destructuring to get the marked function from the library.

    const html = marked(markdownText);
    You pass your Markdown content (string) into the function.
    marked() parses that Markdown and returns HTML as a string.

    it can used both at frontend as well as backend

*/
const {marked} = require('marked');
const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

// Default Route
app.get('/',(req,res)=>{
    res.send('Hey There I Am From Backend');
});

// Route for Convertion -- End Point --(/data)
app.post('/data',(req,res)=>{
    const data_received_from_frontend = req.body;
    
    /*
        Used For Debugging
        console.log(data_received_from_frontend.data);
    */
    
    // the marked() parses the marked text and converts it into HTML
    const html = marked(data_received_from_frontend.data);
    res.json({"Converted" : html});

});

app.listen(port,()=>{
    console.log(`Server is Running at Port ${port}`);
    
});