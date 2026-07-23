# GiggleFetch Express

A full-stack micro-application built with **React** and **Express.js**. It features a backend endpoint that randomly selects a joke from an array and serves it as plain text (`text/plain`), along with a clean frontend interface to fetch and display jokes on demand.

---

## 🚀 Features

- **Randomized Joke Generator:** Utilizes `Math.random()` and `Math.floor()` scaled across the array length to pick unique jokes on each API call.
- **Plain Text Response Handling:** Serves raw text responses (`res.type("text/plain")`) from Express, parsed on the React frontend using `res.text()`.
- **Interactive UI Card:** Displays a fallback message until the user generates a joke.
- **CORS Pre-configured:** Fully enabled cross-origin requests for local development.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (via Vite)
- **Language:** JavaScript (ES6+)
- **State Management:** React Hooks (`useState`)
- **HTTP Client:** Fetch API (`res.text()`)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Middleware:** `cors`

---

## 📁 Folder Structure

```text
practice_project_5/
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