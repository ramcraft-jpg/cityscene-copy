import React from 'react';

export default function WhatWeDoDetailIntro({ service }) {
  if (!service) return null;

  // Extract all available intro paragraphs dynamically
  let paragraphs = [];

  if (Array.isArray(service.introParagraphs) && service.introParagraphs.length > 0) {
    paragraphs = service.introParagraphs.filter(p => p && typeof p === 'string');
  } else {
    const candidateKeys = ['introP1', 'introP2', 'introP3', 'introP4', 'introContent', 'additionalIntroContent'];
    candidateKeys.forEach(key => {
      if (service[key] && typeof service[key] === 'string' && service[key].trim().length > 0) {
        paragraphs.push(service[key]);
      }
    });
  }

  if (paragraphs.length === 0) return null;

  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-50 border-l-[6px] border-black rounded-2xl p-5 sm:p-7 md:p-8 text-left shadow-sm">
          <div className="text-neutral-700 leading-relaxed text-base sm:text-lg lg:text-xl space-y-6 font-normal">
            {paragraphs.map((para, idx) => {
              if (para.startsWith('At CityScene Global')) {
                return (
                  <p key={idx} className="break-words">
                    At <strong className="text-neutral-900 font-semibold">CityScene Global</strong>, {para.replace(/^At CityScene Global,\s*/i, '')}
                  </p>
                );
              }
              return (
                <p key={idx} className="break-words">
                  {para}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
