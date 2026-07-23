# React Express User Connection App

A minimalist full-stack web application built using **React (Vite)** on the frontend and **Express.js** on the backend. This project demonstrates basic client-server communication using `fetch` API, state management with React Hooks (`useState`), JSON body parsing, and CORS handling.

---

## 🚀 Features

- **Fetch Welcome Message:** Retrieve data from backend API endpoint (`GET /`)
- **Submit User Data:** Send username payloads via JSON POST request (`POST /Message`)
- **Interactive UI:** Responsive controlled inputs built with React hooks
- **Cross-Origin Resource Sharing:** Pre-configured CORS middleware for seamless local integration

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (via Vite)
- **Language:** JavaScript (ES6+)
- **HTTP Client:** Fetch API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Middleware:** `cors`, `express.json`

---

## 📁 Folder Structure

```text
practice_project_1/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── node_modules/
    ├── src/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js