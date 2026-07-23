# TaskPulse – Role-Based Task Management System

TaskPulse is a full-stack MERN application (MongoDB, Express, React, Node.js) featuring role-based access control (RBAC), authentication state management via React Context (`authcontext.jsx`), and dedicated dashboards for both regular users and system administrators.

---

## Project Structure

Based on the repository structure:

```text
practice_project_20/
├── backend/
│   ├── config/
│   ├── controllers/
│   │   ├── authcontroller.js
│   │   └── taskcontroller.js
│   ├── middleware/
│   │   ├── admin_middleware.js
│   │   └── authmiddleware.js
│   ├── models/
│   │   ├── task.js
│   │   └── user.js
│   ├── routes/
│   │   ├── authroutes.js
│   │   └── taskroutes.js
│   ├── .env
│   ├── db.js
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── createtask.jsx
    │   │   ├── totaltask.jsx
    │   │   └── totalusers.jsx
    │   ├── context/
    │   │   └── authcontext.jsx
    │   ├── pages/
    │   │   ├── admin_dashboard/
    │   │   │   └── adminprofile.jsx
    │   │   └── user_dashboard/
    │   │       ├── login.jsx
    │   │       ├── register.jsx
    │   │       └── userprofile.jsx
    │   ├── Style/
    │   │   └── auth.css
    │   ├── App.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js