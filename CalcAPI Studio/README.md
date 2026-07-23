# CalcAPI Studio

A full-stack calculator web application built with **React**, **React Router DOM**, and **Express.js**. The application uses client-side routing to navigate between arithmetic operation pages (Addition, Subtraction, Multiplication, Division) and performs mathematical operations via Express backend REST endpoints.

---

## 🚀 Features

- **Multi-Page Routing:** Structured navigation using React Router (`BrowserRouter`, `Routes`, `Route`, `Layout`).
- **RESTful Calculation API:** Dedicated POST endpoints for each arithmetic operation (`/Add`, `/Sub`, `/Mul`, `/Divide`).
- **Division Guarding:** Express middleware validation returning a `400 Bad Request` status on division-by-zero attempts.
- **Cross-Origin Enabled:** Pre-configured `cors` middleware for smooth client-server interactions.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (via Vite)
- **Routing:** React Router DOM (`react-router-dom`)
- **HTTP Client:** Fetch API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Middleware:** `cors`, `express.json`

---

## 📁 Folder Structure

```text
practice_project_3/
├── backend/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
└── frontend/
    ├── node_modules/
    ├── src/
    │   ├── MainLayout/
    │   │   └── Layout.jsx
    │   ├── Routes/
    │   │   ├── Add.jsx
    │   │   ├── Divide.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Home.jsx
    │   │   ├── Multiply.jsx
    │   │   ├── Navbar.jsx
    │   │   └── Subtract.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    ├── package-lock.json
    ├── README.md
    └── vite.config.js