import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  let [title, settitle] = useState("");
  let [Blog_Content, setBlog_Content] = useState("");
  let [author_name, setauthor_name] = useState("");
  let [date, setdate] = useState("");
  let [start_date, setstartdate] = useState("");
  let [end_date, setenddate] = useState("");
  const [response, setresponse] = useState([]);
  const [notification, setNotification] = useState(null);

  let post_blog_data = async () => {
    let data = { title, Blog_Content, author_name, date };

    try {
      let data_to_send = await axios.post(
        "http://localhost:3000/blog/addblog",
        data
      );
      setresponse(data_to_send.data);

      setNotification({
        type: "success",
        message: "Blog Successfully Added!",
      });
    } catch (error) {
      setresponse("Error Sending Blog Data");

      setNotification({
        type: "error",
        message: "Failed to Add Blog!",
      });
    }
  };

  let get_blog_data = async () => {
    try {
      let data_from_backend = await axios.get(
        "http://localhost:3000/blog/getblog"
      );

      setresponse(data_from_backend.data);

      setNotification({
        type: "success",
        message: "Fetched Blog Data Successfully!",
      });
    } catch (error) {
      setresponse("Error Fetching Blog Data");

      setNotification({
        type: "error",
        message: "Failed to Fetch Blog Data!",
      });
    }
  };

  let search_blog_data = async () => {
    try {
      let data_searched = await axios.get(
        "http://localhost:3000/blog/searchdata",
        {
          // params sends data via URL it is the key in config object that axios understands and each key: value pairs becomes query parameters and Axios converts to URL query parameters automatically.
          params: {
            startdate: start_date,
            enddate: end_date,
          },
        }
      );
      console.log(data_searched);
      setresponse(data_searched.data);
      setNotification({
        type: "success",
        message: "Fetched Blog Data Successfully!",
      });
    } catch (error) {
      setresponse("Error Fetching Blog Data");

      setNotification({
        type: "error",
        message: "Failed to Fetch Blog Data!",
      });
    }
  };

  return (
    <>
      <div className="container">
        <h1>Blog Management API</h1>

        <input
          type="text"
          value={title}
          placeholder="Enter the Title Blog"
          onChange={(e) => settitle(e.target.value)}
        />

        <textarea
          cols={40}
          rows={15}
          value={Blog_Content}
          placeholder="Enter the Blog Content"
          onChange={(e) => setBlog_Content(e.target.value)}
        ></textarea>

        <input
          type="text"
          value={author_name}
          placeholder="Enter the Author Name"
          onChange={(e) => setauthor_name(e.target.value)}
        />

        <label>
          Enter the Date of Blog Publication
          <input
            type="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </label>

        <button onClick={post_blog_data}>Submit Data</button>
        <button onClick={get_blog_data}>Get Blog Data</button>
        <button onClick={search_blog_data}>Search Blog Data</button>
        <div>
          {/* Fields for Start and End Date */}
          <label>
            Enter the Start Date
            <input
              type="date"
              value={start_date}
              onChange={(e) => setstartdate(e.target.value)}
            />
          </label>
          <label>
            Enter the End Date Date
            <input
              type="date"
              value={end_date}
              onChange={(e) => setenddate(e.target.value)}
            />
          </label>
        </div>
        {/* Notification Box */}
        {/* Short-Circuit AND && in JS which means if it is true then the expression after && is executed and if not then another block which we say else is exceuted*/}
        {notification && (
          <div
            className={`notification ${
              notification.type === "success" ? "success" : "error"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Response Output */}
        {/* Coverting the Object in String along with the indentation which is 2 and with filter parameter */}
        <div className="response-box">{JSON.stringify(response, null, 2)}</div>
      </div>
    </>
  );
}

export default App;
