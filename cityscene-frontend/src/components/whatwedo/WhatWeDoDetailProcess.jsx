import React from 'react';

export default function WhatWeDoDetailProcess({ service }) {
  if (!service || !service.processSteps || service.processSteps.length === 0) return null;

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            {service.processTitle || 'Our Process'}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Structured, transparent, and result-oriented engineering workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.processSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm relative text-left hover:shadow-md transition-shadow"
            >
              <span className="text-4xl font-extrabold text-orange-500/30 block mb-4">
                0{idx + 1}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
