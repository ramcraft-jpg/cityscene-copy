# CityScene Global - Project Repository

Welcome to the official repository for **CityScene Global Pvt Ltd**. This repository contains both the frontend web application and the backend REST API service.

---

## 📁 Repository Structure

```
citysceneglobal-website/
├── cityscene-frontend/    # React 19 + Vite + Tailwind CSS Web Application & Admin Portal
└── cityscene-backend/     # Node.js + Express + Sequelize (MySQL) REST API Service
```

---

## 📚 Documentation Quick Links

Detailed documentation is maintained separately for both components:

- 🎨 **[Frontend Documentation (`cityscene-frontend/README.md`)](./cityscene-frontend/README.md)**  
  Covers React setup, Vite configuration, public routes, Tailwind styling, component tree, admin portal features, and deployment instructions.

- ⚙️ **[Backend Documentation (`cityscene-backend/README.md`)](./cityscene-backend/README.md)**  
  Covers Node.js/Express setup, MySQL database configuration with Sequelize ORM, JWT authentication, REST API endpoint reference, and file upload specifications.

---

## 🚀 Quick Start Guide

### 1. Backend Setup
```bash
cd cityscene-backend
npm install
cp .env.example .env
# Ensure MySQL is running, then start backend:
npm run dev
```
*Backend runs at: `http://localhost:5000`*

### 2. Frontend Setup
```bash
cd cityscene-frontend
npm install
npm run dev
```
*Frontend runs at: `http://localhost:5173`*
