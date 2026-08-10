import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeHero from '../components/home/HomeHero';
import OurServicesSection from '../components/home/OurServicesSection';
import ClientAdoptionSection from '../components/home/ClientAdoptionSection';
import CommitmentSection from '../components/home/CommitmentSection';
import TestimonialHighlight from '../components/home/TestimonialHighlight';
import SocialImpactSection from '../components/home/SocialImpactSection';
import AboutUsHomeSection from '../components/home/AboutUsHomeSection';
import WhatPeopleAreSaying from '../components/home/WhatPeopleAreSaying';
import CareerNextBigThingSection from '../components/home/CareerNextBigThingSection';
import TransformationCTAHome from '../components/home/TransformationCTAHome';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-orange-500 selection:text-white">
      {/* 1. Header / Navbar */}
      <Header />

      <main className="flex-grow">
        {/* 2. Hero / Slideshow */}
        <HomeHero />

        {/* 3. Our Services */}
        <OurServicesSection />

        {/* 4. Client Adoption / How We Serve The Client */}
        <ClientAdoptionSection />

        {/* 5. Our Commitment */}
        <CommitmentSection />

        {/* 6. Testimonial Highlight */}
        <TestimonialHighlight />

        {/* 7. Social Impact */}
        <SocialImpactSection />

        {/* 8. About Us */}
        <AboutUsHomeSection />

        {/* 9. What People Are Saying */}
        <WhatPeopleAreSaying />

        {/* 10. Career / Next Big Thing CTA */}
        <CareerNextBigThingSection />

        {/* 11. Transformation CTA */}
        <TransformationCTAHome />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
