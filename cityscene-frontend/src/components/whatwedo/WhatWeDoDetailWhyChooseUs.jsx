import React from 'react';
import { getMediaUrl } from '../../utils/imageUrl';

export default function WhatWeDoDetailWhyChooseUs({ service }) {
  if (!service || !service.whyChooseCards || service.whyChooseCards.length === 0) return null;

  const rawBg = service.whyChooseUsBackgroundImage || service.whyChooseImage || service.whyChooseBgImage;
  const bgImage = rawBg ? getMediaUrl(rawBg) : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80';

  return (
    <section className="relative w-full bg-black text-white py-12 md:py-16 overflow-hidden border-t border-b border-white/10">
      {/* Dynamic Background Image of current service */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={service.title || "Core Value Proposition"}
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Dark Overlay for optimal text contrast while keeping image visible */}
      <div className="absolute inset-0 bg-black/65 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white whitespace-pre-line">
            {service.whyChooseTitle || 'Why Choose Us?'}
          </h2>
          {service.whyChooseSubtitle && (
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
              {service.whyChooseSubtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {service.whyChooseCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-black/80 backdrop-blur-md border border-neutral-800 p-5 sm:p-6 text-left space-y-3 hover:border-neutral-500 transition-all duration-300 flex flex-col justify-start"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug">
                {card.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {service.whyChooseBottomText && (
          <div className="max-w-4xl mx-auto text-center mt-12 sm:mt-16">
            <p className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed font-normal bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl">
              {service.whyChooseBottomText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
