# ICEDT-backend

Backend setup for the ICEDT assessment project. This service handles photo data with support for pagination, sorting, and querying via REST API endpoints. Built with Node.js and MongoDB.

---

## 🔧 Tech Stack

- Node.js
- MongoDB (using MongoDB Atlas)
- Native HTTP module (no Express)
- Dotenv for environment configuration
- Nodemon for hot-reloading (dev only)

---

## 📁 Project Structure

ICEDT-backend/
│
├── db.js # MongoDB connection logic
├── index.js # Main HTTP server
├── routes/ # (optional) folder for organizing routes
├── controllers/ # (optional) logic to separate data handling
├── .env # Your MongoDB URI
├── package.json
└── README.md

---

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/Kelvin-Kelechi/ICEDT-backend.git
cd ICEDT-backend
```
