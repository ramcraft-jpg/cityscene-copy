import React from 'react';

export default function PortfolioDetailOverview({ overviewParas }) {
  if (!overviewParas || overviewParas.length === 0) return null;

  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#f9fafb] rounded-2xl p-8 sm:p-12 border-l-[4px] border-gray-900 shadow-sm border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            System Overview
          </h2>

          <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            {overviewParas.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
