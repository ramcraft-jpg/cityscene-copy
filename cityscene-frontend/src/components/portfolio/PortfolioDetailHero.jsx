import React from 'react';
import { getMediaUrl, handleImageError } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';

export default function PortfolioDetailHero({ project, categoryCaps, titleSystem, overviewParas = [], onOpenDemo }) {
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  if (!project) return null;

  const videoSrc = getMediaUrl(project.heroVideo || project.backgroundVideo || project.video);
  const imageSrc = getMediaUrl(project.heroImage || project.backgroundImage || project.image);
  const isVideoMode = project.backgroundMediaType === 'video' || (project.backgroundMediaType !== 'image' && !!videoSrc);

  const displayParas = overviewParas.length > 0
    ? overviewParas
    : [project.description || 'Enterprise project system developed for seamless operations and digital transformation.'];

  return (
    <section className="w-full bg-white border-b border-gray-100 min-h-[580px] lg:min-h-[700px] flex flex-col lg:flex-row items-stretch overflow-hidden">
      {/* LEFT HALF: Full-height Split-Screen Image / Video (0 Left Margin, Full Height) */}
      <div className="w-full lg:w-1/2 shrink-0 min-h-[360px] sm:min-h-[450px] lg:min-h-[640px] relative overflow-hidden bg-gray-900">
        {isVideoMode && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={imageSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : null}

        {(!isVideoMode || !videoSrc) && (
          <img
            src={imageSrc}
            alt={project.title}
            onError={(e) => handleImageError(e)}
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* RIGHT HALF: Project Information Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-12 lg:py-20 text-left bg-white">
        <div className="max-w-xl w-full">
          {/* Category / Subheading */}
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-gray-900 uppercase mb-2 block">
            {categoryCaps}
          </span>

          {/* Small Horizontal Line */}
          <div className="w-12 h-[2.5px] bg-gray-900 mb-6 sm:mb-8" />

          {/* Project Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-900 tracking-tight leading-[1.18] mb-6">
            {titleSystem}
          </h1>

          {/* Full Description (Multiple lines of content) */}
          <div className="space-y-4 text-base sm:text-lg text-gray-600 font-light leading-relaxed mb-8">
            {displayParas.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* CTA Button */}
          <div>
            <button
              onClick={onOpenDemo}
              className="px-8 py-3.5 bg-gray-900 hover:bg-black text-white font-bold text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
