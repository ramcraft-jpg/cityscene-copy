import React from 'react';

export default function WhatWeDoDetailIntro({ service }) {
  if (!service || (!service.introP1 && !service.introP2)) return null;

  return (
    <section className="w-full bg-white py-14 md:py-20 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 leading-relaxed text-base sm:text-lg space-y-6">
        {service.introP1 && (
          <p>
            At <strong className="text-gray-900 font-semibold">CityScene Global</strong>, {service.introP1.replace(/^At CityScene Global,\s*/i, '')}
          </p>
        )}
        {service.introP2 && <p>{service.introP2}</p>}
      </div>
    </section>
  );
}
