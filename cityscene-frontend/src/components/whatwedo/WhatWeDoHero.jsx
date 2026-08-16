import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const defaultHeroData = {
  subheading: 'WHAT WE DO',
  title: 'Professional Services Tailored for You',
  description: 'Helping businesses innovate and grow in the digital age.',
  buttonText: "Let's Talk",
  buttonLink: '/contact',
  bgImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1920&q=80',
  bgVideo: ''
};

export default function WhatWeDoHero() {
  const [data, setData] = useState(defaultHeroData);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/whatwedo-hero')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.title) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching WhatWeDoHero API data:', err));
  }, []);

  const bgImage = data.bgImage || defaultHeroData.bgImage;

  return (
    <section className="relative w-full min-h-[720px] lg:min-h-[850px] h-[88vh] bg-gradient-to-r from-[#023136] via-[#044c53] to-[#016870] overflow-hidden flex items-center">
      {/* Background Image / Video Overlay */}
      <div className="absolute inset-0 z-0">
        {data.bgVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={bgImage}
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          >
            <source src={data.bgVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={bgImage}
            alt="Developer Workstation"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />
        )}
        {/* Ambient Teal Gradient Lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#032a2f]/95 via-[#033a41]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#022125] via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
        <div className="max-w-2xl text-left">
          {/* Subheading */}
          <div className="text-white font-semibold text-sm sm:text-base tracking-widest uppercase mb-3">
            {data.subheading || defaultHeroData.subheading}
          </div>

          {/* Thin Horizontal Line Divider spanning across hero width */}
          <div className="w-full max-w-4xl lg:max-w-5xl h-[1px] bg-white/40 mb-8" />

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-[1.12] tracking-tight mb-6 whitespace-pre-line">
            {data.title || defaultHeroData.title}
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-white/90 font-light mb-10 max-w-lg">
            {data.description || defaultHeroData.description}
          </p>

          {/* CTA Button */}
          <Link
            to={data.buttonLink || '/contact'}
            className="inline-flex items-center gap-3 group text-white font-medium text-lg hover:text-white/90 transition-all duration-200"
          >
            <span>{data.buttonText || "Let's Talk"}</span>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 group-hover:bg-gray-100 group-hover:scale-105 transition-all shadow-lg">
              <ArrowRight size={20} className="stroke-[2.5]" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
