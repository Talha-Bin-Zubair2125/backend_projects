import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../style/login.css";

function Login() {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Submit Function
  const submitData = async (e) => {
    e.preventDefault();
    setResponse("");
    setError("");

    if (!email || !password) {
      setError("Please enter your credentials");
      return;
    }

    setIsLoading(true);
    const data = { email, password };

    try {
      const responseFromBackend = await axios.post(
        "http://localhost:3000/auth/login",
        data,
      );
      localStorage.setItem("token", responseFromBackend.data.token);
      setResponse("Login successful!");
      const role = responseFromBackend.data.user.role;

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admindashboard");
        } else if (role === "author") {
          navigate("/authordashboard");
        } else {
          navigate("/userprofile");
        }
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to continue to your account</p>
        </div>

        <form onSubmit={submitData} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              required
              autoComplete="current-email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {response && (
            <div className="alert alert-success">
              <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {response}
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <svg className="alert-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="auth-link">
            Don't have an account?{" "}
            <Link to="/register" className="auth-link-anchor">
              Create one now
            </Link>
          </p>
        </form>
      </div>

      <div className="background-decoration">
        <div className="decoration-circle decoration-circle-1"></div>
        <div className="decoration-circle decoration-circle-2"></div>
        <div className="decoration-circle decoration-circle-3"></div>
      </div>
    </div>
  );
}

export default Login;