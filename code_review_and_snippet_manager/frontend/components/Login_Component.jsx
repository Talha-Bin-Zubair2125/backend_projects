import React, { useState } from "react";
import { useAuth } from "../context/Auth_Context";
import axios from "axios";

function Login_Component() {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Consuming Context 
  const {setUser,setisAuthenticated} = useAuth();
  // send data to backend for authentication
  const handleSubmit = async () => {
    const data = { email, password };
    try {
      const response = axios.post("", data);
    } catch (error) {
      console.error(error);
    }
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor=""></label>
        <input
          type="text"
          name=""
          id=""
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor=""></label>
        <input
          type="password"
          name=""
          id=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign In</button>
      </form>
    );
  };
}

export default Login_Component;
