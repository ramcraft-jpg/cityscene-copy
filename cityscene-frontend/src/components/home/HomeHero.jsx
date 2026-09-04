import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { flashApiFetch } from '../../config/api';

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
    flashApiFetch('/home-content/hero')
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
    <section className="relative w-full h-screen min-h-[600px] bg-[#0d0d0d] text-white overflow-hidden flex flex-col md:flex-row">
      {/* Left Column: Content */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-start pt-16 md:pt-24 p-8 md:p-16 z-10 bg-[#0d0d0d] text-white">
        <div className="max-w-xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-normal leading-tight tracking-normal">
            {activeSlide.titleLine1} <br />
            <span>{activeSlide.titleLine2}</span>
          </h1>

          <p className="text-base md:text-lg text-gray-200 leading-relaxed font-light">
            {activeSlide.subtitle}
          </p>
        </div>
      </div>

      {/* Action Buttons: Positioned separately at bottom of section on desktop */}
      <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 md:left-[50%] md:-translate-x-1/2 flex items-center gap-3 sm:gap-6 md:gap-16 z-20">
        <Link
          to={heroData.button1Link || '/about'}
          className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full border-2 border-white text-white font-medium text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300 shadow-lg shrink-0"
        >
          {heroData.button1Text || 'About Us'}
        </Link>
        <Link
          to={heroData.button2Link || '/contact'}
          className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-black text-white font-medium text-xs sm:text-sm border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-lg shrink-0"
        >
          {heroData.button2Text || "Let's Talk"}
        </Link>
      </div>

      {/* Right Column: Hero Slideshow/Image */}
      <div className="absolute md:relative inset-0 md:inset-auto w-full md:w-1/2 h-full overflow-hidden bg-black opacity-40 md:opacity-100 z-0 md:z-10">
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
                className="w-full h-full object-cover object-center"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
