import React, { useEffect } from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import HomeHero from '../components/home/HomeHero';
import HomeOurServicesSection from '../components/home/HomeOurServicesSection';
import HomeClientAdoptionSection from '../components/home/HomeClientAdoptionSection';
import HomeCommitmentSection from '../components/home/HomeCommitmentSection';
import HomeSocialImpactSection from '../components/home/HomeSocialImpactSection';
import HomeAboutUsSection from '../components/home/HomeAboutUsSection';
import HomeWhatPeopleAreSaying from '../components/home/HomeWhatPeopleAreSaying';
import HomeCareerNextBigThingSection from '../components/home/HomeCareerNextBigThingSection';
import HomeTransformationCTA from '../components/home/HomeTransformationCTA';

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
        <HomeOurServicesSection />

        {/* 4. Client Adoption / How We Serve The Client */}
        <HomeClientAdoptionSection />

        {/* 5. Our Commitment */}
        <HomeCommitmentSection />

        {/* 6. Social Impact */}
        <HomeSocialImpactSection />

        {/* 8. About Us */}
        <HomeAboutUsSection />

        {/* 9. What People Are Saying */}
        <HomeWhatPeopleAreSaying />

        {/* 10. Career / Next Big Thing CTA */}
        <HomeCareerNextBigThingSection />

        {/* 11. Transformation CTA */}
        <HomeTransformationCTA />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
