import React from 'react';

export default function InnovationSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Empowering Businesses <br className="hidden sm:inline" />
              with Innovation
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              At CityScene Global, we help businesses thrive through cutting-edge solutions. Our services empower companies to achieve sustainable growth, enhance customer experiences, and stay ahead in the digital era.
            </p>
          </div>

          {/* Right Column: High Angle Blueprint Team Collaboration Image (Matching reference screenshot 1) */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-md border border-gray-100 max-w-lg w-full">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80"
                alt="High angle aerial view of team collaborating over blueprints and laptops"
                className="w-full h-auto max-h-[380px] object-cover object-center transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
