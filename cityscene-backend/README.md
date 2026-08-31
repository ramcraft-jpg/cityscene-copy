# CityScene Global - Backend REST API Service

A RESTful API backend service for **CityScene Global Pvt Ltd**, built with Node.js, Express, Sequelize ORM, and MySQL.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Backend Features](#-backend-features)
- [Technologies Used](#-technologies-used)
- [Directory Structure](#-directory-structure)
- [Installation & Setup](#-installation--setup)
- [Dependencies](#-dependencies)
- [Environment Variables](#-environment-variables)
- [Database Configuration & Seeding](#-database-configuration--seeding)
- [Authentication & Authorization](#-authentication--authorization)
- [API Endpoints Reference](#-api-endpoints-reference)
- [Development & Production Commands](#-development--production-commands)
- [Configuration & Middleware](#-configuration--middleware)
- [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 🌟 Overview

The **CityScene Global Backend** provides RESTful API endpoints powering the public frontend web application and the protected administrative content management system. It handles content delivery for services, portfolios, blogs, careers, and testimonials, accepts public job applications and contact inquiries, handles file uploads (resumes & media), and enforces JWT authentication for admin operations.

---

## ⚡ Backend Features

### 🔌 RESTful Content Management
- **Public Data Delivery:** Endpoints for retrieving website services, portfolio projects, client listings, blog posts, job listings, testimonials, home section content, and SEO metadata.
- **Admin Management Operations:** Full CRUD capability for administrators to manage all dynamic website content.

### 🔒 Authentication & Authorization
- **JWT Admin Authentication:** Admin registration, login, token generation using JSON Web Tokens (`jsonwebtoken`), and password security using `bcryptjs`.
- **Route Guard Middleware:** `protectAdmin` middleware ensuring protected endpoints require a valid `Bearer <token>`.
- **Session Verification:** `/api/admin/me` endpoint to verify token validity and retrieve admin session details.

### 📁 File & Media Upload Handling
- **Multer Storage Engine:** Automated file storage in `uploads/` directory with unique file naming.
- **Resume Uploads:** Restricted file filter permitting `.pdf`, `.doc`, and `.docx` (up to 10MB limit) for candidate job applications.
- **Media Uploads:** Supports image (`.png`, `.jpg`, `.svg`, `.webp`), video (`.mp4`, `.mov`, `.webm`), and document uploads (up to 50MB limit) for homepage and blog assets.
- **Static Asset Serving:** Uploaded files served directly via `http://localhost:5000/uploads/<filename>`.

### 🗄️ Database Auto-Sync & Seeding
- **Sequelize Schema Sync:** Automatically syncs database tables on startup.
- **Automated Data Seeding:** Executes initial dataset seeding (`seedService.js`) on startup if tables are empty.

---

## 🛠️ Technologies Used

| Technology | Category | Version / Detail |
|---|---|---|
| **Node.js** | Runtime | ES Modules (`"type": "module"`) |
| **Express.js** | Web Framework | `v4.21.2` |
| **MySQL** | Database | MySQL Server 8.x / MariaDB |
| **MySQL2** | Database Driver | `v3.23.3` |
| **Sequelize** | ORM Framework | `v6.37.8` |
| **JSON Web Token (JWT)** | Authentication | `jsonwebtoken` `v9.0.3` |
| **Bcryptjs** | Password Hashing | `bcryptjs` `v3.0.3` |
| **Multer** | Multipart File Uploads | `v1.4.5-lts.1` |
| **CORS** | Cross-Origin Middleware | `v2.8.5` |
| **Dotenv** | Environment Configuration | `v16.6.1` |

---

## 📁 Directory Structure

```
cityscene-backend/
├── config/
│   └── db.js                 # Sequelize MySQL database instance & connection setup
├── controllers/              # Business logic & HTTP request handlers
│   ├── adminController.js    # Admin login, registration, and session profile logic
│   ├── applicationController.js # Job application submissions & resume handling
│   ├── blogController.js     # Blog creation, updates, and post retrieval
│   ├── clientController.js   # Client logo & testimonial partner management
│   ├── contactController.js  # Contact inquiry submissions & management
│   ├── homeContentController.js # Homepage dynamic content section handlers
│   ├── jobController.js      # Career job listings management
│   ├── projectController.js  # Portfolio projects management
│   ├── seoMetaController.js  # Page-level SEO metadata management
│   ├── serviceController.js  # Service catalog management
│   └── testimonialController.js # Client testimonial handlers
├── middleware/
│   ├── authMiddleware.js     # protectAdmin JWT authentication middleware
│   ├── errorHandler.js       # 404 notFoundHandler & centralized error middleware
│   └── uploadMiddleware.js   # Multer file storage & MIME type validation
├── models/                   # Sequelize data models & table definitions
│   ├── Admin.js              # Admin user model
│   ├── Application.js        # Job application candidate submissions model
│   ├── Blog.js               # Blog article model
│   ├── Client.js             # Client brand model
│   ├── Contact.js            # Contact inquiry submission model
│   ├── HomeContent.js        # Dynamic homepage section model
│   ├── Job.js                # Career posting model
│   ├── Project.js            # Portfolio project case study model
│   ├── SeoMeta.js            # SEO meta tags model
│   ├── Service.js            # Service offering model
│   └── Testimonial.js        # Testimonial model
├── routes/                   # Express router definitions mapped to controllers
│   ├── adminRoutes.js
│   ├── applicationRoutes.js
│   ├── blogRoutes.js
│   ├── clientRoutes.js
│   ├── contactRoutes.js
│   ├── homeContentRoutes.js
│   ├── jobRoutes.js
│   ├── projectRoutes.js
│   ├── seoMetaRoutes.js
│   ├── serviceRoutes.js
│   └── testimonialRoutes.js
├── services/
│   └── seedService.js        # Pre-populates database with initial content on first boot
├── uploads/                  # Storage folder for static uploaded files and resumes
├── .env                      # Local environment configuration file
├── .env.example              # Sample environment variables template
├── package.json              # Backend dependencies & npm scripts
└── server.js                 # Application entry point & Express server bootstrap
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **MySQL Server**: `v8.0` or higher (running on `localhost:3306` or configured host)

### Step-by-Step Setup

1. Navigate to the backend directory:
   ```bash
   cd cityscene-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create local `.env` file:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env` (ensure MySQL credentials match your local database instance).

5. Create database in MySQL (if not automatically created):
   ```sql
   CREATE DATABASE cityscene_global;
   ```

6. Start the server:
   ```bash
   # Development Mode (auto-reload on change)
   npm run dev

   # Production Mode
   npm start
   ```

---

## 📦 Dependencies

```json
"dependencies": {
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.5",
  "dotenv": "^16.6.1",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.3",
  "multer": "^1.4.5-lts.1",
  "mysql2": "^3.23.3",
  "sequelize": "^6.37.8"
}
```

---

## 🔑 Environment Variables

Example configuration in `cityscene-backend/.env`:

```env
# Server Configuration
PORT=5000

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cityscene_global
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT Authentication Secret
JWT_SECRET=cityscene_jwt_secret_key_2026
```

---

## 🗄️ Database Configuration & Seeding

### Database Connection (`config/db.js`)
- Configured using **Sequelize** with MySQL dialect.
- On startup, the server calls `sequelize.authenticate()` to verify database connection, followed by `sequelize.sync()` to synchronize model schemas with MySQL database tables automatically.

### Automated Database Seeding (`services/seedService.js`)
- Runs on server boot after successful database connection.
- Checks existing tables and pre-populates initial records for services, blogs, portfolio projects, career jobs, and home content if empty.

---

## 🔐 Authentication & Authorization

### JWT Token Scheme
- Endpoint `/api/admin/login` returns a signed JSON Web Token upon valid credentials.
- Protected admin routes require sending the token in the HTTP `Authorization` header:
  ```http
  Authorization: Bearer <your_jwt_token>
  ```

### Protected Admin Middleware (`middleware/authMiddleware.js`)
- `protectAdmin`: Decodes the token using `JWT_SECRET`, retrieves the associated Admin user from database, and attaches user information to `req.admin`.

---

## 🌐 API Endpoints Reference

### 🏥 System Health Check
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Returns system operational status and timestamp |

### 🔐 Admin Authentication (`/api/admin`)
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `POST` | `/api/admin/login` | Public | Admin login & returns JWT token |
| `POST` | `/api/admin/register` | Public | Register new admin account |
| `GET` | `/api/admin/me` | Protected | Fetch current admin session profile |

### 💼 Services Management (`/api/services`)
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/api/services` | Public | Fetch all services |
| `GET` | `/api/services/:id` | Public | Fetch single service detail by ID |
| `POST` | `/api/services` | Protected | Create a new service offering |
| `PUT` | `/api/services/:id` | Protected | Update existing service |
| `DELETE` | `/api/services/:id` | Protected | Delete service item |

### 📁 Portfolio Projects (`/api/projects`)
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/api/projects` | Public | Fetch all portfolio projects |
| `GET` | `/api/projects/clients` | Public | Fetch list of clients |
| `GET` | `/api/projects/:slug` | Public | Fetch project detail by slug |
| `POST` | `/api/projects` | Protected | Add new portfolio project |
| `PUT` | `/api/projects/:id` | Protected | Update portfolio project |
| `DELETE` | `/api/projects/:id` | Protected | Delete portfolio project |

### 📝 Blogs & Articles (`/api/blogs`)
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/api/blogs` | Public | Fetch published blogs |
| `GET` | `/api/blogs/:slug` | Public | Fetch blog article by slug |
| `POST` | `/api/blogs` | Protected | Create new blog post |
| `PUT` | `/api/blogs/:id` | Protected | Update blog post |
| `DELETE` | `/api/blogs/:id` | Protected | Delete blog post |

### 🚀 Career Openings (`/api/jobs`)
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/api/jobs` | Public | Fetch active career listings |
| `GET` | `/api/jobs/:id` | Public | Fetch single job details |
| `POST` | `/api/jobs` | Protected | Create career posting |
| `PUT` | `/api/jobs/:id` | Protected | Update job posting |
| `DELETE` | `/api/jobs/:id` | Protected | Delete job posting |

### 📄 Candidate Applications (`/api/applications`)
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `POST` | `/api/applications` | Public | Submit job application (multipart with resume file) |
| `GET` | `/api/applications` | Protected | Fetch candidate applications |
| `GET` | `/api/applications/:id` | Protected | Fetch application detail by ID |
| `DELETE` | `/api/applications/:id` | Protected | Delete application submission |

### 📬 Contact Inquiries (`/api/contact`)
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `POST` | `/api/contact` | Public | Submit contact form inquiry |
| `GET` | `/api/contact` | Protected | Fetch all contact submissions |
| `GET` | `/api/contact/:id` | Protected | Fetch single contact inquiry |
| `DELETE` | `/api/contact/:id` | Protected | Delete contact inquiry |

### 🏠 Dynamic Home Content (`/api/home-content`)
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/api/home-content` | Public | Fetch all home sections data |
| `GET` | `/api/home-content/:section` | Public | Fetch specific section content |
| `PUT` | `/api/home-content/:section` | Protected | Update section content |
| `POST` | `/api/home-content/upload-media` | Protected | Upload media file for home section |

### 🤝 Clients & Partners (`/api/clients`)
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/api/clients` | Public | Fetch client logos & details |
| `POST` | `/api/clients` | Protected | Add new client |
| `PUT` | `/api/clients/:id` | Protected | Update client details |
| `DELETE` | `/api/clients/:id` | Protected | Remove client |

### 💬 Testimonials (`/api/testimonials`)
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/api/testimonials` | Public | Fetch client testimonials |

### 🔍 SEO Metadata (`/api/seo`)
| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| `GET` | `/api/seo` | Public | Fetch all page SEO meta configurations |
| `GET` | `/api/seo/:pageKey` | Public | Fetch SEO meta by route page key |
| `PUT` | `/api/seo/:pageKey` | Protected | Update SEO meta for route |
| `POST` | `/api/seo` | Protected | Create/update SEO meta record |
| `DELETE` | `/api/seo/:pageKey` | Protected | Delete SEO meta record |

---

## 📜 Development & Production Commands

| Command | Environment | Description |
|---|---|---|
| `npm run dev` | Development | Runs backend server with Node's `--watch` mode for automatic restart on file changes |
| `npm start` | Production | Boots production Express server directly via `node server.js` |

---

## ⚙️ Configuration & Middleware

- **CORS Configuration:** Enables origin `*` with allowed methods `GET, POST, PUT, DELETE, OPTIONS` and headers `Content-Type, Authorization`.
- **Upload Storage (`middleware/uploadMiddleware.js`)**: Disk storage configured for uploads directory with filename sanitization and MIME filters.
- **Centralized Error Handling (`middleware/errorHandler.js`)**: Structured JSON responses for 404 (Route not found) and 500 (Internal server error).

---

## ❓ Troubleshooting & FAQ

### 1. `SequelizeAccessDeniedError` / MySQL Connection Failed
- **Cause:** Incorrect `DB_USER` or `DB_PASSWORD` in `.env`.
- **Fix:** Update `.env` credentials to match your local MySQL configuration.

### 2. `Unknown database 'cityscene_global'`
- **Cause:** Database has not been created yet in MySQL.
- **Fix:** Run `CREATE DATABASE cityscene_global;` in your MySQL console.

### 3. File Upload Fails (`Invalid file format`)
- **Cause:** Uploaded resume file format is not `.pdf`, `.doc`, or `.docx` or exceeds 10MB limit.
- **Fix:** Ensure submitted candidate resume meets format and size requirements.
