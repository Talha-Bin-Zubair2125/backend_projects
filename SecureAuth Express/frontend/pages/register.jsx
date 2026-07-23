import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import "../stylings/register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const { user, setuser } = useContext(AuthContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");

  const navigate = useNavigate();

  const createAcc = async (e) => {
    e.preventDefault();
    const data = { user, email, password, confirm_password };
    try {
      const res = await axios.post("http://localhost:3000/auth/register", data, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const gotosignin = async () => {
    navigate("/");
  };

  return (
    <div className="register-wrapper">

      {/* Brand heading */}
      <div className="auth-brand">
        <span className="auth-brand-name">AuthSystem</span>
        <span className="auth-brand-tagline">Secure · Simple · Fast</span>
      </div>

      <div className="register-card">
        <div className="register-left">
          <span className="tag">New here?</span>
          <h2>
            Create your <em>account</em>
          </h2>
          <div className="divider"></div>
          <p>
            Join in seconds. Fill in your details and you're good to go — no
            friction, just fast and secure signup.
          </p>
        </div>

        <form className="register-right" onSubmit={createAcc}>
          <div className="register-field">
            <label>Full name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={user}
              required
              onChange={(e) => setuser(e.target.value)}
            />
          </div>
          <div className="register-field">
            <label>Email address</label>
            <input
              type="text"
              placeholder="you@example.com"
              value={email}
              required
              autoComplete="new-email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="register-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="register-field">
            <label>Confirm password</label>
            <input
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              value={confirm_password}
              onChange={(e) => setconfirm_password(e.target.value)}
            />
          </div>
          <button type="submit" className="register-btn">
            Create Account
          </button>
          <p className="register-switch">
            Already have an account?{" "}
            <span onClick={gotosignin}>Sign in</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;