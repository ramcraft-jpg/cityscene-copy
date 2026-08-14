import React, { useEffect } from 'react';
import Header from '../components/shared/Header';
import CareerHero from '../components/career/CareerHero';
import CareerJobGrid from '../components/career/CareerJobGrid';
import CareerContactSection from '../components/career/CareerContactSection';
import Footer from '../components/shared/Footer';

export default function Career() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-orange-500 selection:text-white">
      <Header />
      <main className="flex-grow">
        <CareerHero />
        <CareerJobGrid />
        <CareerContactSection />
      </main>
      <Footer />
    </div>
  );
}
