import React, { useState, useEffect } from 'react';

const defaultTestimonials = [
  { quote: '"A game-changer for my business. Thank you!"', author: 'EsunScope' },
  { quote: '"Incredible service! The results exceeded my expectations"', author: 'Jai Kisaan Solar' },
  { quote: '"Great experience, excellent support, and fantastic results!"', author: 'Nazart' },
  { quote: '"Professional, innovative, and reliable—highly recommended!"', author: 'Kun Arabian' },
  { quote: '"A seamless experience from start to finish. Thank you!"', author: 'SunScope Capital' }
];

export default function HomeWhatPeopleAreSaying() {
  const [data, setData] = useState({
    heading: 'What People Are Saying?',
    testimonials: defaultTestimonials
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/testimonials')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.testimonials && resData.content.testimonials.length > 0) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeTestimonials API data:', err));
  }, []);

  const rawList = data.testimonials && data.testimonials.length > 0 ? data.testimonials : defaultTestimonials;
  // Quadrupled list for 100% seamless infinite marquee scrolling
  const marqueeList = [...rawList, ...rawList, ...rawList, ...rawList];

  return (
    <section className="w-full min-h-screen min-h-[100svh] bg-white py-10 md:py-14 flex flex-col justify-center border-b border-gray-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight mb-12 sm:mb-16">
          {data.heading || 'What People Are Saying?'}
        </h2>

        {/* Continuous Marquee Track Wrapper */}
        <div className="relative w-full overflow-hidden py-6">
          <div className="animate-marquee flex gap-6 sm:gap-8">
            {marqueeList.map((item, idx) => (
              <div
                key={idx}
                className="w-[270px] sm:w-[320px] md:w-[340px] h-[210px] sm:h-[220px] flex-shrink-0 bg-[#1c1c1c] text-white rounded-2xl md:rounded-3xl p-6 sm:p-8 flex flex-col justify-center items-center text-center shadow-xl border border-neutral-800 transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
              >
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal mb-5 max-w-xs">
                  {item.quote}
                </p>
                <p className="text-base sm:text-lg font-bold text-white tracking-tight">
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
