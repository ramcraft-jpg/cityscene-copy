import React from 'react';
import { Link } from 'react-router-dom';

export default function TransformationCTAHome() {
  return (
    <section className="w-full bg-white text-gray-900 py-20 md:py-28 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          
          {/* Left Column */}
          <div className="md:col-span-5 text-left space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Transformation <br />
              starts here
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 font-light">
              Reimagine your future.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border-2 border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-colors"
              >
                Connect With Us
              </Link>
            </div>
          </div>

          {/* Vertical Line Divider */}
          <div className="hidden md:block md:col-span-1 flex justify-center">
            <div className="w-[1.5px] h-48 bg-gray-900 opacity-80 mx-auto" />
          </div>

          {/* Right Column */}
          <div className="md:col-span-6 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            <p>
              Be part of an innovative team driving AI, Blockchain, and Smart City solutions. Work on global projects, grow with cutting-edge training, and shape the future of digital transformation.
            </p>

            <ul className="space-y-2 font-medium text-gray-900 pt-2">
              <li className="flex items-center gap-2">
                <span>Exciting global opportunities</span>
              </li>
              <li className="flex items-center gap-2">
                <span>AI & smart tech innovation</span>
              </li>
              <li className="flex items-center gap-2">
                <span>Career growth & learning.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
