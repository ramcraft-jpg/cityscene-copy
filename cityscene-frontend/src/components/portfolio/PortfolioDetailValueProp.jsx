import React from 'react';

export default function PortfolioDetailValueProp({ project }) {
  if (!project) return null;

  const valuePropositions = project.valuePropositions || project.benefits || [];

  if (!valuePropositions || valuePropositions.length === 0) return null;

  return (
    <section className="w-full bg-[#474747] text-white py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight text-center mb-16">
          Core Value <span className="border-b-2 border-white pb-1">Proposition</span>
        </h2>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {valuePropositions.map((val, idx) => (
            <div
              key={idx}
              className="bg-[#383838] border border-white/20 rounded-2xl p-8 flex flex-col justify-start hover:border-white/50 transition-all duration-300 shadow-xl"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                {val.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
