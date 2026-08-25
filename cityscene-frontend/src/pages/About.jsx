import React, { useEffect } from 'react';
import Header from '../components/shared/Header';
import SEO from '../components/common/SEO';
import AboutHero from '../components/about/AboutHero';
import AboutCompanySection from '../components/about/AboutCompanySection';
import AboutOurPeopleSection from '../components/about/AboutOurPeopleSection';
import AboutValuesSection from '../components/about/AboutValuesSection';
import AboutTransformationCTA from '../components/about/AboutTransformationCTA';
import Footer from '../components/shared/Footer';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-orange-500 selection:text-white">
      <SEO pageKey="about" />
      <Header />
      <main className="flex-grow">
        <AboutHero />
        <AboutCompanySection />
        <AboutOurPeopleSection />
        <AboutValuesSection />
        <AboutTransformationCTA />
      </main>
      <Footer />
    </div>
  );
}
