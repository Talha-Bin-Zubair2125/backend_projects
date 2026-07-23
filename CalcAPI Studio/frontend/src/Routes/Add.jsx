import React, { useState } from "react";
import { Link } from "react-router-dom";

function Add() {
  let [num1, setnum1] = useState(Number(0));
  let [num2, setnum2] = useState(Number(0));

  /*
    For Posting Values Via URL
    const submitdata = async () => {
        const res = await fetch(`http://localhost:3000/Add?num1=${num1}&num2=${num2}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ num1, num2 }),
        });
        const data = await res.json();
        console.log(data);
    };
    
  */

    const submitdata = async () => {
    const res = await fetch(`http://localhost:3000/Add?num1=${num1}&num2=${num2}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ num1, num2 }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <style>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 50px;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
          width: 350px;
          margin-left: auto;
          margin-right: auto;
        }
        h1 {
          color: #4CAF50;
          margin-bottom: 20px;
        }
        input {
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          width: 90%;
        }
        button {
          padding: 10px 20px;
          background-color: #4CAF50;
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover {
          background-color: #45a049;
        }
      `}</style>

      <Link to="/Add">
        <div className="container">
          <h1>Addition</h1>
          <input
            type="number"
            placeholder="Enter Number#1"
            onChange={(e) => setnum1(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Number#2"
            onChange={(e) => setnum2(e.target.value)}
          />
          <button onClick={submitdata}>Submit Data</button>
        </div>
      </Link>
      
    </>
  );
}

export default Add;
