import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // States
  let [text, setText] = useState("");
  let [response, setResponse] = useState("");

  // Function for Conversion
  let Convert = async () => {
    try {
      const data_to_backend = await axios.post("http://localhost:3000/data", {
        data: text,
      });
      setResponse(data_to_backend.data);
    } catch (error) {
      setResponse({ Converted: "⚠️ Error: Unable to connect to backend" });
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="card glass-effect">
          <h1 className="heading gradient-text">Markdown → HTML Converter</h1>

          <textarea
            className="textarea input-box"
            cols={40}
            rows={10}
            placeholder="✨ Write your Markdown text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button className="btn neon-btn" onClick={Convert}>
            ⚙️ Convert Now
          </button>

          <textarea
            className="textarea output-box"
            cols={40}
            rows={10}
            value={response.Converted || ""}
            readOnly
            placeholder="Your converted HTML will appear here..."
          ></textarea>
        </div>
      </div>

     
    </>
  );
}

export default App;
