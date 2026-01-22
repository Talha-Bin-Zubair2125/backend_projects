import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "../Style/auth.css";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

function Totaltask() {
  const { tasks, setTasks } = useContext(AuthContext);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const navigate = useNavigate();

  // Fetch tasks assigned to user
  const Get_Tasks = async () => {
    try {
      setError("");
      setResponseMsg("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please login again.");
        return;
      }

      const res = await axios.get("http://localhost:3000/user/viewtask", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) {
        setTasks(res.data);
        setResponseMsg("Tasks Loaded Successfully!");
        setTimeout(() => setResponseMsg(""), 3000);
      } else {
        setTasks([]);
        setError("No tasks available.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
      setTimeout(() => setError(""), 3000);
    }
  };

  useEffect(() => {
    Get_Tasks();
  }, []);

  // Update task status
  const update_status = async (taskid, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found. Please login again.");
        return;
      }

      const res = await axios.put(
        "http://localhost:3000/user/updatetask",
        { taskid, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedTask = res.data;

      // Update task locally
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );

      setResponseMsg("Task Updated Successfully!");
      setTimeout(() => setResponseMsg(""), 3000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to update task");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Separate tasks
  const pendingTasks = tasks.filter((task) => task.status !== "Completed");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  const TaskCard = ({ task }) => (
    <div className="task-item-card">
      <div className="task-item-header">
        <h3 className="task-title">{task.taskname}</h3>
        <span
          className={`task-status-badge ${
            task.status === "Completed" ? "completed" : "pending"
          }`}
        >
          {task.status || "Pending"}
        </span>
      </div>

      <p className="task-desc">{task.taskdescription}</p>

      <div className="task-item-footer">
        <div className="task-status-control">
          <label htmlFor={`status-${task._id}`}>Update Status:</label>
          <select
            id={`status-${task._id}`}
            value={task.status || "Pending"}
            onChange={(e) => update_status(task._id, e.target.value)}
            disabled={task.status === "Completed"}
            className="task-status-select"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="total-task-wrapper">
      <div className="total-task-container">
        {/* Header */}
        <div className="task-page-header">
          <div>
            <h2>📌 My Tasks</h2>
            <p className="task-stats">
              <span className="stat-item">
                <span className="stat-label">Total:</span>
                <span className="stat-value">{tasks.length}</span>
              </span>

              <span className="stat-divider">|</span>

              <span className="stat-item">
                <span className="stat-label">Pending:</span>
                <span className="stat-value pending-color">
                  {pendingTasks.length}
                </span>
              </span>

              <span className="stat-divider">|</span>

              <span className="stat-item">
                <span className="stat-label">Completed:</span>
                <span className="stat-value completed-color">
                  {completedTasks.length}
                </span>
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="task-header-actions">
            <button
              className="back-dashboard-btn"
              onClick={() => navigate("/userprofile")}
            >
              ← Back to Dashboard
            </button>

            <button className="refresh-task-btn" onClick={Get_Tasks}>
              🔄 Refresh Tasks
            </button>
          </div>
        </div>

        {/* Messages */}
        {responseMsg && (
          <div className="task-msg task-success">{responseMsg}</div>
        )}
        {error && <div className="task-msg task-error">{error}</div>}

        {/* Tab Navigation */}
        <div className="task-tabs">
          <button
            className={`tab-btn ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
          >
            ⏳ Pending Tasks
            <span className="tab-badge">{pendingTasks.length}</span>
          </button>

          <button
            className={`tab-btn ${activeTab === "completed" ? "active" : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            ✅ Completed Tasks
            <span className="tab-badge">{completedTasks.length}</span>
          </button>
        </div>

        {/* Task List */}
        <div className="task-list-section">
          {activeTab === "pending" ? (
            pendingTasks.length > 0 ? (
              <div className="task-grid">
                {pendingTasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            ) : (
              <div className="empty-task-state">
                <div className="empty-icon">🎉</div>
                <h3>No Pending Tasks!</h3>
                <p>Great job! You've completed all your tasks.</p>
              </div>
            )
          ) : completedTasks.length > 0 ? (
            <div className="task-grid">
              {completedTasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <div className="empty-task-state">
              <div className="empty-icon">📭</div>
              <h3>No Completed Tasks</h3>
              <p>Start completing your pending tasks to see them here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Totaltask;
