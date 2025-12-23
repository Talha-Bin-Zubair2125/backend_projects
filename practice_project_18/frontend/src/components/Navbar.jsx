import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.jfif";
import "../Stylings/Navbar_Footer_Style.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <img src={Logo} alt="Nutro Jenix Logo" />
        </div>

        {/* Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/search_product">Search Product</Link>
          <Link to="/browse_product">Browse Products</Link>
          <Link to="/add_product">Add New Products</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
