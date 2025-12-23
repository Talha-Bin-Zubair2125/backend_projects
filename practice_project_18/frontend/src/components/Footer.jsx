import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/Logo.jfif";
import "../Stylings/Navbar_Footer_Style.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={Logo} alt="Nutro Jenix Logo" />
          <h2>Nutro Jenix</h2>
          <p>Pakistan's #1 Nutrition Store</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/search_product">Search Product</Link>
          <Link to="/browse_product">Browse Products</Link>
          <Link to="/add_product">Add New Products</Link>
        </div>
      </div>
      <p className="footer-copy">© 2025 Nutro Jenix. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
