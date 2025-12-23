import React from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styling/pages.css";

function About_Company_and_Social_Links() {
  return (
    <>
        <div className="page-container">
          <h1 className="page-title">About CodeCelix</h1>

          <div className="about-box">
            <p>
              CodeCelix is a modern AI-powered technology company that
              specializes in business automation solutions designed to
              streamline operations, reduce costs, and boost productivity using
              AI and ML technologies.
            </p>

            <h3>Our Mission</h3>
            <p>
              To empower businesses through intelligent automation that drives
              efficiency and growth.
            </p>

            <h3>Our Vision</h3>
            <p>
              To become a global leader in AI-driven business automation
              solutions.
            </p>

            <div className="social-icons">
              <a href="https://linkedin.com/company/codecelix">
                <FaLinkedin />
              </a>
              <a href="https://github.com/codecelix">
                <FaGithub />
              </a>
              <a href="https://instagram.com/codecelix">
                <FaInstagram />
              </a>
            </div>

            {/* <Link to="/" className="link-text">Back to Home</Link> */}
          </div>
        </div>
    </>
  );
}

export default About_Company_and_Social_Links;
