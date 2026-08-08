import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function OurPeopleSection() {
  return (
    <section className="w-full bg-[#171717] text-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="max-w-2xl text-left border-l border-white/60 pl-8 sm:pl-10 py-2 space-y-6">
          {/* Section Label */}
          <div className="text-gray-300 font-normal text-sm sm:text-base tracking-wide">
            Our People
          </div>

          {/* Main Statement with exact line breaks matching reference Image 2 */}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-white leading-[1.35] tracking-tight">
            How do you drive meaningful <br className="hidden sm:inline" />
            change? By recruiting, appreciating, <br className="hidden sm:inline" />
            and supporting top talent from <br className="hidden sm:inline" />
            diverse backgrounds.
          </h2>

          {/* Let's Talk CTA Button */}
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 group text-white font-medium text-base sm:text-lg hover:text-white/90 transition-all duration-200"
            >
              <span>Let's Talk</span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-gray-900 group-hover:bg-gray-100 group-hover:scale-105 transition-all shadow-md">
                <ArrowRight size={18} className="stroke-[2.5]" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
