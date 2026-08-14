import React from 'react';
import { Link } from 'react-router-dom';

export default function WhatWeDoCard({ service }) {
  const getPositionClasses = (position) => {
    switch (position) {
      case 'top-left':
        return 'top-8 left-8 text-left items-start';
      case 'bottom-right':
        return 'bottom-8 right-8 text-right items-end';
      case 'bottom-left':
      default:
        return 'bottom-8 left-8 text-left items-start';
    }
  };

  return (
    <Link
      to={service.path}
      className="group relative block w-full h-[380px] sm:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#171717] focus:ring-white"
    >
      {/* Service Background Image */}
      <img
        src={service.image}
        alt={service.displayTitle}
        className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-300" />

      {/* Text Container with Dynamic Positioning */}
      <div className={`absolute max-w-[85%] flex flex-col z-10 ${getPositionClasses(service.position)}`}>
        <h3 className="text-white text-2xl sm:text-3xl font-medium tracking-tight whitespace-pre-line leading-tight group-hover:text-white/95 transition-colors">
          {service.title}
        </h3>
      </div>

      {/* Subtle Border Glow on Hover */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/10 group-hover:border-white/30 transition-colors pointer-events-none" />
    </Link>
  );
}
