const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { error } = require('console');
const { json } = require('stream/consumers');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;


// Default Route
app.get('/',(req,res)=>{
    res.send("Hey There I Am Backend");
});

// Route for Adding Tasks -- End Point (/AddTasks)
app.post('/AddTasks',(req,res)=>{
    // accepting data from frontend
    const data_from_frontend = req.body;
    
    /*
        As data is in form of array of objects so we have to extract it and store it in a var
        and if there is a single obj there is no need of extraction

    */

    const tasks = data_from_frontend.map((value,index)=>{
        // Just for Debugging
        console.log("Inside Loop",value.Task);
        // For Return we have to return something inside it (Manually Write)
        return value.Task
    });

    // Used For Debugging
    console.log(tasks);

    // Converting tasks into string (because JSON.stringify(tasks) itself doesn't return anything so we have to save data in a var)
    const data_of_tasks = JSON.stringify(tasks);


    /*
        Error : TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string...

        fs.writeFile() only accepts:
        
        a string, or
        a Buffer, or
        a typed array (like Uint8Array)

        so we can't directly store array in a file we have to covert it into string or some other type

    */

    fs.writeFile('Tasks.txt',data_of_tasks,()=>{
        console.log('Date Saved');
    });

    res.json({Saved:"Successfully"});
    
});

// Route for Getting All Tasks -- EndPoint (/Tasks)
app.get('/Tasks',(req,res)=>{
    // Reading Data from the file

    /*
        When you read a file using Node’s fs.readFile() (or fs.readFileSync()), the data you get is not a plain string by default — it’s a Buffer.

        A Buffer is a special type of object in Node.js that stores binary data (raw bytes).
        It’s efficient for handling files, images, or network data — but not human-readable directly.

        For Making it Readable -- Two Ways
        1. data.toString()
        2. used encoding utf-8 -- no need to convert


    */
    fs.readFile('Tasks.txt','utf-8',(error,data)=>{
        // Used For Debugging
        console.log(error,data);
        // JSON.parse() it converts JSON string → JavaScript object or array
        res.json(JSON.parse(data)); 
    });
});

// For Delete we use app.delete()
app.delete('/DelTasks',(req,res)=>{
    /*
        for deleting a file we use two methods one is based on non-blocking mechanism and other one is based on blocking mechanism

        fs.unlink() or fs.unlinkSync()

    */

    fs.unlink('Tasks.txt',(error)=>{
        if (error) {
            res.json({"Status":error});
        }
        else{
            res.json({"Status":"Successfully Deleted"});
        }
    })
});

app.listen(port,(req,res)=>{
    console.log(`Server is Running On Port ${port}`);
});