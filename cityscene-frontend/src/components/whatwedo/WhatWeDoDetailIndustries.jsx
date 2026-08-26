import React from 'react';

export default function WhatWeDoDetailIndustries({ service }) {
  if (!service || !service.industries || !Array.isArray(service.industries) || service.industries.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white text-gray-900 py-12 sm:py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Header Block with Left Border */}
        <div className="border-l-4 border-black pl-6 mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 uppercase leading-none">
            {service.industriesTitle || 'Industries'}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl font-normal">
            {service.industriesSubtitle || 'Developing specialized digital ecosystems that resonate with niche audiences and drive measurable commercial growth.'}
          </p>
        </div>

        {/* Grid of 8 Industry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {service.industries.map((ind, idx) => (
            <div
              key={idx}
              className="border border-black p-5 sm:p-6 text-left transition-all duration-300 hover:bg-black hover:text-white group cursor-default flex flex-col justify-start"
            >
              <span className="text-xs sm:text-sm font-medium text-gray-500 group-hover:text-gray-400 mb-4 block">
                {ind.num || `0${idx + 1}/`}
              </span>
              <h3 className="text-base sm:text-lg font-medium uppercase text-gray-900 group-hover:text-white mb-3 tracking-tight">
                {ind.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-300 leading-relaxed font-normal">
                {ind.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
