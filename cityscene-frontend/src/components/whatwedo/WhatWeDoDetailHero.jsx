import React from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';

export default function WhatWeDoDetailHero({ service }) {
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  if (!service) return null;

  const videoSrc = getMediaUrl(
    service.heroVideo || service.backgroundVideo || service.video
  );

  // Dynamically retrieve the respective service card image
  const imageSrc = getMediaUrl(
    service.image || service.heroImage || service.backgroundImage
  );

  const isVideoMode =
    service.backgroundMediaType === 'video' ||
    (service.backgroundMediaType !== 'image' && !!videoSrc);

  const topicLabel = service.topicName || service.category || 'SERVICES';

  return (
    <section className="w-full bg-white flex flex-col lg:flex-row min-h-[500px] lg:min-h-[580px] border-b border-gray-100 overflow-hidden">
      
      {/* Left Column: Edge-to-Edge Respective Service Image (~46% width) */}
      <div className="w-full lg:w-[46%] relative min-h-[380px] sm:min-h-[460px] lg:min-h-full bg-slate-900 flex-shrink-0">
        {isVideoMode && videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={imageSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : null}

        {(!isVideoMode || !videoSrc) && (
          <img
            src={imageSrc}
            alt={service.displayTitle || service.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* Right Column: Spacious Content Area (~54% width) */}
      <div className="w-full lg:w-[54%] flex flex-col justify-center text-left px-8 sm:px-14 lg:pl-20 lg:pr-24 py-14 lg:py-20 bg-white">
        
        {/* Category Label */}
        <div>
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gray-900 uppercase block">
            {topicLabel}
          </span>
          {/* Short Underline (75px) */}
          <div className="w-[75px] h-[2.5px] bg-black mt-3 mb-8 sm:mb-10" />
        </div>

        {/* Large Service Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-medium text-gray-900 tracking-tight leading-[1.18] mb-6 sm:mb-8 whitespace-pre-line">
          {service.displayTitle || service.title}
        </h1>

        {/* Short Service Description */}
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal mb-8 sm:mb-10 max-w-xl">
          {service.heroDesc || service.shortDesc}
        </p>

        {/* Rectangular Outlined About Us Button */}
        <div>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-9 py-3.5 rounded-[6px] border-2 border-black bg-transparent text-black font-semibold text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-300"
          >
            About Us
          </Link>
        </div>

      </div>

    </section>
  );
}