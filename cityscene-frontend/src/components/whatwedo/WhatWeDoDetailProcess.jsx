import React from 'react';

export default function WhatWeDoDetailProcess({ service }) {
  if (!service || !service.processSteps || !Array.isArray(service.processSteps) || service.processSteps.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-black text-white py-10 sm:py-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white text-left mb-6 md:mb-8 tracking-tight leading-snug">
          {service.processTitle || 'Our App Development Process'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {service.processSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-black border border-[#333333] p-5 sm:p-6 rounded-none text-left flex flex-col justify-start"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 tracking-tight leading-snug">
                {step.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
