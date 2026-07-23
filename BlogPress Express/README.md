# BlogPress Express

A modular full-stack blogging platform built with **React** and **Express.js**. This application features an Express Router-driven backend (`/blogs`) capable of handling creation, retrieval, and targeted author-based filtering for blog posts.

---

## 🚀 Features

- **Express Router Architecture:** Segregates application routing into dedicated modules (`./routes/blogroutes.js`) under the `/blogs` endpoint namespace.
- **Dynamic Author Search:** Parametric route fetching (`GET /blogs/:authorname`) to filter stored blog records by author name dynamically.
- **Structured Payload Ingestion:** Handles rich blog schemas (Auto ID, Title, Content, Author, Published Date).
- **Formatted JSON View:** UI renders pretty-printed API responses directly onto the interface using `<pre>` blocks.
- **CORS Enabled:** Pre-configured for cross-origin development between React and Node environments.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (via Vite)
- **Language:** JavaScript (ES6+)
- **State Management:** React Hooks (`useState`)
- **HTTP Client:** Fetch API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js (`express.Router()`)
- **Middleware:** `cors`, `express.json`

---

## 📁 Folder Structure

```text
practice_project_8/
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