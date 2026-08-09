import React from 'react';

export default function ContactIntro() {
  return (
    <section className="w-full bg-[#0a0a0a] text-white py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left & Right Text Layout matching Screenshot 2 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 lg:gap-16 mb-16">
          {/* Left Main Heading */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-snug">
              How can we <br />
              assist you today?
            </h2>
          </div>

          {/* Vertical Divider Line */}
          <div className="hidden md:block w-[2px] h-24 bg-white/80 flex-shrink-0" />

          {/* Right Supporting Text */}
          <div className="flex-1 max-w-xl">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              We're here to assist you! Let us know your requirements, and we'll connect you with the right IT experts to deliver the best solutions.
            </p>
          </div>
        </div>

        {/* Horizontal Line with Centered "REACH US OUT" Badge matching Screenshot 2 */}
        <div className="relative flex items-center justify-center pt-8">
          <div className="w-full h-[1px] bg-white/20 absolute inset-0 top-1/2 -translate-y-1/2" />
          <span className="relative z-10 bg-[#0a0a0a] px-6 text-xs sm:text-sm font-bold tracking-widest text-white uppercase">
            REACH US OUT
          </span>
        </div>
      </div>
    </section>
  );
}
