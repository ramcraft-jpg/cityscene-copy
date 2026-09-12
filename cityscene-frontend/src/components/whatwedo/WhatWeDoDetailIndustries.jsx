import React from 'react';

export default function WhatWeDoDetailIndustries({ service }) {
  if (!service || !service.industries || !Array.isArray(service.industries) || service.industries.length === 0) {
    return null;
  }

  const items = service.industries;
  const isThreeCol = service.industriesGridCols === 3 || items.length <= 4;
  const cols = isThreeCol ? 3 : 4;
  
  // Calculate empty grid cells needed to complete the row alignment on desktop
  const totalCells = items.length <= cols ? cols : Math.ceil(items.length / cols) * cols;
  const emptyCellsCount = totalCells - items.length;

  return (
    <section className="w-full bg-white text-gray-900 py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        
        {/* Header Block with Left Vertical Black Line */}
        <div className="border-l-4 sm:border-l-[5px] border-black pl-4 sm:pl-6 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 uppercase leading-none">
            {service.industriesTitle || 'INDUSTRIES'}
          </h2>
          {service.industriesSubtitle && (
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl font-normal">
              {service.industriesSubtitle}
            </p>
          )}
        </div>

        {/* Continuous 3-Column or 4-Column Grid Container */}
        <div className={`grid grid-cols-1 ${isThreeCol ? 'md:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} border-t border-l border-black`}>
          {items.map((ind, idx) => {
            const isBlackCard = Boolean(ind.isBlack || ind.active);
            return (
              <div
                key={idx}
                className={`border-r border-b border-black p-6 sm:p-8 lg:p-10 text-left min-h-[220px] flex flex-col justify-start transition-all duration-300 group cursor-pointer ${
                  isBlackCard
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-900 hover:bg-black hover:text-white'
                }`}
              >
                <span
                  className={`text-xs sm:text-sm font-bold tracking-wider mb-6 sm:mb-8 block ${
                    isBlackCard ? 'text-white' : 'text-gray-900 group-hover:text-white'
                  }`}
                >
                  {ind.num || `0${idx + 1}/`}
                </span>
                <h3
                  className={`text-base sm:text-xl font-bold uppercase mb-3 tracking-tight ${
                    isBlackCard ? 'text-white' : 'text-gray-900 group-hover:text-white'
                  }`}
                >
                  {ind.title}
                </h3>
                <p
                  className={`text-xs sm:text-sm leading-relaxed font-normal ${
                    isBlackCard ? 'text-gray-300' : 'text-gray-600 group-hover:text-gray-300'
                  }`}
                >
                  {ind.desc}
                </p>
              </div>
            );
          })}

          {/* Grid Fillers for Desktop Alignment */}
          {Array.from({ length: emptyCellsCount }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="border-r border-b border-black bg-white min-h-[220px] hidden md:block"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
