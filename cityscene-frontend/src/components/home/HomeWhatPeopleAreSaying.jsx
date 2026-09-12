import React, { useState, useEffect } from 'react';
import { flashApiFetch } from '../../config/api';

const defaultTestimonials = [
  { quote: '"A game-changer for my business. Thank you!"', author: 'EsunScope' },
  { quote: '"Incredible service! The results exceeded my expectations"', author: 'Jai Kisaan Solar' },
  { quote: '"Great experience, excellent support, and fantastic results!"', author: 'Nazart' },
  { quote: '"Professional, innovative, and reliable—highly recommended!"', author: 'Kun Arabian' },
  { quote: '"A seamless experience from start to finish. Thank you!"', author: 'SunScope Capital' }
];

export default function HomeWhatPeopleAreSaying() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    flashApiFetch('/home-content/testimonials')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.testimonials && resData.content.testimonials.length > 0) {
          setData(resData.content);
        } else {
          setData({
            heading: 'What People Are Saying?',
            testimonials: defaultTestimonials
          });
        }
      })
      .catch((err) => {
        console.error('Error fetching HomeTestimonials API data:', err);
        setData({
          heading: 'What People Are Saying?',
          testimonials: defaultTestimonials
        });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section
        className="w-full bg-white text-black py-12 sm:py-16 px-5 text-center overflow-hidden relative"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)' }}
      >
        <div className="max-w-7xl mx-auto w-full text-center pb-6 animate-pulse">
          <div className="w-64 h-8 bg-gray-200 rounded mx-auto mb-8" />
          <div className="flex gap-5 justify-center overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-[280px] h-[180px] bg-gray-200 rounded-[10px] shrink-0" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const activeData = data || {
    heading: 'What People Are Saying?',
    testimonials: defaultTestimonials
  };

  const rawList = activeData.testimonials && activeData.testimonials.length > 0 ? activeData.testimonials : defaultTestimonials;
  // Quadrupled list for 100% seamless infinite marquee scrolling
  const marqueeList = [...rawList, ...rawList, ...rawList, ...rawList];

  return (
    <section
      className="w-full bg-white text-black py-12 sm:py-16 px-4 text-center overflow-hidden relative"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)' }}
    >
      {/* Explicit self-contained marquee animation styling */}
      <style>{`
        @keyframes testimonialsMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .testimonials-marquee-track {
          display: flex;
          flex-wrap: nowrap;
          width: max-content;
          animation: testimonialsMarquee 28s linear infinite;
          will-change: transform;
        }
        .testimonials-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto w-full text-center pb-6">
        <h2 className="text-2xl sm:text-3xl font-medium text-black mb-8 sm:mb-10">
          {activeData.heading || 'What People Are Saying?'}
        </h2>

        {/* Continuous Marquee Track Wrapper */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="testimonials-marquee-track gap-5">
            {marqueeList.map((item, idx) => (
              <div
                key={idx}
                className="w-[260px] sm:w-[290px] min-h-[180px] flex-shrink-0 bg-[#1a1a1a] text-white rounded-[10px] p-5 flex flex-col justify-center items-center text-center shadow-md transition-transform duration-300 hover:scale-[1.03]"
              >
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light mb-3">
                  {item.quote}
                </p>
                <p className="text-xs sm:text-sm font-medium text-white">
                  - {item.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
