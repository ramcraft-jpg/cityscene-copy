import React from 'react';
import { Link } from 'react-router-dom';

export default function SocialImpactSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Text */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-sm font-medium text-gray-600 block mb-1">
                Social Impact
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight">
                By CityScene Global
              </h2>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              At CityScene Global, we are committed to leveraging technology to create a sustainable and inclusive future. Our initiatives focus on smart urban solutions, AI-driven job creation, and environmental sustainability.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We drive innovation by enhancing cybersecurity, advancing AI-driven education, and strengthening digital infrastructure. Through automation, blockchain, and AI, we create efficient, secure, and sustainable solutions that benefit businesses and communities alike.
            </p>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-colors"
              >
                View All Impact
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50 max-w-lg w-full">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                alt="Social Impact By CityScene Global"
                className="w-full h-auto max-h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
