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
    <section
      className="w-full bg-white text-black py-12 sm:py-14 px-5 text-center overflow-hidden relative"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)' }}
    >
      <div className="max-w-[800px] mx-auto w-full text-center pb-6">

        <h2 className="text-2xl font-medium text-black mb-8">
          {data.heading || 'What People Are Saying?'}
        </h2>

        {/* Continuous Marquee Track Wrapper */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="animate-marquee flex gap-5">
            {marqueeList.map((item, idx) => (
              <div
                key={idx}
                className="w-[260px] sm:w-[280px] min-h-[180px] flex-shrink-0 bg-[#1a1a1a] text-white rounded-[10px] p-5 flex flex-col justify-center items-center text-center shadow-md transition-transform duration-300 hover:scale-[1.03]"
              >
                <p className="text-sm text-gray-200 leading-relaxed font-light mb-3">
                  {item.quote}
                </p>
                <p className="text-sm font-medium text-white">
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
