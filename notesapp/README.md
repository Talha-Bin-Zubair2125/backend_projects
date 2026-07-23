# 📝 AI-Powered Notes Application

A full-stack MERN web application that allows users to create, manage, and enhance their notes using AI capabilities. Built with React.js on the frontend and Node.js/Express on the backend, with MongoDB for data persistence.

---

## 🚀 Features

- 🔐 **User Authentication** - Secure login and registration system
- 📝 **Notes Management** - Full CRUD (Create, Read, Update, Delete) functionality
- 🤖 **AI Integration** - AI-powered note generation, summarization, and content improvement
- 👤 **User Profile Management** - View and update personal profile
- 🔒 **Protected Routes** - Middleware-based authentication for secure access
- 📱 **Responsive Design** - Clean, modern UI built with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI Framework |
| Context API | State Management |
| Tailwind CSS | Styling |
| Axios | API Communication |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Groq API | AI Integration |
| JWT/Auth Middleware | Authentication |

---

## 📁 Project Structure

```
notesapp/
│
├── frontend/
│   ├── hooks/
│   │   └── useAI.js              # Custom hook for AI functionality
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   └── src/
│       ├── context/
│       │   └── authContext.jsx   # Authentication context
│       ├── pages/
│       │   ├── Login.jsx         # Login page
│       │   ├── Register.jsx      # Registration page
│       │   ├── addnotes.jsx      # Add new note
│       │   ├── getnotes.jsx      # View all notes
│       │   ├── updatenotes.jsx   # Update existing note
│       │   ├── updateprofile.jsx # Update user profile
│       │   └── user_profile.jsx  # View user profile
│       └── styling/              # CSS/styling files
│
└── backend/
    ├── controllers/
    │   ├── authController.js     # Authentication logic
    │   └── notesController.js    # Notes CRUD logic
    ├── middlewares/
    │   └── authMiddleware.js     # Route protection middleware
    ├── model/
    │   ├── auth.js               # User model
    │   └── notes.js              # Notes model
    ├── routes/
    │   ├── aiRoutes.js           # AI feature routes
    │   ├── authRoutes.js         # Authentication routes
    │   └── noteRoutes.js         # Notes CRUD routes
    └── db.js                     # Database connection
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Groq API Key

### 1. Clone the Repository
```bash
git clone https://github.com/Talha-Bin-Zubair2125/ai-powered-notes-app.git
cd notesapp
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GROQ_API_KEY=your_groq_api_key
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

### Auth Routes (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login user |
| GET | `/profile` | Get user profile |
| PUT | `/update-profile` | Update user profile |

### Notes Routes (`/api/notes`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/add` | Create new note |
| GET | `/all` | Get all notes |
| PUT | `/update/:id` | Update a note |
| DELETE | `/delete/:id` | Delete a note |

### AI Routes (`/api/ai`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/generate` | Generate note content |
| POST | `/summarize` | Summarize a note |
| POST | `/improve` | Improve note content |

---

## 🖥️ Usage

1. **Register** a new account or **Login** with existing credentials
2. **Create notes** using the Add Notes page
3. **View all notes** on the Get Notes page
4. **Update or delete** notes as needed
5. Use **AI features** to generate, summarize, or improve your notes
6. **Manage your profile** via the Profile page

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Talha Bin Zubair**
- Portfolio: [talhabinzubair.com](https://talha-bin-zubair2125.github.io/Portfolio/)
- LinkedIn: [linkedin.com/in/talhabinzubair2125](https://linkedin.com/in/talhabinzubair2125)
- GitHub: [github.com/Talha-Bin-Zubair2125](https://github.com/Talha-Bin-Zubair2125)
- Email: talhazubair2125@gmail.com

---

⭐ **If you found this project helpful, please give it a star!**
