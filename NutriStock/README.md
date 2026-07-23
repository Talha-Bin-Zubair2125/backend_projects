# NutriStock – Supplement Inventory & Management API

NutriStock is a full-stack MERN application (MongoDB, Express, React, Node.js) built to track, manage, and search fitness supplements and product inventories. It includes real-time stock status monitoring, expiration date tracking, and category-based dynamic searching.

---

## Features

- 🏋️ **Product Registration**: Log supplement details including Product ID, Name, Price, Stock Available, Expiration Date, and Category.
- 📦 **Inventory Overview**: View all registered products in a structured table with live visual cues for stock availability and product expiration.
- 🔍 **Flexible Search**: Search products dynamically by exact Category or partial/case-insensitive Product Name using MongoDB Regex operators (`$or`, `$regex`).
- 🟢 **Status Indicators**: Dynamic status tags highlighting stock availability (In Stock vs Out of Stock) and product freshness (Valid vs Expired).
- ⚡ **RESTful API**: Structured backend API built using Express Routers and Mongoose models.

---

## Tech Stack

### Frontend
- **React.js** (Functional Components, State Management Hooks)
- **Axios** (Promise-based HTTP client)
- **CSS3** (Responsive tables, product cards, and status tags)

### Backend
- **Node.js** & **Express.js** (Server framework & Modular Routing)
- **MongoDB** & **Mongoose** (Document database & ODM modeling)
- **CORS** (Cross-Origin Resource Sharing handling)

---

## Getting Started

### Prerequisites

Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) running on port `27017`

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/nutristock.git](https://github.com/your-username/nutristock.git)
cd nutristock