import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const sixServices = [
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    textPosition: 'bottom',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    textPosition: 'top',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    textPosition: 'bottom',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'business-research-ai-innovation',
    title: 'Business Research With AI Innovation',
    textPosition: 'top',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'software-testing-qa',
    title: 'Software Testing & QA',
    textPosition: 'bottom',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    textPosition: 'top',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  }
];

// Duplicated list to enable seamless infinite looping
const cardsList = [...sixServices, ...sixServices];

export default function OurServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setEnableTransition(true);
      setCurrentIndex((prev) => prev + 1);
    }, 5000); // Holds for 5 seconds before pulling 1 card

    return () => clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex >= sixServices.length) {
      setEnableTransition(false);
      setCurrentIndex(0);
    }
  };

  return (
    <section className="w-full bg-[#181818] text-white py-20 md:py-28 overflow-hidden relative">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight">
          Our Services
        </h2>
      </div>

      {/* 3-Card Display Viewport Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Stepped Motion Track: Pulls 1 card every 5 seconds */}
        <div
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(calc(-${currentIndex} * (100% / 3 + 8px)))`,
            transition: enableTransition ? 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
          className="flex gap-6 w-full"
        >
          {cardsList.map((srv, idx) => (
            <Link
              key={`${srv.id}-${idx}`}
              to={`/services/${srv.id}`}
              className="w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] h-[440px] sm:h-[480px] shrink-0 rounded-2xl overflow-hidden relative group border border-white/10 shadow-2xl block transition-all duration-300"
            >
              {/* Background Image */}
              <img
                src={srv.image}
                alt={srv.title}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 group-hover:from-black/90 group-hover:to-black/90 transition-all duration-300" />

              {/* Text Overlay */}
              <div
                className={`absolute left-7 right-7 z-10 ${
                  srv.textPosition === 'top' ? 'top-8' : 'bottom-8'
                }`}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug group-hover:text-orange-400 transition-colors">
                  {srv.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
