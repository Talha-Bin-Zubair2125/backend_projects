# FeedPulse – User Feedback Collection & Analytics System

FeedPulse is a full-stack MERN application (MongoDB, Express, React, Node.js) designed to collect, store, retrieve, and filter user feedback based on custom date ranges.

---

## Features

- 📝 **Feedback Submission**: Collect user feedback including Name, Email, Submission Date, and Detailed Message.
- 📋 **View All Feedbacks**: Fetch and display all submitted feedback entries stored in the database.
- 📅 **Date-Range Filtering**: Search and filter feedback entries between specific start and end dates using MongoDB query operators (`$gte` and `$lte`).
- ⚡ **RESTful Router Architecture**: Clean backend organization using modular Express routes and Mongoose schemas.

---

## Tech Stack

### Frontend
- **React.js** (Functional Components, State Management Hooks)
- **Axios** (HTTP Client for API requests)
- **CSS3** (Custom Responsive Layouts & Cards)

### Backend
- **Node.js** & **Express.js** (Server Framework & Router Architecture)
- **MongoDB** & **Mongoose** (Database & ODM Schema Modeling)
- **CORS** (Cross-Origin Resource Sharing handling)

---

## Getting Started

### Prerequisites

Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) running locally on port `27017`

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/feedpulse.git](https://github.com/your-username/feedpulse.git)
cd feedpulse