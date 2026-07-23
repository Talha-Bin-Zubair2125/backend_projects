import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // States

  // (Single Task)
  let [task, settask] = useState("");
  // (Storage Of Mutiple Tasks)
  let [tasks, settasks] = useState([]);
  // Response
  let [Response, setResponse] = useState("");

  let alltasks = () => {
    /*
      React States are asynchronous, meaning React schedules the update — it doesn’t happen instantly. so whatever function we write after this is called immediately
      so best way is to store the data in temp var and after this update the state var and call the desired func
    */
   
    const updatedTasks = [...tasks, { Task: task }];
    settasks(updatedTasks);
    addtasks(updatedTasks);
  };

  // Function for Adding Tasks
  /* http://localhost:3000/AddTasks */

  let addtasks = async (tasks) => {
    const data_to_backend = await axios.post(
      "http://localhost:3000/AddTasks",
      tasks
    );
    setResponse(data_to_backend.data);
  };

  // Function for Getting Tasks
  /* http://localhost:3000/Tasks */

  let gettasks = async () => {
    const data_from_backend = await axios.get("http://localhost:3000/Tasks");
    setResponse(data_from_backend.data);
  };

  // Function for Deleting all Tasks
  /* http://localhost:3000/DelTasks */
  let delalltasks = async () => {
    const del_all_tasks = await axios.delete("http://localhost:3000/DelTasks");
    setResponse(del_all_tasks.data);
  }

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="title">📝 To-Do List App</h1>

        <div className="input-section">
          <input
            type="text"
            value={task}
            placeholder="Enter a new task..."
            onChange={(e) => settask(e.target.value)}
            className="task-input"
          />
          <div className="button-group">
            <button className="btn add" onClick={() => alltasks()}>
              Add Task
            </button>
            <button className="btn get" onClick={() => gettasks()}>
              Get Tasks
            </button>
          </div>
        </div>

        <div className="response-section">
          <h3>Server Response:</h3>
          <pre>{JSON.stringify(Response, null, 2)}</pre>

          <button className="btn delete" onClick={() => delalltasks()}>
            Delete Response
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
