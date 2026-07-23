import { useEffect, useState } from "react";
import "./App.css"; 

function App() {
  // States for FileName and File Content
  let [FileName, SetFileName] = useState("");
  let [FileContent, SetFileContent] = useState("");

  // State for Response
  let [response_from_backend, setresponse] = useState([]);
  // State for Button
  let [btn, setbtn] = useState(false);
  // Save Files Data
  let [data, setdata] = useState([]);

  let createfile = () => {
    setdata([...data, { File_Name: FileName, File_Content: FileContent }]);
    console.log(data);
  };

  // POST Req
  const postdata = async () => {
    const res = await fetch("http://localhost:3000/SaveFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    await res.json();
  };

  // GET Req
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/ReadFile");
      const data = await response.json();
      setresponse([...data]);
    })();
  }, [btn]);

  return (
    <>
      <div className="app-container">
        <h1 className="main-title">📂 File Creator</h1>

        {/* Input Section */}
        <div className="form-container">
          <div className="input-section">
            <label className="label">Enter the File Name</label>
            <input
              type="text"
              placeholder="Enter the File Name"
              className="input-box"
              onChange={(e) => SetFileName(e.target.value)}
            />
          </div>

          <div className="input-section">
            <label className="label">Enter the File Content</label>
            <textarea
              cols={30}
              rows={10}
              placeholder="Enter the File Content"
              className="textarea-box"
              onChange={(e) => SetFileContent(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="btn primary" onClick={createfile}>
            ➕ Create File
          </button>
          <button className="btn success" onClick={postdata}>
            📤 Submit
          </button>
          <button className="btn info" onClick={() => setbtn(true)}>
            📥 Get Data
          </button>
        </div>

        {/* Response List */}
        <div className="file-list">
          <h2 className="list-title">📑 Files from Backend</h2>
          <ul>
            {response_from_backend.map((value, index) => (
              <li key={index} className="file-item">
                <span className="file-name">{value.file}</span>
                <p className="file-content">{value.status}</p>
                <p className="file-content">{value.filecontent}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
