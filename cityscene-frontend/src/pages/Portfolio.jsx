import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PortfolioHero from '../components/PortfolioHero';
import TrustedClients from '../components/TrustedClients';
import ProjectGrid from '../components/ProjectGrid';
import { getProjects } from '../services/projectService';

export default function Portfolio() {
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    getProjects().then((data) => {
      setProjectsList(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Shared Header */}
      <Header />

      <main className="flex-grow">
        {/* Portfolio Hero */}
        <PortfolioHero />

        {/* Trusted By Startups Section */}
        <TrustedClients />

        {/* Our Projects Grid Section */}
        {loading ? (
          <div className="bg-black py-24 text-center text-white">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-medium">Loading portfolio projects...</p>
          </div>
        ) : (
          <ProjectGrid projects={projectsList} />
        )}
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
