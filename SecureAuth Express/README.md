# SecureAuth Express – Cookie-Based JWT Authentication System

SecureAuth Express is a full-stack MERN application (MongoDB, Express, React, Node.js) that implements secure user authentication utilizing signed `HttpOnly` cookies via `cookie-parser` and `cors` credentials configuration.

---

## Project Structure

Based on the repository architecture:

```text
authsystem/
├── backend/
│   ├── controllers/
│   │   └── authcontroller.js
│   ├── middlewares/
│   │   └── authmiddleware.js
│   ├── model/
│   │   └── auth_db.js
│   ├── routes/
│   │   └── authroutes.js
│   ├── .env
│   ├── db.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
└── frontend/
    ├── context/
    │   └── authcontext.jsx
    ├── pages/
    │   ├── getprofile.jsx
    │   ├── login.jsx
    │   └── register.jsx
    ├── public/
    ├── src/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── stylings/
    │   ├── login.css
    │   ├── profile.css
    │   └── register.css
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    └── vite.config.js