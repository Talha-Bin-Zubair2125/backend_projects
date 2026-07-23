# TextForge Express

A full-stack file creation and management system built with **React** and **Express.js**. This application allows users to draft dynamic file names and text content on the frontend, batch-submit them to the Express server, write/update physical `.txt` files on the server using Node's File System (`fs`) module, and inspect file execution statuses.

---

## 🚀 Features

- **Dynamic File Batching:** Draft multiple `.txt` file payloads (Name & Content) in React state before submitting.
- **Node.js File System (`fs`) Integration:** 
  - Validates `.txt` file extension constraints.
  - Checks if a file already exists using `fs.existsSync()`.
  - Reads content via `fs.readFileSync()` to prevent unnecessary overwrites ("Same File").
  - Writes/Updates content dynamically using `fs.writeFileSync()`.
- **Status Reporting:** Tracks and returns execution statuses (`Created`, `Updated`, `Same File`, `Only .txt allowed`, `Error writing file`).
- **Effect-Driven Sync:** Trigger backend status reads (`GET /ReadFile`) controlled via UI interaction.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (via Vite)
- **Language:** JavaScript (ES6+)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **HTTP Client:** Fetch API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Modules:** Native Node.js `fs` (File System), `cors`, `express.json`

---

## 📁 Folder Structure

```text
practice_project_6/
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