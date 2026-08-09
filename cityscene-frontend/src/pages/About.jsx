import React, { useEffect } from 'react';
import Header from '../components/Header';
import AboutHero from '../components/AboutHero';
import CompanySection from '../components/CompanySection';
import OurPeopleSection from '../components/OurPeopleSection';
import ValuesSection from '../components/ValuesSection';
import TransformationCTA from '../components/TransformationCTA';
import Footer from '../components/Footer';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-orange-500 selection:text-white">
      <Header />
      <main className="flex-grow">
        <AboutHero />
        <CompanySection />
        <OurPeopleSection />
        <ValuesSection />
        <TransformationCTA />
      </main>
      <Footer />
    </div>
  );
}
