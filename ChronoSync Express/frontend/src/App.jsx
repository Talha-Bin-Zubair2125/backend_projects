import { useState } from "react";
import "./App.css";

function App() {
  // State for Time Format
  let [format, setformat] = useState("");
  // Response
  let [Response, setResponse] = useState("");
  let Submit_Time = async () => {
    // POST Data
    const res = await fetch(`http://localhost:3000/Time?format=${format}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({format}),
    });
    const data = await res.json();
    console.log(data);
    setResponse(data);
  };
  return (
    <>
      <div>
        {/* Select Option */}
        <div>
          <h1>Choose the Following Options</h1>
          <select
            name=""
            id=""
            value={format}
            onChange={(e) => setformat(e.target.value)}
          >
            <option value="Select Option">Select Option</option>
            <option value="12">12 Hour Format</option>
            <option value="24">24 Hour Format</option>
          </select>
        </div>
        <div>
          <button onClick={Submit_Time}>Submit Time</button>
        </div>
      </div>

      {/* Result */}
      {format === "12" ? (
        <>
          <h1>Time</h1>
          <p>{Response.message}</p>
          <p>{Response.date}</p>
          <p>{Response.time}</p>
        </>
      ) : (
        <>
          <h1>Time</h1>
          <p>{Response.message}</p>
          <p>{Response.date}</p>
          <p>{Response.time}</p>
        </>
      )}
    </>
  );
}

export default App;
