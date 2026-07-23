# ContactVault Express

A full-stack contact management application built with **React** and **Express.js**. This application allows users to create structured contact cards (Auto-incrementing ID, First Name, Last Name, Email, Address), submit them to an in-memory backend store, and view formatted contact records dynamically on the UI.

---

## 🚀 Features

- **Auto-Incrementing ID Tracking:** Local UI state calculates contact IDs dynamically per user entry.
- **RESTful Contact Ingestion (`POST /Contact`):** Submits JSON contact records to the Express backend memory array.
- **Formatted Data Display:** Retrieves stored contact arrays (`GET /GetContacts`) and formats raw JSON using `JSON.stringify(data, null, 2)` inside `<pre>` blocks for readability.
- **Connection Leak Prevention:** Handled API response lifecycle guarantees to prevent socket hanging on repetitive POST calls.
- **CORS Enabled:** Fully configured cross-origin middleware for seamless development.

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
practice_project_7/
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