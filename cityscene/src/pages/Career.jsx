import React, { useEffect } from 'react';
import Header from '../components/Header';
import CareerHero from '../components/CareerHero';
import JobGrid from '../components/JobGrid';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

export default function Career() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-orange-500 selection:text-white">
      <Header />
      <main className="flex-grow">
        <CareerHero />
        <JobGrid />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
