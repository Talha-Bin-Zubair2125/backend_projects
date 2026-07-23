import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styling/pages.css";

function Demo_page() {
  // States
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, set_email] = useState("");
  const [company_name, set_company_name] = useState("");
  const [date, set_date] = useState("");
  const [response, setResponse] = useState({ message: "", type: "" });

  let Submit_Data = async (e) => {
    e.preventDefault();

    const data = {
      first_name,
      last_name,
      email,
      company_name,
      date,
    };

    try {
      const data_to_backend = await axios.post(
        "http://localhost:3000/demo/add_demo_data",
        data
      );
      setResponse({ message: "Demo Scheduled Successfully", type: "success" });

      set_first_name("");
      set_last_name("");
      set_email("");
      set_company_name("");
      set_date("");

      setTimeout(() => {
        setResponse({ message: "", type: "" });
      }, 2500);
    } catch (error) {
      console.error(error);
      setResponse({ message: "Failed To Schedule Demo!", type: "error" });
      setTimeout(() => {
        setResponse({ message: "", type: "" });
      }, 2500);
    }
  };

  return (
    <>
      <div className="page-container">
        <h1 className="page-title">Book a Demo</h1>
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

          <input
            type="text"
            placeholder="Company Name"
            value={company_name}
            onChange={(e) => set_company_name(e.target.value)}
            required
          />

          <div className="row">
            <input
              type="date"
              value={date}
              required
              onChange={(e) => set_date(e.target.value)}
            />
          </div>

          <button className="btn" type="submit">
            Book Demo
          </button>

          {/* <Link to="/" className="link-text">
          Back to Home
        </Link> */}
        </form>
        {response.message && (
          <p className={`response ${response.type}`}>{response.message}</p>
        )}
      </div>
    </>
  );
}

export default Demo_page;
