import React from 'react';

export default function PortfolioDetailModules({ project }) {
  if (!project) return null;

  const modulesTitle = project.modulesTitle || "System Modules";
  const summaryNote = project.summaryNote || (project.description ? `Key capabilities and operational modules for ${project.title}.` : '');
  const capabilities = project.capabilities || project.modules || [];

  if (!capabilities || capabilities.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left Column: Title & Overview */}
          <div className="md:col-span-5 flex flex-col items-start">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-medium text-gray-900 tracking-tight leading-[1.2] mb-6">
              {modulesTitle}
            </h2>

            {/* Short Underline below category */}
            <div className="w-16 h-[2px] bg-gray-900 mb-8" />

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md font-light">
              {summaryNote}
            </p>
          </div>

          {/* Right Column: Vertical Modules List with Left Divider */}
          <div className="md:col-span-7 border-l-2 border-gray-900 pl-8 lg:pl-12 space-y-8 sm:space-y-10">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-xl font-medium text-gray-900 tracking-tight">
                  {cap.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
