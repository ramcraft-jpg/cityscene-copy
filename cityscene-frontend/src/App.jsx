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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPlaceholder />} />
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

        <Route path="/privacy-policy" element={<GenericPlaceholder title="Privacy Policy" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
