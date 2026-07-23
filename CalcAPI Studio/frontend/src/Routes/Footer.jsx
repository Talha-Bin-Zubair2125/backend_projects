import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <style>{`
        footer {
          background-color: #f1f1f1;
          padding: 15px;
          text-align: center;
          margin-top: 40px;
        }
        footer a {
          margin: 0 10px;
          text-decoration: none;
          color: #333;
          font-weight: bold;
        }
        footer a:hover {
          color: #4CAF50;
        }
      `}</style>

      <footer>
        <Link to="/">Home</Link>  
        <Link to="/Add">Addition</Link>
        <Link to="/Sub">Subtraction</Link>
        <Link to="/Mul">Multiplication</Link>
        <Link to="/Divide">Divide</Link>
      </footer>
    </>
  );
}

export default Footer;
