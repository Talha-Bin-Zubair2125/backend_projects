import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <style>{`
        nav {
          background-color: #333;
          padding: 15px;
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        nav a {
          color: white;
          text-decoration: none;
          font-weight: bold;
          padding: 8px 12px;
          border-radius: 6px;
          transition: 0.3s;
        }
        nav a:hover {
          background-color: #555;
        }
      `}</style>

      <nav>
        <Link to="/">Home</Link>  
        <Link to="/Add">Addition</Link>
        <Link to="/Sub">Subtraction</Link>
        <Link to="/Mul">Multiplication</Link>
        <Link to="/Divide">Divide</Link>
      </nav>
    </>
  );
}

export default Navbar;
