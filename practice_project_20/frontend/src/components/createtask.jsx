import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

function Createtask() {
  const { users, setUsers } = useContext(AuthContext);
  const navigate = useNavigate();

  const [taskname, setTaskName] = useState("");
  const [taskdescription, setTaskDescription] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get("http://localhost:3000/admin/getusers", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [setUsers]);

  const submit_task = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const payload = { taskname, taskdescription, assignedUser };

    try {
      await axios.post("http://localhost:3000/admin/createtask", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Task assigned successfully");
      setTaskName("");
      setTaskDescription("");
      setAssignedUser("");
    } catch (error) {
      setMessage("Failed to create task");
      console.error(error);
    }
  };

  const backToDashboard = () => navigate("/admindashboard");

  return (
    <div className="create-task-wrapper">
      <div className="create-task-card">
        <h2>📝 Create & Assign Task</h2>

        {message && <p className="task-msg">{message}</p>}

        <form onSubmit={submit_task} className="create-task-form">
          <label>
            Task Name
            <input
              type="text"
              value={taskname}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              required
            />
          </label>

          <label>
            Task Description
            <textarea
              rows="4"
              value={taskdescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
              required
            ></textarea>
          </label>

          <label>
            Assign To User
            <select
              value={assignedUser}
              onChange={(e) => setAssignedUser(e.target.value)}
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="create-task-btn">
            Assign Task
          </button>
        </form>

        <button className="back-to-dashboard-btn" onClick={backToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Createtask;
