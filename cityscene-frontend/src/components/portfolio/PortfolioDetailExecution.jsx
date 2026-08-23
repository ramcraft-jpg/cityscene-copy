import React from 'react';

export default function PortfolioDetailExecution({ project }) {
  if (!project) return null;

  const executionTitle = project.executionTitle || "Project Execution & Analytics";
  const executionFeatures = project.executionFeatures || project.features || [];

  if (!executionFeatures || executionFeatures.length === 0) return null;

  return (
    <section className="w-full bg-black text-white py-16 md:py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 tracking-tight">
          Project Execution & Analytics
        </h2>

        {/* 3-Column Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {executionFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="border border-white/20 bg-neutral-950/90 rounded-xl p-8 space-y-3 hover:border-white/40 transition-colors"
            >
              <h3 className="text-xl font-bold text-white leading-snug">
                {feat.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
