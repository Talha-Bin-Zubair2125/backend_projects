import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../Style/auth.css";

function Register() {
  // States
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [response, setresponse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Submit Function
  let submitdata = async (e) => {
    e.preventDefault();
    setresponse("");
    setError("");

    if (!name || !email || !password) {
      setError("Please Enter the Credentials");
      return;
    }

    const data = { name, email, password };

    try {
      await axios.post("http://localhost:3000/auth/register", data);
      setresponse("Registration Successful");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Left Side - Header Content */}
      <div className="auth-content-left">
        <h1>Task Management System</h1>
        <p>
          Organize your work and life, finally. Become focused, organized, and calm 
          with our task management system. Start managing your tasks efficiently today.
        </p>
      </div>

      {/* Right Side - Registration Form */}
      <div className="auth-container">
        <div className="auth-header">
          <h1>Create Your Account</h1>
        </div>
        <div className="auth-form">
          <form onSubmit={submitdata}>
            {/* Name */}
            <label>
              Enter Your Name
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </label>
            {/* Email */}
            <label>
              Enter Your Email
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                autoComplete="current-email"
              />
            </label>
            {/* Password */}
            <label>
              Enter Your Password
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </label>

            {/* Responses */}
            {response && <p className="success-msg">{response}</p>}
            {error && <p className="error-msg">{error}</p>}

            {/* Submit Button */}
            <button type="submit" className="auth-btn">
              Register
            </button>

            {/* Link to Login */}
            <p className="auth-link">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;