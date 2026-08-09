import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function TransformationCTA() {
  return (
    <section className="w-full bg-[#171717] text-white py-20 md:py-28 relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle, Connect Button */}
          <div className="md:col-span-6 text-left space-y-6">
            <h2 className="text-4xl sm:text-5xl font-normal text-white tracking-tight leading-tight">
              Transformation <br />
              starts here
            </h2>
            <p className="text-xl sm:text-2xl text-gray-300 font-light">
              Reimagine your future.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-white text-white font-medium text-sm sm:text-base hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                Connect with us
              </Link>
            </div>
          </div>

          {/* Vertical Divider Line (Desktop) */}
          <div className="hidden md:flex md:col-span-1 justify-center">
            <div className="w-[1px] h-64 bg-white/40" />
          </div>

          {/* Right Column: Find Out More Links */}
          <div className="md:col-span-5 text-left space-y-4 md:pl-4">
            <h3 className="text-white text-base sm:text-lg font-normal mb-4">
              Find out more
            </h3>

            {/* What We Do Button */}
            <Link
              to="/services"
              className="w-full max-w-xs flex items-center justify-between px-6 py-2.5 rounded-full border border-white text-white text-sm sm:text-base font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300 group"
            >
              <span>What we do</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Home Button */}
            <Link
              to="/services"
              className="w-full max-w-xs flex items-center justify-between px-6 py-2.5 rounded-full border border-white text-white text-sm sm:text-base font-medium hover:bg-white hover:text-gray-900 transition-colors duration-300 group"
            >
              <span>Home</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
