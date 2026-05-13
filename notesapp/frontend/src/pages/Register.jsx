import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styling/register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault();

    const data = { username, email, password, confirmPassword };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        data,
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">

        {/* Left Panel */}
        <div className="register-left">
          <div className="app-badge">
            <span className="dot"></span>Notes App
          </div>
          <h1>
            Your thoughts,<br />
            <span>organized.</span>
          </h1>
          <div className="divider"></div>
          <p>
            Notes App helps you capture ideas, manage tasks, and stay focused —
            all in one place. Simple, fast, and always in sync.
          </p>
          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon">✍️</div>
              Write & format notes
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              Private & secure
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              Fast & lightweight
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <form className="register-right" onSubmit={RegisterUser}>
          <div className="form-heading">
            <span className="tag">New here?</span>
            <h2>Create your account</h2>
          </div>

          <div className="register-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              required
              autoComplete="new-email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              required
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="register-field">
            <label>Confirm password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              required
              autoComplete="new-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>

          <p className="register-switch">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Sign in</span>
          </p>
        </form>

      </div>
    </div>
  );
}

export default Register;