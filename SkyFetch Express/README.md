# SkyFetch Express

A full-stack weather application built with **React**, **Axios**, and **Express.js**. This application acts as a proxy server using the **OpenWeatherMap API** to fetch real-time weather metrics for any city while safely securing sensitive API keys using environment variables.

---

## 🚀 Features

- **External API Proxy:** Express server securely queries OpenWeatherMap API using a hidden server-side API key.
- **Environment Variable Protection:** Leverages `dotenv` to load secrets from a `.env` file (`process.env.API_KEY`), preventing credential exposure.
- **Custom Data Extraction:** Filters and restructures raw external weather API payloads before serving concise JSON data back to the client.
- **Error & Exception Handling:** Frontend gracefully catches missing city responses or network failures with user-friendly alerts.
- **Axios HTTP Integration:** Frontend utilizes `axios` to perform smooth GET requests.

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
- **Libraries & Middleware:** `dotenv`, `cors`

---

## 📁 Folder Structure

```text
practice_project_9/
├── backend/
│   ├── .env
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