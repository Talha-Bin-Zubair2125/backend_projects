import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../stylings/login.css";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const signInAcc = async (e) => {
    const data = { email, password };
    try {
      const res = await axios.post("http://localhost:3000/auth/login", data, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/profile");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const gotosignup = async () => {
    navigate("/signup");
  };

  return (
    <div className="login-wrapper">

      {/* Brand heading */}
      <div className="auth-brand">
        <span className="auth-brand-name">AuthSystem</span>
        <span className="auth-brand-tagline">Secure · Simple · Fast</span>
      </div>

      <div className="login-card">
        <div className="login-left">
          <span className="tag">Welcome back</span>
          <h2>
            Sign in to <em>continue</em>
          </h2>
          <div className="divider"></div>
          <p>
            Good to see you again. Enter your credentials below to access your
            account securely.
          </p>
        </div>

        <form
          className="login-right"
          onSubmit={(e) => {
            e.preventDefault();
            signInAcc();
          }}
        >
          <div className="login-field">
            <label>Email address</label>
            <input
              type="text"
              placeholder="you@example.com"
              autoComplete="new-email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Sign In
          </button>
          <p className="login-switch">
            Don't have an account?{" "}
            <span onClick={gotosignup}>Register</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;