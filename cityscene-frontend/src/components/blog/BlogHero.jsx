import React from 'react';

export default function BlogHero({ videoSrc }) {
  return (
    <section className="relative w-full min-h-[720px] lg:min-h-[850px] h-[88vh] bg-black text-white flex items-center overflow-hidden py-20 md:py-32">
      {/* Background Image / Video Layer matching user screenshot */}
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
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
            alt="Person using stylus on digital tablet with charts"
            className="w-full h-full object-cover object-center"
          />
        )}
        {/* Dark Translucent Vignette Overlay matching screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          {/* Eyebrow Label matching screenshot */}
          <span className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-white block">
            BLOG
          </span>

          {/* Full-width Horizontal White Line Divider below BLOG */}
          <div className="w-full max-w-xl sm:max-w-2xl h-[2px] bg-white/90 my-3" />

          {/* Main Heading matching screenshot */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
            Pioneering the <br />
            Next Wave of <br />
            Technology
          </h1>

          {/* Supporting Text matching screenshot */}
          <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-lg">
            Innovative, scalable, and AI-driven solutions for a smarter digital world.
          </p>
        </div>
      </div>
    </section>
  );
}
