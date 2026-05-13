import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styling/login.css";

function Login() {
  // context
  const { user, setUser } = useContext(AuthContext);
  // navigate
  const navigate = useNavigate();
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Logic for login user
  const LoginUser = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        {
          withCredentials: true,
        },
      );
      setUser(response.data); // for storing current user info
      navigate("/profile"); // redirect to profile page after login
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Left Panel */}
        <div className="login-left">
          <div className="app-badge">
            <span className="dot"></span>Notes App
          </div>
          <h1>
            Your thoughts,
            <br />
            <span>organized.</span>
          </h1>
          <div className="divider"></div>
          <p>
            Notes App helps you capture ideas, manage tasks, and stay focused —
            all in one place. Simple, fast, and always in sync.
          </p>
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">✍️</div>Write & format notes
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>Private & secure
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>Fast & lightweight
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <form className="login-right" onSubmit={LoginUser}>
          <div className="form-heading">
            <span className="tag">Welcome back</span>
            <h2>Sign in to continue</h2>
          </div>
          <div className="login-field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="new-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Sign In
          </button>
          <p className="login-switch">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
