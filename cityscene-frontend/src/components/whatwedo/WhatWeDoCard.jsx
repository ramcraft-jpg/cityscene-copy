import React from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';

export default function WhatWeDoCard({ service, index = 0 }) {
  const isOdd = index % 2 === 0;
  const cardImage = service.image || service.heroImage || service.backgroundImage || service.bgImage;

  return (
    <Link
      to={service.path}
      className="service-card group relative block w-full h-[380px] sm:h-[420px] rounded-[20px] overflow-hidden border border-white/10 outline-none flex transition-transform duration-300 hover:scale-[1.03]"
      style={{ textDecoration: 'none' }}
    >
      {/* Service Background Image */}
      <img
        src={getMediaUrl(cardImage)}
        alt={service.displayTitle || service.title}
        className="w-full h-full object-cover object-center absolute inset-0"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />

      {/* Text Container with Odd/Even Positioning */}
      <div
        className={`relative z-10 text-left text-white p-[15px] w-full transition-all duration-300 ${
          isOdd ? 'self-end' : 'self-start'
        }`}
      >
        <h3 className="text-[22px] sm:text-[28px] font-medium text-white capitalize leading-[1.1]">
          {service.title}
        </h3>
      </div>
    </Link>
  );
}
