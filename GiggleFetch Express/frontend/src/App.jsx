import { useState } from "react";
import "./App.css";

function App() {
  // State for Response
  let [Response, setResponse] = useState("");

  let getjokes = async () => {
    const res = await fetch("http://localhost:3000/GetJokes");
    // For Getting Textual Response From Backend
    const data = await res.text();
    setResponse(data);
  };

  return (
    <>
      <div className="app-container">
        <div className="card">
          <h1 className="title">😂 Random Joke API</h1>
          <button className="btn" onClick={getjokes}>
            Generate Joke
          </button>
          <p className="joke">
            {Response ? Response : "Click the button to get a joke!"}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
