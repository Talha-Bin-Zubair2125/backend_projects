# BlogSphere – Blog Management & Publication API

BlogSphere is a full-stack MERN application (MongoDB, Express, React, Node.js) built to author, publish, retrieve, and filter blog posts based on custom publication date ranges.

---

## Features

- ✍️ **Blog Publishing**: Create and store blog posts with details including Title, Content, Author Name, and Publication Date.
- 📚 **Feed Retrieval**: Fetch and display all published blog entries from MongoDB.
- 📅 **Date-Range Search**: Filter articles using MongoDB comparison operators (`$gte` and `$lte`) via Express URL query parameters (`req.query`).
- 🔔 **Interactive UI Alerts**: Dynamic UI state notifications indicating successful operations or backend error states.
- 🗂️ **Modular Router**: Express modular routing with cleanly segregated endpoints under the `/blog` prefix.

---

## Tech Stack

### Frontend
- **React.js** (Functional Components, State Management Hooks)
- **Axios** (Promise-based HTTP client for async requests)
- **CSS3** (Custom notifications, form fields, and response code blocks)

### Backend
- **Node.js** & **Express.js** (Modular Server & Router Middleware)
- **MongoDB** & **Mongoose** (ODM Schema modeling and Database persistence)
- **CORS** (Cross-Origin Resource Sharing handling)

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) running on port `27017`

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/blogsphere.git](https://github.com/your-username/blogsphere.git)
cd blogsphere