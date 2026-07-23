import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <style>{`
        .home {
          text-align: center;
          margin-top: 80px;
        }
        h1 {
          color: #333;
          margin-bottom: 30px;
        }
        .links {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .links a {
          text-decoration: none;
          background: #4CAF50;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: bold;
          transition: 0.3s;
        }
        .links a:hover {
          background: #388e3c;
        }
      `}</style>

      <div className="home">
        <h1>Click to Continue</h1>
        <div className="links">
          <Link to="/Add">Addition</Link>
          <Link to="/Sub">Subtraction</Link>
          <Link to="/Mul">Multiplication</Link>
          <Link to="/Divide">Divide</Link>
        </div>
      </div>
    </>
  );
}

export default Home;
