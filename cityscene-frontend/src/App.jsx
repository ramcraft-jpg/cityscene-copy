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

import AdminServicesPrep from './pages/admin/sections/AdminServicesPrep';
import AdminAboutPrep from './pages/admin/sections/AdminAboutPrep';
import AdminCareerPrep from './pages/admin/sections/AdminCareerPrep';
import AdminBlogsPrep from './pages/admin/sections/AdminBlogsPrep';
import AdminPortfolioPrep from './pages/admin/sections/AdminPortfolioPrep';
import AdminTestimonialsPrep from './pages/admin/sections/AdminTestimonialsPrep';
import AdminContactPrep from './pages/admin/sections/AdminContactPrep';

import AdminHomeHero from './pages/admin/home/AdminHomeHero';
import AdminHomeServices from './pages/admin/home/AdminHomeServices';
import AdminHomeAbout from './pages/admin/home/AdminHomeAbout';
import AdminHomeCareer from './pages/admin/home/AdminHomeCareer';
import AdminHomeTestimonials from './pages/admin/home/AdminHomeTestimonials';
import AdminHomeSocialImpact from './pages/admin/home/AdminHomeSocialImpact';
import AdminHomeCommitment from './pages/admin/home/AdminHomeCommitment';
import AdminHomeClientAdoption from './pages/admin/home/AdminHomeClientAdoption';
import AdminHomeTransformation from './pages/admin/home/AdminHomeTransformation';

import AdminAboutHero from './pages/admin/about/AdminAboutHero';
import AdminAboutContent from './pages/admin/about/AdminAboutContent';
import AdminAboutPeople from './pages/admin/about/AdminAboutPeople';
import AdminAboutValues from './pages/admin/about/AdminAboutValues';
import AdminAboutTransformation from './pages/admin/about/AdminAboutTransformation';

import AdminCareerHero from './pages/admin/career/AdminCareerHero';
import AdminCareerJobs from './pages/admin/career/AdminCareerJobs';
import AdminCareerApplications from './pages/admin/career/AdminCareerApplications';
import AdminCareerContact from './pages/admin/career/AdminCareerContact';

import AdminPortfolioHero from './pages/admin/portfolio/AdminPortfolioHero';
import AdminPortfolioClients from './pages/admin/portfolio/AdminPortfolioClients';
import AdminPortfolioProjects from './pages/admin/portfolio/AdminPortfolioProjects';

import AdminBlogHero from './pages/admin/blogs/AdminBlogHero';
import AdminBlogContent from './pages/admin/blogs/AdminBlogContent';
import AdminBlogArticles from './pages/admin/blogs/AdminBlogArticles';

import AdminContactHero from './pages/admin/contact/AdminContactHero';
import AdminContactIntro from './pages/admin/contact/AdminContactIntro';
import AdminContactDetails from './pages/admin/contact/AdminContactDetails';
import AdminContactMap from './pages/admin/contact/AdminContactMap';
import AdminContactInquiries from './pages/admin/contact/AdminContactInquiries';

import AdminWhatWeDoHero from './pages/admin/services/AdminWhatWeDoHero';
import AdminWhatWeDoInnovation from './pages/admin/services/AdminWhatWeDoInnovation';
import AdminWhatWeDoServices from './pages/admin/services/AdminWhatWeDoServices';
import AdminServicePagesList from './pages/admin/services/AdminServicePagesList';
import AdminServicePageDetailEdit from './pages/admin/services/AdminServicePageDetailEdit';
import AdminProjectDetailEdit from './pages/admin/portfolio/AdminProjectDetailEdit';

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
          <Route path="home" element={<Navigate to="/admin/home/hero" replace />} />
          <Route path="home/hero" element={<AdminHomeHero />} />
          <Route path="home/services" element={<AdminHomeServices />} />
          <Route path="home/about" element={<AdminHomeAbout />} />
          <Route path="home/career" element={<AdminHomeCareer />} />
          <Route path="home/testimonials" element={<AdminHomeTestimonials />} />
          <Route path="home/social-impact" element={<AdminHomeSocialImpact />} />
          <Route path="home/commitment" element={<AdminHomeCommitment />} />
          <Route path="home/client-adoption" element={<AdminHomeClientAdoption />} />
          <Route path="home/transformation" element={<AdminHomeTransformation />} />

          <Route path="services" element={<Navigate to="/admin/services/grid" replace />} />
          <Route path="services/hero" element={<AdminWhatWeDoHero />} />
          <Route path="services/innovation" element={<AdminWhatWeDoInnovation />} />
          <Route path="services/grid" element={<AdminWhatWeDoServices />} />
          <Route path="services/pages" element={<AdminServicePagesList />} />
          <Route path="services/pages/:id" element={<AdminServicePageDetailEdit />} />
          <Route path="services/:id" element={<AdminServicePageDetailEdit />} />

          <Route path="projects" element={<AdminPortfolioProjects />} />
          <Route path="projects/:id" element={<AdminProjectDetailEdit />} />

          <Route path="about" element={<Navigate to="/admin/about/hero" replace />} />
          <Route path="about/hero" element={<AdminAboutHero />} />
          <Route path="about/content" element={<AdminAboutContent />} />
          <Route path="about/people" element={<AdminAboutPeople />} />
          <Route path="about/values" element={<AdminAboutValues />} />
          <Route path="about/transformation" element={<AdminAboutTransformation />} />
          <Route path="career" element={<Navigate to="/admin/career/hero" replace />} />
          <Route path="career/hero" element={<AdminCareerHero />} />
          <Route path="career/jobs" element={<AdminCareerJobs />} />
          <Route path="career/applications" element={<AdminCareerApplications />} />
          <Route path="career/contact" element={<AdminCareerContact />} />
          <Route path="blogs" element={<Navigate to="/admin/blogs/hero" replace />} />
          <Route path="blogs/hero" element={<AdminBlogHero />} />
          <Route path="blogs/content" element={<AdminBlogContent />} />
          <Route path="blogs/articles" element={<AdminBlogArticles />} />
          <Route path="portfolio" element={<Navigate to="/admin/portfolio/projects" replace />} />
          <Route path="portfolio/hero" element={<AdminPortfolioHero />} />
          <Route path="portfolio/clients" element={<AdminPortfolioClients />} />
          <Route path="portfolio/projects" element={<AdminPortfolioProjects />} />
          <Route path="portfolio/projects/:id" element={<AdminProjectDetailEdit />} />
          <Route path="testimonials" element={<Navigate to="/admin/home/testimonials" replace />} />
          <Route path="contact" element={<Navigate to="/admin/contact/hero" replace />} />
          <Route path="contact/hero" element={<AdminContactHero />} />
          <Route path="contact/intro" element={<AdminContactIntro />} />
          <Route path="contact/details" element={<AdminContactDetails />} />
          <Route path="contact/map" element={<AdminContactMap />} />
          <Route path="contact/inquiries" element={<AdminContactInquiries />} />
        </Route>

        <Route path="/privacy-policy" element={<GenericPlaceholder title="Privacy Policy" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
