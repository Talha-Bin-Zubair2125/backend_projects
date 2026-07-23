import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../Style/auth.css";

function Login() {
  // States
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [response, setresponse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Submit Function
  let submit_data = async (e) => {
    e.preventDefault();
    setresponse("");
    setError("");

    if (!email || !password) {
      setError("Please Enter the Credentials");
      return;
    }

    let data = { email, password };

    try {
      let response_from_backend = await axios.post(
        "http://localhost:3000/auth/login",
        data
      );
      localStorage.setItem("token", response_from_backend.data.token);
      setresponse("Login Successful");
      const role = response_from_backend.data.user.role;

    setTimeout(() => {
      if (role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/userprofile");
      }
    }, 1000);
     
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Left Side - Header Content */}
      <div className="auth-content-left">
        <h1>Task Management System</h1>
        <p>
          Welcome back! Sign in to access your tasks and continue where you left off. 
          Your productivity journey awaits.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-container">
        {/* Login User */}
        <div className="auth-header">
          <h1>Login</h1>
        </div>
        <div className="auth-form">
          <form onSubmit={submit_data}>
            {/* Email */}
            <label>
              Enter Your Email
              <input
                type="email"
                required
                autoComplete="current-email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </label>
            {/* Password */}
            <label>
              Enter Your Password
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </label>
            {/* Responses */}
            {response && <p className="success-msg">{response}</p>}
            {error && <p className="error-msg">{error}</p>}
            {/* Submit Button */}
            <button type="submit" className="auth-btn">
              Login
            </button>
            <p className="auth-link">
              New here? <Link to="/register">Sign up now!</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;