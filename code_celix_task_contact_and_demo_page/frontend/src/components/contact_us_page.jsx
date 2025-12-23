import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styling/pages.css";

function Contact_us_page() {
  // States
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, set_email] = useState("");
  const [assistance, set_assistance] = useState("");
  const [response, setResponse] = useState({ message: "", type: "" });

  let Submit_Data = async (e) => {
    
    e.preventDefault();

    const data = {
      first_name,
      last_name,
      email,
      assistance,
    };

    try {
      const data_to_backend = await axios.post(
        "http://localhost:3000/contact/addcontact",
        data
      );
      setResponse({ message: "Data Saved Successfully", type: "success" });

      set_first_name("");
      set_last_name("");
      set_email("");
      set_assistance("");

      setTimeout(() => {
        setResponse({ message: "", type: "" });
      }, 2500);
    } catch (error) {
      console.error(error);
      setResponse({ message: "Failed To Save Data!", type: "error" });
      setTimeout(() => {
        setResponse({ message: "", type: "" });
      }, 2500);
    }
  };

  return (
    <>
      <div className="page-container">
        <h1 className="page-title">Contact Us</h1>
        {/* HTML Validation Runs Only when the form is submitted normally. Becuase Form Handles the submission and Button Triggers the Submission
            Browser Handles validation automatically before calling your React handler
        */}
        <form className="form-box" onSubmit={Submit_Data}>
          <div className="row">
            <input
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => set_first_name(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => set_last_name(e.target.value)}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => set_email(e.target.value)}
            required
          />

          <textarea
            placeholder="How can we help you?"
            rows="5"
            value={assistance}
            onChange={(e) => set_assistance(e.target.value)}
          ></textarea>

          <button className="btn" type="submit">Submit</button>

          {/* <Link to="/" className="link-text">
          Back to Home
        </Link> */}
        </form>
        
        {/* Response Message */}
        {response.message && (
          <p className={`response ${response.type}`}>{response.message}</p>
        )}
      </div>
    </>
  );
}

export default Contact_us_page;
