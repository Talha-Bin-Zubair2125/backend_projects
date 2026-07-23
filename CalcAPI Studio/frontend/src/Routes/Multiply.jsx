import React, { useState } from "react";
import { Link } from "react-router-dom";

function Multiply() {
  let [num1, setnum1] = useState(Number(0));
  let [num2, setnum2] = useState(Number(0));

  const submitdata = async () => {
    const res = await fetch("http://localhost:3000/Mul", {
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
        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 50px auto;
          padding: 20px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          width: 350px;
        }
        h1 {
          color: #3F51B5;
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
          background-color: #3F51B5;
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover {
          background-color: #303f9f;
        }
      `}</style>

      <Link to="/Mul">
        <div className="card">
          <h1>Multiplication</h1>
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

export default Multiply;
