import { useState } from "react";

function App() {
  // State for First Name,last Name, Age
  let [FirstName, setFirstName] = useState("");
  let [LastName, setLastName] = useState("");
  let [age, setage] = useState(Number(0));
  // Users
  let [users, setusers] = useState([]);
  let AddUser = () => {
    setusers([
      ...users,
      {
        "First Name": FirstName,
        "Last Name": LastName,
        "Age": age,
      },
    ]);
    console.log(users);
    
  };
  
  // Post Data
  const submit = async () =>{
      const res = await fetch("http://localhost:3000/User",{
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(users),
      })
        const data = await res.json();
        console.log(data);
  }; 
  // Get Data
  const getdata = async () =>{
      const res = await fetch("http://localhost:3000/GetUsers")
      const data = await res.json();
      console.log(data);
  }; 
  return (
    <>
      <div>
        {/* First Name */}
        <div>
          <input
            type="text"
            name=""
            id=""
            value={FirstName}
            placeholder="Enter Your First  Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        {/* Last Name */}
        <div>
          <input
            type="text"
            name=""
            id=""
            value={LastName}
            placeholder="Enter Your Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        {/* Age */}
        <div>
          <input
            type="number"
            name=""
            id=""
            value={age}
            onChange={(e) => {
              setage(e.target.value);
            }}
          />
        </div>
        {/* Button */}
        <button onClick={() => AddUser()}>Add User</button>
        <button onClick={submit}>Submit Data</button>
        <button onClick={getdata}>Get User Data</button>
      </div>
    </>
  );
}

export default App;
