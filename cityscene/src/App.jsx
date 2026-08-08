import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Services from './pages/Services';
import About from './pages/About';
import Career from './pages/Career';
import JobApplication from './pages/JobApplication';
import ServiceDetailPlaceholder from './pages/ServiceDetailPlaceholder';
import ContactPlaceholder from './pages/ContactPlaceholder';
import GenericPlaceholder from './pages/GenericPlaceholder';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPlaceholder />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career/apply" element={<JobApplication />} />
        <Route path="/career/apply/:jobId" element={<JobApplication />} />
        <Route path="/contact" element={<ContactPlaceholder />} />
        <Route path="/blog" element={<GenericPlaceholder title="Blogs" />} />
        <Route path="/portfolio" element={<GenericPlaceholder title="Portfolio" />} />
        <Route path="/privacy-policy" element={<GenericPlaceholder title="Privacy Policy" />} />
        <Route path="*" element={<Navigate to="/services" replace />} />
      </Routes>
    </Router>
  );
}
