# User Registry App

A full-stack web application built using **React (Vite)** on the frontend and **Express.js** on the backend. This project allows users to input user details (First Name, Last Name, Age), store them locally in state, batch-submit the list to an Express API server, and fetch the stored user records.

---

## 🚀 Features

- **Form Inputs:** Input First Name, Last Name, and Age with controlled React state.
- **Local List Aggregation:** Accumulate multiple user objects on the frontend before submitting.
- **Batch Submission (`POST /User`):** Send user arrays to the Express backend memory array.
- **Fetch Stored Records (`GET /GetUsers`):** Retrieve the updated user list from the backend server.
- **CORS Enabled:** Seamless client-server communication using standard `fetch` API calls.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (via Vite)
- **Language:** JavaScript (ES6+)
- **State Management:** React Hooks (`useState`)
- **HTTP Client:** Fetch API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Middleware:** `cors`, `express.json`

---

## 📁 Folder Structure

```text
practice_project_2/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
└── frontend/
    ├── node_modules/
    ├── src/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── vite.config.js