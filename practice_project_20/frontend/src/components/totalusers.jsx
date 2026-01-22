import React, { useContext } from "react";
import { AuthContext } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Totalusers() {
  const { users, setUsers } = useContext(AuthContext);
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return alert("Please login first");

      const { data } = await axios.get("http://localhost:3000/admin/getusers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setUsers(data);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const backToDashboard = () => {
    navigate('/admindashboard');
  };

  return (
    <div className="users-table-container">
      {/* Table Header Section */}
      <div className="users-table-header">
        <h2>User Management</h2>
        <p>
          View and manage all registered users in your system. Monitor user roles, 
          contact information, and account details at a glance.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="users-stats-bar">
        <div className="users-count">
          <span className="users-count-badge">{users.length}</span>
          <span className="users-count-label">Total Registered Users</span>
        </div>
        <button className="refresh-users-btn" onClick={getUsers}>
          Refresh Users
        </button>
      </div>

      {/* Table or Empty State */}
      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3>No Users Found</h3>
          <p>
            There are currently no registered users in the system. 
            New users will appear here once they sign up.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>User Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user_data) => (
                <tr key={user_data._id}>
                  <td>
                    <div className="user-name-cell">{user_data.name}</div>
                  </td>
                  <td>
                    <div className="user-email">{user_data.email}</div>
                  </td>
                  <td>
                    <span
                      className={`user-role-badge ${
                        user_data.role === "admin"
                          ? "user-role-admin"
                          : "user-role-user"
                      }`}
                    >
                      {user_data.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Back to Dashboard Button */}
      <button className="back-to-dashboard-from-table" onClick={backToDashboard}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default Totalusers;