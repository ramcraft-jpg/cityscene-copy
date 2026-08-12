import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUsHomeSection() {
  const imageSrc = '/assets/home/about/about-1.jpg';
  const fallbackSrc = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80';

  return (
    <section className="w-full min-h-screen min-h-[100svh] bg-[#222222] text-white py-10 md:py-14 flex flex-col justify-center overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Image Panel */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-md lg:max-w-none h-[340px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900 relative group">
              <img
                src={imageSrc}
                alt="About CityScene Global"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackSrc;
                }}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Heading & Content with Left Accent Line */}
          <div className="lg:col-span-7 border-l-2 border-white pl-6 sm:pl-8 space-y-6 flex flex-col items-start">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-500 uppercase">
              Who We Are
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight">
              About Us
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              <p>
                At CityScene Global Private Limited, we are committed to transforming urban landscapes with cutting-edge technology and sustainable solutions. In an era where businesses face challenges such as outdated infrastructure, slow system performance, and complex IT management, we provide future-ready solutions that drive efficiency, security, and innovation.
              </p>
              <p>
                We specialize in Automation, Artificial Intelligence (AI), Blockchain, Smart City Solutions, and Digital Infrastructure, enabling businesses and governments to navigate the fast-paced digital world seamlessly. Our expertise ensures the integration of intelligent, scalable, and efficient systems tailored to your needs.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white hover:text-gray-900 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

