import React from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';

export default function WhatWeDoDetailHero({ service }) {
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  if (!service) return null;

  const videoSrc = getMediaUrl(service.heroVideo || service.backgroundVideo || service.video);
  const imageSrc = getMediaUrl(service.heroImage || service.backgroundImage || service.image);
  const isVideoMode = service.backgroundMediaType === 'video' || (service.backgroundMediaType !== 'image' && !!videoSrc);

  return (
    <section className="w-full bg-white py-12 md:py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Visual Media Container */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-[4/3] bg-slate-900">
              {isVideoMode && videoSrc ? (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  poster={imageSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : null}

              {(!isVideoMode || !videoSrc) && (
                <img
                  src={imageSrc}
                  alt={service.displayTitle}
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              )}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Hero Information */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            <div>
              <span className="text-sm font-bold tracking-widest text-gray-800 uppercase block mb-1">
                SERVICES
              </span>
              <div className="w-12 h-0.5 bg-gray-900 mb-6" />
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {service.displayTitle}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              {service.heroDesc || service.shortDesc}
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
