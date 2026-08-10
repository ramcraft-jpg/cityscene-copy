import React from 'react';
import { Link } from 'react-router-dom';

export default function CareerNextBigThingSection() {
  return (
    <section className="w-full bg-black text-white py-20 md:py-28 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gray-300 uppercase block">
          ARE YOU READY ?
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Be A Part Of The <br />
          Next Big Thing
        </h2>

        <div className="pt-4">
          <Link
            to="/career"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-900 font-bold text-xs sm:text-sm rounded-full tracking-wider hover:bg-gray-100 transition-colors uppercase"
          >
            VIEW OUR MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
