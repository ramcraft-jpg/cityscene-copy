import React from 'react';

export default function PortfolioDetailHero({ project, categoryCaps, titleSystem, onOpenDemo }) {
  if (!project) return null;

  const videoSrc = project.heroVideo || project.backgroundVideo || project.video;
  const imageSrc = project.heroImage || project.backgroundImage || project.image;
  const isVideoMode = project.backgroundMediaType === 'video' || (project.backgroundMediaType !== 'image' && !!videoSrc);

  return (
    <section className="w-full bg-white border-b border-gray-100 py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column Media Container */}
          <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 aspect-[4/3] relative">
            {isVideoMode && videoSrc ? (
              <video
                src={videoSrc}
                poster={imageSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : null}

            {(!isVideoMode || !videoSrc) && (
              <img
                src={imageSrc}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Right Column Details */}
          <div className="flex flex-col items-start">
            {/* Category Caps */}
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-gray-900 uppercase mb-2 block">
              {categoryCaps}
            </span>

            {/* Short Underline below category */}
            <div className="w-12 h-[2px] bg-gray-900 mb-6" />

            {/* Project System Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-gray-900 tracking-tight leading-[1.15] mb-6">
              {titleSystem}
            </h1>

            {/* Summary Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
              {project.description}
            </p>

            {/* Request Demo Button */}
            <button
              onClick={onOpenDemo}
              className="px-6 py-2.5 border border-gray-900 text-gray-900 font-semibold text-sm rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-200 focus:outline-none"
            >
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
