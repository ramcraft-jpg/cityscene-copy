import React, { useEffect } from 'react';
import Header from '../components/shared/Header';
import WhatWeDoHero from '../components/whatwedo/WhatWeDoHero';
import WhatWeDoInnovationSection from '../components/whatwedo/WhatWeDoInnovationSection';
import WhatWeDoGrid from '../components/whatwedo/WhatWeDoGrid';
import Footer from '../components/shared/Footer';

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-orange-500 selection:text-white">
      <Header />
      <main className="flex-grow">
        <WhatWeDoHero />
        <WhatWeDoInnovationSection />
        <WhatWeDoGrid />
      </main>
      <Footer />
    </div>
  );
}
