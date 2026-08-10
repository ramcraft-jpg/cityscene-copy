import React from 'react';

const testimonials = [
  {
    quote: '"A game-changer for my business. Thank you!"',
    author: '- EsunScope'
  },
  {
    quote: '"Incredible service! The results exceeded my expectations"',
    author: '- Jai Kisaan Solar'
  },
  {
    quote: '"Great experience, excellent support, and fantastic results!"',
    author: '- Nazart'
  },
  {
    quote: '"Professional, innovative, and reliable—highly recommended!"',
    author: '- Kun Arabian'
  },
  {
    quote: '"A seamless experience from start to finish. Thank you!"',
    author: '- SunScope Capital'
  }
];

export default function WhatPeopleAreSaying() {
  // Duplicating list for seamless infinite marquee scrolling
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-gray-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-10 sm:mb-12">
          What People Are Saying?
        </h2>

        {/* Constrained Continuous Marquee Track Wrapper */}
        <div className="relative w-full overflow-hidden py-4 rounded-3xl">
          {/* Edge Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="animate-marquee flex gap-5 sm:gap-6">
            {marqueeItems.map((item, idx) => (
              <div
                key={idx}
                className="w-[260px] sm:w-[300px] md:w-[320px] flex-shrink-0 bg-[#1c1c1c] text-white rounded-2xl md:rounded-3xl p-6 sm:p-8 flex flex-col justify-center items-center text-center min-h-[200px] shadow-lg border border-neutral-800 transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
              >
                <p className="text-sm sm:text-base text-gray-200 mb-5 leading-relaxed font-normal">
                  {item.quote}
                </p>
                <p className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {item.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
