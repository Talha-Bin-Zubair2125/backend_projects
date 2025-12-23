import React from "react";
import { Link } from "react-router-dom";
import Banner from "../Images/Banner.webp";
import "../Stylings/Home.css";

function Home() {
  return (
    <div className="home-container">
      <img src={Banner} alt="Nutro Jenix Offer" className="home-banner" />

      <div className="home-buttons">
        <Link to="/browse_product" className="btn">
          Browse Products
        </Link>
        <Link to="/search_product" className="btn">
          Search Products
        </Link>
      </div>
    </div>
  );
}

export default Home;
