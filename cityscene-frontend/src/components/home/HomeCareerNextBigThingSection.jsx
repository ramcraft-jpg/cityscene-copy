import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeCareerNextBigThingSection() {
  const bgSrc = '/assets/home/career/career-bg.jpg';
  const fallbackSrc = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80';

  return (
    <section className="relative w-full min-h-[85vh] min-h-[85svh] lg:min-h-screen bg-black text-white py-10 md:py-14 flex flex-col justify-center items-center overflow-hidden border-t border-white/10">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgSrc}
          alt="Career - Next Big Thing"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackSrc;
          }}
          className="w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs sm:text-sm font-bold tracking-[0.3em] text-orange-500 uppercase block">
          ARE YOU READY ?
        </span>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
          Be A Part Of The <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-orange-400">
            Next Big Thing
          </span>
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
          Join our global network of innovators shaping AI, smart software, and digital infrastructure.
        </p>

        <div className="pt-6">
          <Link
            to="/career"
            className="inline-flex items-center justify-center px-9 py-4 bg-white text-gray-900 font-bold text-xs sm:text-sm rounded-full tracking-widest hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-2xl uppercase"
          >
            VIEW OUR MORE
          </Link>
        </div>
      </div>
    </section>
  );
}
