import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function WhatWeDoHero() {
  return (
    <section className="relative w-full min-h-[720px] lg:min-h-[850px] h-[88vh] bg-gradient-to-r from-[#023136] via-[#044c53] to-[#016870] overflow-hidden flex items-center">
      {/* Background Image / Video Simulation Overlay with Cyan Teal Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1920&q=80"
          alt="Developer Workstation"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
        />
        {/* Ambient Teal Gradient Lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032a2f]/95 via-[#033a41]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#022125] via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
        <div className="max-w-2xl text-left">
          {/* Subheading */}
          <div className="text-white font-semibold text-sm sm:text-base tracking-widest uppercase mb-3">
            WHAT WE DO
          </div>

          {/* Thin Horizontal Line Divider spanning across hero width */}
          <div className="w-full max-w-4xl lg:max-w-5xl h-[1px] bg-white/40 mb-8" />

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-[1.12] tracking-tight mb-6">
            Professional <br />
            Services Tailored for <br />
            You
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-white/90 font-light mb-10 max-w-lg">
            Helping businesses innovate and grow in the digital age.
          </p>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 group text-white font-medium text-lg hover:text-white/90 transition-all duration-200"
          >
            <span>Let's Talk</span>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 group-hover:bg-gray-100 group-hover:scale-105 transition-all shadow-lg">
              <ArrowRight size={20} className="stroke-[2.5]" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
