import React from 'react';

export default function PortfolioDetailOverview({ overviewParas }) {
  if (!overviewParas || overviewParas.length === 0) return null;

  // Helper to parse **bold text** inside paragraphs
  const renderFormattedParagraph = (text) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-[#f8f9fa] rounded-2xl p-8 sm:p-12 border-l-[4px] border-black border-y border-r border-gray-200/60 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 tracking-tight">
            System Overview
          </h2>

          <div className="space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
            {overviewParas.map((para, idx) => (
              <p key={idx}>{renderFormattedParagraph(para)}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
