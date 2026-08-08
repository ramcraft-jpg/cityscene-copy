import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import InnovationSection from '../components/InnovationSection';
import ServicesGrid from '../components/ServicesGrid';
import Footer from '../components/Footer';

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-orange-500 selection:text-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <InnovationSection />
        <ServicesGrid />
      </main>
      <Footer />
    </div>
  );
}
