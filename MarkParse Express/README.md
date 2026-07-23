# MarkParse Express

A full-stack Markdown-to-HTML parser utility built with **React**, **Axios**, **Express.js**, and **Marked**. This application provides a real-time editor interface where raw Markdown text is sent to a Node.js backend, processed using the `marked` library, and returned as clean HTML strings.

---

## 🚀 Features

- **Markdown-to-HTML Parsing:** Backend integrates the `marked` library (`const { marked } = require('marked')`) to transform standard Markdown syntax into parsed HTML markup strings.
- **Axios Network Layer:** Frontend leverages `axios.post` for clean asynchronous data transfer.
- **Glassmorphism UI:** Features a modern glass-effect card layout with dedicated input and read-only output textareas.
- **Error Handling:** Graceful client-side fallback handling for unexpected backend offline states or network errors.
- **CORS Enabled:** Fully configured for cross-origin development between Vite React and Express environments.

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
- **Libraries & Modules:** `marked`, `cors`, `express.json`

---

## 📁 Folder Structure

```text
practice_project_10/
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