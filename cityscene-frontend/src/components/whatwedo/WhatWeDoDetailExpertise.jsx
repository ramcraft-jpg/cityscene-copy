import React from 'react';

export default function WhatWeDoDetailExpertise({ service }) {
  if (!service || !service.expertiseItems || service.expertiseItems.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {service.expertiseTitle || 'Our Expertise'}
            </h2>
            <div className="w-16 h-1 bg-gray-900 my-4" />
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {service.expertiseSubtitle || 'Delivering high quality capabilities across domains.'}
            </p>
          </div>

          <div className="lg:col-span-7 lg:border-l-2 lg:border-gray-900 lg:pl-12 space-y-8 text-left">
            {service.expertiseItems.map((item, idx) => (
              <div key={idx} className="space-y-2 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
