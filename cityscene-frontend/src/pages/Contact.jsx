import React, { useEffect } from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import SEO from '../components/common/SEO';
import ContactHero from '../components/contact/ContactHero';
import ContactIntro from '../components/contact/ContactIntro';
import ContactInfo from '../components/contact/ContactInfo';
import ContactMap from '../components/contact/ContactMap';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col selection:bg-orange-500 selection:text-white">
      <SEO pageKey="contact" />
      {/* 1. Header Navbar */}
      <Header />

      <main className="flex-grow">
        {/* 2. Contact Hero with floating Form Overlay matching Screenshot 3 */}
        <ContactHero />

        {/* 3. Contact Introduction (Dark section with REACH US OUT divider matching Screenshot 2) */}
        <ContactIntro />

        {/* 4. Contact Us Info & Google Map Side-by-Side Section matching Screenshot 1 */}
        <section className="w-full bg-white text-gray-900 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Column: Contact Us Details */}
              <div className="lg:col-span-5">
                <ContactInfo />
              </div>

              {/* Right Column: Google Map Embed */}
              <div className="lg:col-span-7">
                <ContactMap />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Shared Footer */}
      <Footer />
    </div>
  );
}
