import { useState } from "react";

function App() {
  // State for UserName and response
  let [UserName, setUserName] = useState("");
  let [response, setresponse] = useState("");

  const senddata = async () => {
    const res = await fetch("http://localhost:3000/Message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: UserName }),
    });
    const data = await res.json();
    setresponse(data.message);
  };

  const getuser = async () => {
    const res = await fetch("http://localhost:3000/");
    const data = await res.json();
    console.log(data.text);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={UserName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <button onClick={senddata}>Add UserName</button>
        <button onClick={getuser}>Add UserName</button>

        <p>{response}</p>
      </div>
    </>
  );
}

export default App;
