# ChronoSync Express

A full-stack time formatting utility built with **React** and **Express.js**. This application allows users to select between a **12-hour** or **24-hour** time format from the frontend UI, send query parameters to the backend server, and retrieve accurately formatted date and time responses.

---

## 🚀 Features

- **Format Selection:** Interactive dropdown to toggle between 12-Hour and 24-Hour time preferences.
- **URL Query Parsing:** Backend extracts format parameters directly from URL query strings (`/Time?format=...`) using Node's `url` module.
- **Dynamic Time Rendering:** Backend localized time formatting via JavaScript `Date` and `toLocaleTimeString` (`en-US` vs `en-GB`).
- **CORS Pre-configured:** Seamless local integration between React and Express servers.

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
- **Modules:** `url`, `cors`, `express.json`

---

## 📁 Folder Structure

```text
practice_project_4/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
└── frontend/
    ├── node_modules/
    ├── src/
    │   ├── App.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── vite.config.js