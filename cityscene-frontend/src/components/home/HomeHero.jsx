import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    id: 1,
    image: '/assets/home/hero/hero-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80',
    titleLine1: 'Transforming Visions',
    titleLine2: 'into Digital Realities',
    subtitle: 'We empower your business with cutting-edge IT solutions through seamless digital engagement. From virtual consultations to personalized meetings, we deliver tailored solutions to drive your success.'
  },
  {
    id: 2,
    image: '/assets/home/hero/hero-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80',
    titleLine1: 'Empowering Businesses',
    titleLine2: 'With AI & Automation',
    subtitle: 'Streamline operations, improve efficiency, and unlock new growth opportunities with our custom AI and cloud engineering services.'
  },
  {
    id: 3,
    image: '/assets/home/hero/hero-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
    titleLine1: 'Next-Gen Infrastructure',
    titleLine2: '& Smart City Solutions',
    subtitle: 'Building sustainable, secure, and scalable digital ecosystems tailored for modern enterprises and forward-thinking communities.'
  }
];

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] min-h-[calc(100svh-64px)] bg-black text-white overflow-hidden flex items-center py-12 lg:py-0">
      {/* Slides Background */}
      {heroSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.titleLine1}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = slide.fallback;
            }}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[7000ms] ease-out"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/40" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left space-y-6 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            {heroSlides[currentSlide].titleLine1} <br />
            <span className="text-orange-500">{heroSlides[currentSlide].titleLine2}</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed font-normal">
            {heroSlides[currentSlide].subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to="/about"
              className="px-7 py-3.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md text-sm sm:text-base"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm sm:text-base"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'w-8 bg-orange-500' : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

