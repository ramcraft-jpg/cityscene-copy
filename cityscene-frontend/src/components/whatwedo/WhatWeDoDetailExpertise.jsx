import React from 'react';

export default function WhatWeDoDetailExpertise({ service }) {
  if (!service) return null;

  const hasExpertise = service.expertiseItems && service.expertiseItems.length > 0;
  const hasSoftwareTypes = service.softwareTypesItems && service.softwareTypesItems.length > 0;

  if (!hasExpertise && !hasSoftwareTypes) return null;

  return (
    <>
      {/* 1. Main Expertise Rail Section */}
      {hasExpertise && (
        <section className="w-full bg-white py-10 md:py-12 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5 space-y-3">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight leading-tight">
                  {service.expertiseTitle || 'Our Expertise'}
                </h2>
                <div className="w-16 h-1 bg-gray-900 my-3" />
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {service.expertiseSubtitle || 'Delivering high quality capabilities across domains.'}
                </p>
              </div>

              <div className="lg:col-span-7 lg:border-l-2 lg:border-gray-900 lg:pl-10 space-y-6 text-left">
                {service.expertiseItems.map((item, idx) => (
                  <div key={idx} className="space-y-1.5 border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">
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
      )}

      {/* 2. Explore Our Custom Software Development Expertise (Exact CityScene Global Black Grid Section) */}
      {hasSoftwareTypes && (
        <section className="w-full bg-black text-white py-10 sm:py-12 border-t border-zinc-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white text-left mb-6 md:mb-8 tracking-tight leading-snug">
              {service.softwareTypesTitle || 'Explore Our Custom Software Development Expertise'}
            </h2>

            {/* Grid matching reference website (3 cols on lg desktop, 2 cols on md tablet, 1 col on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {service.softwareTypesItems.map((st, idx) => (
                <div
                  key={idx}
                  className="bg-black border border-[#333333] p-5 sm:p-6 rounded-none text-left flex flex-col justify-start"
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 tracking-tight leading-snug">
                    {st.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
