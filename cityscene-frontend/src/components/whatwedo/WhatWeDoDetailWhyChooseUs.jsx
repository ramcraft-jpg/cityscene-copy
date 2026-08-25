import React from 'react';

export default function WhatWeDoDetailWhyChooseUs({ service }) {
  if (!service || !service.whyChooseCards || service.whyChooseCards.length === 0) return null;

  return (
    <section className="relative w-full bg-black text-white py-20 md:py-28 overflow-hidden border-t border-b border-white/10">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
          alt="Background visual"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white inline-block relative pb-2">
            Why <span className="underline decoration-white underline-offset-8">Choose</span> Us?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            {service.whyChooseSubtitle || 'Empowering organizations with robust software solutions.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {service.whyChooseCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#0b0b0b]/90 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 text-left space-y-4 hover:border-neutral-600 transition-all duration-300 min-h-[220px] flex flex-col justify-start"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
