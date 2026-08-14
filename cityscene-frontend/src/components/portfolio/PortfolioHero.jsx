import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PortfolioHero({ videoSrc }) {
  return (
    <section className="relative w-full h-[90vh] min-h-[720px] lg:min-h-[850px] bg-black text-white flex items-center overflow-hidden py-20 lg:py-32">
      {/* Background Image / Video Layer */}
      <div className="absolute inset-0 z-0">
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src="/assets/images/portfolio-hero.jpg"
            alt="Portfolio Background"
            className="w-full h-full object-cover object-center"
          />
        )}
        {/* Dark Vignette Overlay matching reference screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          {/* Eyebrow Label matching reference screenshot */}
          <span className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-white block">
            PORTFOLIO
          </span>

          {/* Full-width Horizontal White Line Divider below PORTFOLIO */}
          <div className="w-full max-w-xl sm:max-w-2xl h-[2px] bg-white/90 my-3" />

          {/* Main Heading matching reference screenshot */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
            Focused <br />
            On achieving client <br />
            Goals
          </h1>

          {/* Supporting Text matching reference screenshot */}
          <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-lg mb-8">
            Purpose-driven digital work focused on delivering results that support your business direction.
          </p>

          {/* "Let's Talk ->" Button with circular arrow matching screenshot */}
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 text-white text-base sm:text-lg font-extrabold group hover:opacity-90 transition-opacity"
            >
              <span>Let's Talk</span>
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
