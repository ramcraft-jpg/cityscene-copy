import React, { useState } from 'react';

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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-white py-20 md:py-28 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-12">
          What People Are Saying?
        </h2>

        {/* Carousel / Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {[
            testimonials[activeIndex % testimonials.length],
            testimonials[(activeIndex + 1) % testimonials.length],
            testimonials[(activeIndex + 2) % testimonials.length]
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1c1c1c] text-white rounded-2xl p-8 flex flex-col justify-center items-center text-center min-h-[220px] shadow-lg border border-neutral-800 transition-all duration-300 hover:scale-[1.02]"
            >
              <p className="text-base sm:text-lg font-normal text-gray-200 mb-6 leading-relaxed">
                {item.quote}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {item.author}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-6 bg-black' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
