import React from 'react';

export default function WhatWeDoDetailProcess({ service }) {
  if (!service || !service.processSteps || !Array.isArray(service.processSteps) || service.processSteps.length === 0) {
    return null;
  }

  // Generate dynamic heading matching user requirement
  const getHeading = () => {
    if (service.processHeading) return service.processHeading;
    if (service.processTitle && service.processTitle.toLowerCase().includes('driving digital growth')) {
      return service.processTitle;
    }
    
    // Construct clean service name for heading
    let name = service.topicName || service.displayTitle || service.title || 'Technology';

    if (service.id === 'ai-scope-evaluation' || name.toLowerCase().includes('scope evaluation')) {
      name = 'AI Scope Evaluation';
    } else if (service.id === 'business-research-ai' || name.toLowerCase().includes('business research')) {
      name = 'AI Business Research';
    } else {
      name = name.replace(/\n/g, ' ').replace(/ Services$/i, '').trim();
      if (name.toLowerCase() === 'custom software') name = 'Custom Software Development';
      if (name.toLowerCase() === 'mobile app') name = 'Mobile App Development';
      if (name.toLowerCase() === 'web') name = 'Web Development';
      if (name.toLowerCase() === 'ai & ml') name = 'AI & Machine Learning';
      if (name.toLowerCase() === 'blockchain') name = 'Blockchain Development';
      if (name.toLowerCase() === 'software qa') name = 'Software Testing & QA';
    }

    return `Driving Digital Growth Through ${name}`;
  };

  const sectionHeading = getHeading();

  return (
    <section className="w-full bg-[#050607] py-16 sm:py-20 text-white relative overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14 space-y-3">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
            {sectionHeading}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-normal">
            Structured, transparent, and result-oriented engineering workflows designed for enterprise scale.
          </p>
        </div>

        {/* 3-Column x 2-Row Process Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {service.processSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#0d0e12] rounded-xl sm:rounded-2xl p-7 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-start text-left shadow-lg hover:shadow-2xl group"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2.5 sm:mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-normal">
                {step.desc || step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
