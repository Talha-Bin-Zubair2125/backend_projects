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
  const [msgType, setMsgType] = useState(""); // success | error
  const [tasks, setTasks] = useState([]);
  const [status,setstatus] = useState("Pending");
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(
          "http://localhost:3000/admin/getusers",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setUsers(data);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load users");
        setMsgType("error");
      }
    };

    fetchUsers();
  }, [setUsers]);

  // Fetch Tasks
  const view_tasks = async () => {
    const token = localStorage.getItem("token");
    setIsLoadingTasks(true);
    try {
      const { data } = await axios.get("http://localhost:3000/admin/gettasks", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(data);
    

      setMessage("Tasks fetched successfully!");
      setMsgType("success");
    } catch (error) {
      setMessage("Failed to fetch tasks");
      setMsgType("error");
      console.error(error);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  // Submit Task
  const submit_task = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const payload = { taskname, taskdescription, assignedUser,status };

    try {
      await axios.post("http://localhost:3000/admin/createtask", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Task assigned successfully!");
      setMsgType("success");

      setTaskName("");
      setTaskDescription("");
      setAssignedUser("");

      // Auto refresh tasks
      view_tasks();
    } catch (error) {
      setMessage("Failed to create task");
      setMsgType("error");
      console.error(error);
    }
  };

  const backToDashboard = () => navigate("/admindashboard");

  return (
    <div className="create-task-page-wrapper">
      {/* Navbar */}
      <div className="task-navbar">
        <div className="task-logo">📋 Task Management</div>
        <button className="back-nav-btn" onClick={backToDashboard}>
          ← Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div className="create-task-content">
        {/* Create Task Section */}
        <div className="create-task-card">
          <div className="task-card-header">
            <h2>📝 Create & Assign Task</h2>
            <p>Assign new tasks to team members</p>
          </div>

          {message && (
            <div
              className={`task-msg ${msgType === "error" ? "task-error" : "task-success"}`}
            >
              {message}
            </div>
          )}

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
                {users?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit" className="create-task-btn">
              Assign Task
            </button>
          </form>
        </div>

        {/* Tasks Display Section */}
        <div className="tasks-display-section">
          <div className="tasks-header">
            <div>
              <h3>📌 Assigned Tasks</h3>
              <p>View and manage all assigned tasks</p>
            </div>
            <button
              className="view-task-btn"
              onClick={view_tasks}
              disabled={isLoadingTasks}
            >
              {isLoadingTasks ? "Loading..." : "Refresh Tasks"}
            </button>
          </div>

          <div className="tasks-list">
            {tasks.length === 0 ? (
              <div className="empty-tasks-state">
                <div className="empty-icon">📭</div>
                <h4>No Tasks Available</h4>
                <p>
                  Click "Refresh Tasks" to load tasks or create a new one above.
                </p>
              </div>
            ) : (
              <div className="task-grid">
                {tasks.map((task) => (
                  <div className="task-item" key={task._id}>
                    <div className="task-item-header">
                      <h4 className="task-title">{task.taskname}</h4>
                      <span
                        className={`task-status-badge ${task.status?.toLowerCase() || "pending"}`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <p className="task-desc">{task.taskdescription}</p>

                    <div className="task-meta">
                      <div className="task-user-info">
                        <span className="task-user-icon">👤</span>
                        <div>
                          <span className="task-meta-label">Assigned to</span>
                          <span className="task-meta-value">
                            {task?.assignedUser?.name || task.assignedUser}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createtask;
