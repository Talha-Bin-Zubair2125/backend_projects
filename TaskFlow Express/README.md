# TaskFlow Express

A full-stack persistent To-Do List application built with **React**, **Axios**, **Express.js**, and Node's **File System (`fs`)** module. This application allows users to add tasks, save them to disk in `Tasks.txt`, fetch stored task lists, and purge the persistence file on demand via HTTP `DELETE`.

---

## 🚀 Features

- **Asynchronous State Guard:** Manages React's asynchronous state updates using temporary variable scoping before firing API calls.
- **FS Persistence Engine:**
  - **`fs.writeFile`:** Serializes task arrays into stringified JSON buffers (`Tasks.txt`).
  - **`fs.readFile`:** Reads task files using `utf-8` encoding and parses strings back into JSON arrays with `JSON.parse()`.
  - **`fs.unlink`:** Asynchronously deletes the storage file from disk upon requesting task resets.
- **RESTful Endpoints:** Full CRUD lifecycle supporting `GET`, `POST`, and `DELETE` requests.
- **Axios HTTP Integration:** Frontend utilizes `axios` to execute cross-origin requests seamlessly.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (via Vite)
- **Language:** JavaScript (ES6+)
- **State Management:** React Hooks (`useState`)
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Modules & Middleware:** Native Node `fs` (File System), `cors`, `express.json`

---

## 📁 Folder Structure

```text
practice_project_11/
├── backend/
│   ├── Tasks.txt (Generated dynamically)
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