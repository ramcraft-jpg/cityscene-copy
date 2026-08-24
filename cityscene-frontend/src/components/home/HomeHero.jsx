import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';

const defaultHeroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    titleLine1: 'Transforming Visions',
    titleLine2: 'into Digital Realities',
    subtitle: 'We empower your business with cutting-edge IT solutions through seamless digital engagement. From virtual consultations to personalized meetings, we deliver tailored solutions to drive your success.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    titleLine1: 'Empowering Businesses',
    titleLine2: 'With AI & Automation',
    subtitle: 'Streamline operations, improve efficiency, and unlock new growth opportunities with our custom AI and cloud engineering services.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    fallback: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    titleLine1: 'Next-Gen Infrastructure',
    titleLine2: '& Smart City Solutions',
    subtitle: 'Building sustainable, secure, and scalable digital ecosystems tailored for modern enterprises and forward-thinking communities.'
  }
];

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroData, setHeroData] = useState({
    slides: defaultHeroSlides,
    button1Text: 'About Us',
    button1Link: '/about',
    button2Text: "Let's Talk",
    button2Link: '/contact'
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/hero')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && Array.isArray(resData.content.slides)) {
          setHeroData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeHero API data:', err));
  }, []);

  const slides = heroData.slides && heroData.slides.length > 0 ? heroData.slides : defaultHeroSlides;
  const activeSlide = slides[currentSlide] || slides[0] || {};

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full min-h-[500px] lg:h-[calc(100vh-64px)] lg:min-h-[550px] bg-[#0a0a0a] text-white overflow-hidden grid grid-cols-1 lg:grid-cols-2">
      
      {/* Left Column: Content (Solid Dark Background matching 2nd reference image) */}
      <div className="p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center relative z-20 bg-[#0a0a0a] order-2 lg:order-1">
        <div className="max-w-xl space-y-6">
          {/* Main Title - All White Text */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2]">
            {activeSlide.titleLine1} <br />
            <span className="text-white">{activeSlide.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed font-light">
            {activeSlide.subtitle}
          </p>

          {/* Action Buttons matching reference image */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to={heroData.button1Link || '/about'}
              className="px-7 py-3 rounded-full border-2 border-white text-white font-bold text-xs sm:text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-md"
            >
              {heroData.button1Text || 'About Us'}
            </Link>
            <Link
              to={heroData.button2Link || '/contact'}
              className="px-7 py-3 rounded-full bg-black text-white font-bold text-xs sm:text-sm tracking-wider hover:bg-gray-900 border border-white/20 transition-all duration-300 shadow-md"
            >
              {heroData.button2Text || "Let's Talk"}
            </Link>
          </div>
        </div>

        {/* Slide Indicator Dots */}
        <div className="pt-10 flex items-center space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-white' : 'w-3 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Column: Hero Image (Fills Right 50% Half matching 2nd reference image) */}
      <div className="relative w-full h-[350px] sm:h-[450px] lg:h-full overflow-hidden bg-slate-900 order-1 lg:order-2">
        {slides.map((slide, idx) => {
          const slideImg = getMediaUrl(slide.image || slide.fallback) || defaultHeroSlides[idx % 3].image;

          return (
            <div
              key={slide.id || idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slideImg}
                alt={slide.titleLine1 || 'Hero slide'}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultHeroSlides[idx % 3].image;
                }}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[7000ms] ease-out"
              />
            </div>
          );
        })}
      </div>

    </section>
  );
}
