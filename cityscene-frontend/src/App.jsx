import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Career from './pages/Career';
import JobApplication from './pages/JobApplication';
import ServiceDetailPlaceholder from './pages/ServiceDetailPlaceholder';
import Contact from './pages/Contact';
import GenericPlaceholder from './pages/GenericPlaceholder';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Portfolio from './pages/Portfolio';
import ProjectPost from './pages/ProjectPost';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPortal from './pages/admin/AdminPortal';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

import AdminHomePrep from './pages/admin/sections/AdminHomePrep';
import AdminServicesPrep from './pages/admin/sections/AdminServicesPrep';
import AdminAboutPrep from './pages/admin/sections/AdminAboutPrep';
import AdminCareerPrep from './pages/admin/sections/AdminCareerPrep';
import AdminBlogsPrep from './pages/admin/sections/AdminBlogsPrep';
import AdminPortfolioPrep from './pages/admin/sections/AdminPortfolioPrep';
import AdminTestimonialsPrep from './pages/admin/sections/AdminTestimonialsPrep';
import AdminContactPrep from './pages/admin/sections/AdminContactPrep';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPlaceholder />} />
        <Route path="/Services/:serviceId" element={<ServiceDetailPlaceholder />} />
        <Route path="/Mobile_App_Development" element={<Navigate to="/services/mobile-app-development" replace />} />
        <Route path="/mobile_app_development" element={<Navigate to="/services/mobile-app-development" replace />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career/apply" element={<JobApplication />} />
        <Route path="/career/apply/:jobId" element={<JobApplication />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Contact" element={<Contact />} />
        
        {/* Blog Routes */}
        <Route path="/Blog" element={<Blog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/Blog/:slug" element={<BlogPost />} />

        {/* Portfolio Routes */}
        <Route path="/Portfolio" element={<Portfolio />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<ProjectPost />} />
        <Route path="/Portfolio/:slug" element={<ProjectPost />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminPortal />} />
          <Route path="home" element={<AdminHomePrep />} />
          <Route path="services" element={<AdminServicesPrep />} />
          <Route path="about" element={<AdminAboutPrep />} />
          <Route path="career" element={<AdminCareerPrep />} />
          <Route path="blogs" element={<AdminBlogsPrep />} />
          <Route path="portfolio" element={<AdminPortfolioPrep />} />
          <Route path="testimonials" element={<AdminTestimonialsPrep />} />
          <Route path="contact" element={<AdminContactPrep />} />
        </Route>

        <Route path="/privacy-policy" element={<GenericPlaceholder title="Privacy Policy" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}


