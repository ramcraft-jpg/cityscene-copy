import React from 'react';
import { Link } from 'react-router-dom';

export default function CommitmentSection() {
  return (
    <section className="relative w-full min-h-[85vh] h-[750px] sm:h-[850px] lg:h-[950px] bg-black text-white flex items-center overflow-hidden border-b border-white/10">
      {/* Background Video / Media with Fallback */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/videos/commitment.mp4" type="video/mp4" />
        <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 z-10 pointer-events-none" />

      {/* Hero-Spaced Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left space-y-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Our Commitment
          </h2>
          <p className="text-lg sm:text-2xl text-gray-200 leading-relaxed font-light">
            Your success is our priority! We go beyond just providing IT solutions – we build partnerships that drive real growth.
          </p>
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
