import React from 'react';
import { getMediaUrl, handleImageError } from '../../utils/imageUrl';

export default function PortfolioDetailValueProp({ project }) {
  if (!project) return null;

  const valuePropositions = project.valuePropositions || project.benefits || [];

  if (!valuePropositions || valuePropositions.length === 0) return null;

  const rawBgImage = project.valuePropBgImage || project.image || project.heroImage || project.backgroundImage;
  const bgImage = getMediaUrl(rawBgImage);

  return (
    <section className="relative w-full text-white py-20 md:py-28 overflow-hidden bg-gray-900">
      {/* 1. Project Background Image (Covers full section behind cards) */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={`${project.title || 'Portfolio'} Core Value Background`}
          onError={(e) => handleImageError(e)}
          className="w-full h-full object-cover object-center"
        />
        {/* 2. Dark Transparent Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-brightness-75" />
      </div>

      {/* 3. Section Content Layer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium text-white tracking-tight text-center mb-16">
          Core Value <span className="border-b-2 border-white pb-1">Proposition</span>
        </h2>

        {/* 4. 6 Dark Semi-Opaque Proposition Cards (3-column x 2-row layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {valuePropositions.map((val, idx) => (
            <div
              key={idx}
              className="bg-black/65 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col justify-start hover:border-white/50 transition-all duration-300 shadow-2xl"
            >
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-3 tracking-tight">
                {val.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
