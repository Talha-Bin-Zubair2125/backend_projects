import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // States
  let [name, setname] = useState("");
  let [email, setemail] = useState("");
  let [date, setdate] = useState("");
  let [feedbackmessage, setfeedbackmessage] = useState("");
  let [start_date, setstartdate] = useState("");
  let [end_date, setenddate] = useState("");

  // Response State
  let [Response, setResponse] = useState("");

  // Storing Feedbacks
  let [feedbacksreceived, setfeedbacksreceived] = useState([]);

  // Sending Data to Backend
  let data_to_backend = async () => {
    let feedbacks_from_users = { name, email, date, feedbackmessage };
    try {
      let data = await axios.post(
        "http://localhost:3000/feedbacks/feedbackfromusers",
        feedbacks_from_users
      );
      // Used for debugging
      console.log(data);
      setResponse(data.data);
    } catch (error) {
      console.error(error);
      setResponse("Error sending feedback!");
    }
  };

  // Receiving Data from Backend
  let data_from_backend = async () => {
    try {
      let data_received = await axios.get(
        "http://localhost:3000/feedbacks/getfeedbacks"
      );
      console.log(data_received);
      setfeedbacksreceived(data_received.data);
    } catch (error) {
      console.error(error);
      setResponse("Error fetching feedbacks!");
    }
  };

  // Searching Feedbacks via Date - Range
  let search_feedbacks = async () => {
    try {
      let data_searched = await axios.get(
        "http://localhost:3000/feedbacks/getresults",
        {
          params: {
            startdate: start_date,
            enddate: end_date,
          },
        }
      );
      console.log(data_searched);
      setfeedbacksreceived(data_searched.data);
    } catch (error) {
      console.error(error);
      setResponse("Error fetching feedbacks!");
    }
  };

  return (
    <div className="feedback-container">
      {/* Project Name */}
      <h1 className="feedback-title">Feedback Collection System</h1>

      {/* Name & Email Fields */}
      <div className="feedback-row">
        <input
          type="text"
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setname(e.target.value)}
          className="feedback-input"
        />
        <input
          type="text"
          value={email}
          placeholder="Enter Your Email"
          onChange={(e) => setemail(e.target.value)}
          className="feedback-input"
        />
      </div>

      {/* Date Field */}
      <label className="feedback-label">
        Enter Date
        <input
          type="date"
          value={date}
          onChange={(e) => setdate(e.target.value)}
          className="feedback-input"
        />
      </label>

      {/* Feedback Message Field */}
      <textarea
        cols={30}
        rows={10}
        placeholder="Enter Your Feedback"
        value={feedbackmessage}
        onChange={(e) => setfeedbackmessage(e.target.value)}
        className="feedback-textarea"
      ></textarea>

      {/* Sending Data to Backend */}
      <button onClick={data_to_backend} className="feedback-button">
        Send Feedback
      </button>
      {/* Getting Data from Backend */}
      <button onClick={data_from_backend} className="feedback-button">
        Get Feedbacks
      </button>

      {/* Fetching Records via Date Range */}
      <div className="date-range-container">
        {/* Start Date */}
        <label className="feedback-label date-label">
          Start Date
          <input
            type="date"
            value={start_date}
            onChange={(e) => setstartdate(e.target.value)}
            className="feedback-input date-input"
          />
        </label>
        {/* End Date */}
        <label className="feedback-label date-label">
          End Date
          <input
            type="date"
            value={end_date}
            onChange={(e) => setenddate(e.target.value)}
            className="feedback-input date-input"
          />
        </label>
        <button
          onClick={search_feedbacks}
          className="feedback-button search-btn date-button"
        >
          Search Feedbacks
        </button>
      </div>

      {/* Display Response from Backend */}
      {Response && <div className="feedback-response">{Response}</div>}

      {/* Display All Received Feedbacks */}
      {feedbacksreceived.length > 0 && (
        <div className="feedback-list">
          <h2>All Feedbacks:</h2>
          {feedbacksreceived.map((fb, index) => (
            <div key={index} className="feedback-card">
              <p>
                <strong>Name:</strong> {fb.name}
              </p>
              <p>
                <strong>Email:</strong> {fb.email}
              </p>
              <p>
                <strong>Date:</strong> {fb.date}
              </p>
              <p>
                <strong>Feedback:</strong> {fb.feedbackmessage}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
