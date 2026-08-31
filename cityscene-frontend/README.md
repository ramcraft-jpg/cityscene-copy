# CityScene Global - Frontend Application

A modern, responsive web application and content management system for **CityScene Global Pvt Ltd**, built with React 19, Vite, and Tailwind CSS.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technologies Used](#-technologies-used)
- [Directory Structure](#-directory-structure)
- [Installation & Setup](#-installation--setup)
- [Dependencies](#-dependencies)
- [Environment Variables](#-environment-variables)
- [Development & Build Commands](#-development--build-commands)
- [API & Backend Connection](#-api--backend-connection)
- [Application Routes](#-application-routes)
- [Configuration Details](#-configuration-details)
- [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 🌟 Overview

The **CityScene Global Frontend** provides an intuitive user interface for showcasing company services, client portfolios, career opportunities, insights/blogs, and contact options. Additionally, it features a comprehensive, role-protected **Admin Portal (`/admin`)** allowing administrators to dynamically manage landing page sections, edit project portfolios, manage job postings, review candidate resume applications, manage contact inquiries, and configure page-level SEO meta tags.

---

## ⚡ Key Features

### 🌐 Public Website
- **Dynamic Homepage:** Hero banner, services highlights, about preview, client adoption metrics, social impact initiatives, and digital transformation stories.
- **Service Catalog:** Full breakdown of IT & digital transformation services with dedicated detail views.
- **Portfolio & Case Studies:** Showcase of past projects, client success stories, and filterable deliverables.
- **Career Portal:** Job openings listing with direct job application forms and resume upload capabilities (`.pdf`, `.doc`, `.docx`).
- **Blogs & Insights:** Article hub featuring category-based filtering, slug-based URLs, and detailed reading views.
- **Contact & Location:** Contact inquiry submission form with interactive location maps.

### 🔐 Protected Admin Dashboard (`/admin`)
- **JWT-Protected Session Management:** Secured admin portal powered by JWT tokens stored in `localStorage`.
- **Content Management System (CMS):** Section-by-section editors for Home, About, Services, Portfolio, Careers, Blogs, and Testimonials.
- **Job Applications Manager:** View and review candidate application submissions along with uploaded resume files.
- **Inquiries Manager:** Access, inspect, and delete incoming contact form submissions.
- **SEO Management:** Edit page titles, meta descriptions, and keywords dynamically for every site route.

---

## 🛠️ Technologies Used

| Technology | Category | Version / Detail |
|---|---|---|
| **React** | UI Framework | `v19.2.8` |
| **Vite** | Build Tool & Dev Server | `v8.2.0` |
| **React Router DOM** | Client-Side Routing | `v7.18.2` |
| **Tailwind CSS** | Styling Framework | `v4.3.3` |
| **@tailwindcss/vite** | Vite Plugin for Tailwind | `v4.3.3` |
| **Lucide React** | Icon Set | `v1.30.0` |
| **Babel & React Compiler** | Transpiler & Optimization | `babel-plugin-react-compiler` |
| **Oxlint** | Linter | `v1.75.0` |

---

## 📁 Directory Structure

```
cityscene-frontend/
├── public/                 # Static public assets
├── src/
│   ├── assets/             # Brand logos, hero images, and static visual assets
│   ├── components/         # Reusable UI components
│   │   └── admin/          # Admin UI wrappers, AdminLayout, ProtectedRoute
│   ├── data/               # Local fallback datasets (blogs, jobs, services, about)
│   ├── pages/              # Public page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Services.jsx    # Services listing page
│   │   ├── About.jsx       # About us page
│   │   ├── Career.jsx      # Career & hiring page
│   │   ├── Portfolio.jsx   # Projects & client case studies
│   │   ├── Blog.jsx        # Blog listing & article page
│   │   ├── Contact.jsx     # Contact page & location map
│   │   └── admin/          # Admin dashboard components & editors
│   │       ├── home/       # Homepage section editors
│   │       ├── about/      # About section editors
│   │       ├── services/   # Service page editors
│   │       ├── portfolio/  # Project & client editors
│   │       ├── career/     # Job & candidate application editors
│   │       ├── blogs/      # Blog article editor & management
│   │       └── seo/        # SEO meta tag manager
│   ├── services/           # API integration modules (fetch calls to backend)
│   ├── utils/              # Helper utilities (e.g., imageUrl path resolution)
│   ├── App.jsx             # Main routing configuration
│   ├── index.css           # Tailwind v4 import & global styles
│   └── main.jsx            # React root application entry point
├── index.html              # HTML document template
├── package.json            # Scripts & project dependencies
└── vite.config.js          # Vite configuration & plugin setup
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Step-by-Step Setup

1. Navigate to the frontend directory:
   ```bash
   cd cityscene-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173`.

---

## 📦 Dependencies

### Core Dependencies
```json
"dependencies": {
  "@tailwindcss/vite": "^4.3.3",
  "lucide-react": "^1.30.0",
  "react": "^19.2.8",
  "react-dom": "^19.2.8",
  "react-router-dom": "^7.18.2",
  "tailwindcss": "^4.3.3"
}
```

### Development Dependencies
```json
"devDependencies": {
  "@babel/core": "^7.29.7",
  "@rolldown/plugin-babel": "^0.2.3",
  "@types/react": "^19.2.17",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^6.0.4",
  "babel-plugin-react-compiler": "^1.0.0",
  "oxlint": "^1.75.0",
  "vite": "^8.2.0"
}
```

---

## 🔑 Environment Variables

The frontend interacts with the REST API running at `http://localhost:5000/api`. If custom API endpoints or environment configurations are required, create a `.env` file in `cityscene-frontend/`:

```env
# Optional Custom API Base URL
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📜 Development & Build Commands

| Command | Action | Description |
|---|---|---|
| `npm run dev` | Dev Server | Starts Vite dev server with Hot Module Replacement (HMR) at `http://localhost:5173` |
| `npm run build` | Production Build | Compiles optimized assets into the `dist/` directory |
| `npm run preview` | Preview Build | Serves the production build locally for verification |
| `npm run lint` | Code Linting | Runs Oxlint code verification across JavaScript and JSX files |

---

## 🔌 API & Backend Connection

All HTTP API communications are configured within `src/services/`. The default backend REST API target is `http://localhost:5000/api`.

### API Service Modules

- **`adminAuthService.js`**: Handles admin login (`/api/admin/login`), session validation (`/api/admin/me`), token storage (`cityscene_admin_token`), and logout.
- **`blogService.js`**: Fetches, creates, updates, and deletes blog articles (`/api/blogs`).
- **`jobService.js`**: Manages career job postings (`/api/jobs`).
- **`applicationService.js`**: Handles candidate job application submissions with file upload (`/api/applications`).
- **`contactService.js`**: Submits public contact inquiries and retrieves admin inquiry list (`/api/contact`).
- **`projectService.js`**: Manages portfolio projects (`/api/projects`).
- **`serviceService.js`**: Retrieves and updates service details (`/api/services`).
- **`seoService.js`**: Manages page-level SEO meta tags (`/api/seo`).

---

## 🗺️ Application Routes

### Public Pages

| Path | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Main landing page |
| `/services` | `Services.jsx` | Service offerings overview |
| `/services/:serviceId` | `ServiceDetailPlaceholder.jsx` | Individual service details |
| `/about` | `About.jsx` | Company story, mission, and team |
| `/portfolio` | `Portfolio.jsx` | Case studies & project gallery |
| `/portfolio/:slug` | `ProjectPost.jsx` | Detailed project case study |
| `/career` | `Career.jsx` | Open job openings listing |
| `/career/apply/:jobId?` | `JobApplication.jsx` | Candidate application form |
| `/blog` | `Blog.jsx` | Blog & articles list |
| `/blog/:slug` | `BlogPost.jsx` | Full blog post view |
| `/contact` | `Contact.jsx` | Contact page & interactive map |

### Protected Admin Portal Routes (`/admin`)

| Path | Component | Description |
|---|---|---|
| `/admin/login` | `AdminLogin.jsx` | Admin authentication page |
| `/admin` | `AdminPortal.jsx` | Main admin control center |
| `/admin/home/*` | Various | Edit homepage sections (hero, services, testimonials, etc.) |
| `/admin/services/*` | Various | Manage service catalog items |
| `/admin/projects/*` | Various | Create and edit portfolio project entries |
| `/admin/about/*` | Various | Update about section content and team members |
| `/admin/career/*` | Various | Manage job postings & view candidate applications |
| `/admin/blogs/*` | Various | Publish and edit blog posts |
| `/admin/contact/*` | Various | Review contact inquiries & map details |
| `/admin/seo` | `AdminSeoManagement.jsx` | Manage meta titles and descriptions per page |

---

## ⚙️ Configuration Details

- **Vite Configuration (`vite.config.js`)**: Integrates `@tailwindcss/vite`, `@vitejs/plugin-react`, and Babel React Compiler plugin.
- **Authentication Handling (`src/components/admin/ProtectedRoute.jsx`)**: Checks for active JWT token in `localStorage` before rendering admin layout routes.

---

## ❓ Troubleshooting & FAQ

### 1. API Calls Fail / Network Error
- **Cause:** Backend server is offline or running on a different port.
- **Fix:** Ensure `cityscene-backend` is running at `http://localhost:5000`. Test endpoint accessibility at `http://localhost:5000/api/health`.

### 2. Admin Login Keeps Redirecting to Login Screen
- **Cause:** Invalid or expired JWT authentication token.
- **Fix:** Clear `localStorage` in browser dev tools (`localStorage.removeItem('cityscene_admin_token')`) and log in again via `/admin/login`.

### 3. Images or Static Files Fail to Load
- **Cause:** Backend static upload directory inaccessible or missing relative paths.
- **Fix:** Verify backend `uploads/` folder permissions and check `src/utils/imageUrl.js` formatting.
