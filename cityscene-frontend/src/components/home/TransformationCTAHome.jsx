import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function TransformationCTAHome() {
  return (
    <section className="w-full min-h-[80vh] min-h-[80svh] lg:min-h-screen bg-white text-gray-900 py-10 md:py-14 flex flex-col justify-center border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          
          {/* Left Column */}
          <div className="md:col-span-5 text-left space-y-6">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-600 uppercase block">
              Digital Leadership
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
              Transformation <br />
              starts here
            </h2>

            <p className="text-xl sm:text-2xl text-gray-600 font-light">
              Reimagine your future.
            </p>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                Connect With Us
              </Link>
            </div>
          </div>

          {/* Vertical Line Divider */}
          <div className="hidden md:block md:col-span-1 flex justify-center">
            <div className="w-[2px] h-56 bg-gray-900/80 mx-auto" />
          </div>

          {/* Right Column */}
          <div className="md:col-span-6 space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Be part of an innovative team driving AI, Blockchain, and Smart City solutions. Work on global projects, grow with cutting-edge training, and shape the future of digital transformation.
            </p>

            <ul className="space-y-3.5 font-medium text-gray-900 pt-2">
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-orange-500 shrink-0" />
                <span className="text-base sm:text-lg font-semibold text-gray-900">Exciting global opportunities</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-orange-500 shrink-0" />
                <span className="text-base sm:text-lg font-semibold text-gray-900">AI & smart tech innovation</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-orange-500 shrink-0" />
                <span className="text-base sm:text-lg font-semibold text-gray-900">Career growth & learning.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

