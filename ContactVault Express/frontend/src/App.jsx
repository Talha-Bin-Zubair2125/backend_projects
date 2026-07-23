import { useState } from "react";
import "./App.css";

function App() {
  // States
  let [ID, SetID] = useState(0);
  let [FirstName, SetFirstName] = useState("");
  let [LastName, SetLastName] = useState("");
  let [Email, SetEmail] = useState("");
  let [Address, SetAddress] = useState("");
  let [Users_Data, setUsers_Data] = useState([]);
  let [responsefrombackend, setresponse] = useState("");

  // Save Data Function
  let SaveData = () => {
    let newID = ID + 1;
    SetID(newID);

    let newUser = {
      ID: newID,
      First_Name: FirstName,
      Last_Name: LastName,
      Email: Email,
      Address: Address,
    };

    setUsers_Data([...Users_Data, newUser]);
    SubmitData(newUser);
  };

  // POST Data
  let SubmitData = async (user) => {
    const res = await fetch("http://localhost:3000/Contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    setresponse(data);
  };

  // GET Data
  let GetContacts = async () => {
    const res = await fetch("http://localhost:3000/GetContacts");
    const data = await res.json();
    setresponse(data);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="form-title">📇 Contact Management</h1>
        <p className="subtitle">
          Save and view your contacts easily using this simple interface.
        </p>

        {/* Form Section */}
        <div className="form">
          {/* ID Field */}
          <div className="form-row">
            <label>ID:</label>
            <input type="text" value={ID} disabled />
          </div>

          {/* First and Last Name */}
          <div className="form-row">
            <label>First Name:</label>
            <input
              type="text"
              placeholder="Enter first name"
              onChange={(e) => SetFirstName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label>Last Name:</label>
            <input
              type="text"
              placeholder="Enter last name"
              onChange={(e) => SetLastName(e.target.value)}
            />
          </div>

          {/* Email and Address */}
          <div className="form-row">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => SetEmail(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label>Address:</label>
            <input
              type="text"
              placeholder="Enter address"
              onChange={(e) => SetAddress(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button className="btn primary" onClick={SaveData}>
              💾 Save Data
            </button>
            <button className="btn secondary" onClick={GetContacts}>
              📂 Get Contacts
            </button>
          </div>

          {/* 
            JSON.stringify()
            Second Parameter  -- replacer This is the “replacer” parameter. It lets you control which properties get stringified. (filters out data)
            Third Parameter -- It controls indentation (pretty printing). It makes the output readable by adding spaces.
          */}
          {/* Response */}
          {responsefrombackend && (
          <div className="response-box">
            <h3>📤 Backend Response:</h3>
            <pre>{JSON.stringify(responsefrombackend, null, 2)}</pre>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
