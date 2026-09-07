import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { flashApiFetch } from '../../config/api';

const defaultHeroSlides = [
  {
    id: 1,
    image: '/files/img4.jpg',
    fallback: '/files/img4.jpg',
    titleLine1: 'Transforming Visions',
    titleLine2: 'into Digital Realities',
    subtitle: 'We empower your business with cutting-edge IT solutions through seamless digital engagement. From virtual consultations to personalized meetings, we deliver tailored solutions to drive your success.'
  },
  {
    id: 2,
    image: '/files/pd2.jpeg',
    fallback: '/files/pd2.jpeg',
    titleLine1: 'Empowering Businesses',
    titleLine2: 'With AI & Automation',
    subtitle: 'Streamline operations, improve efficiency, and unlock new growth opportunities with our custom AI and cloud engineering services.'
  },
  {
    id: 3,
    image: '/files/pd3.webp',
    fallback: '/files/pd3.webp',
    titleLine1: 'Next-Gen Infrastructure',
    titleLine2: '& Smart City Solutions',
    subtitle: 'Building sustainable, secure, and scalable digital ecosystems tailored for modern enterprises and forward-thinking communities.'
  }
];

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    flashApiFetch('/home-content/hero')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && Array.isArray(resData.content.slides) && resData.content.slides.length > 0) {
          setHeroData(resData.content);
        } else {
          setHeroData({
            slides: defaultHeroSlides,
            button1Text: 'About Us',
            button1Link: '/about',
            button2Text: "Let's Talk",
            button2Link: '/contact'
          });
        }
      })
      .catch((err) => {
        console.error('Error fetching HomeHero API data:', err);
        setHeroData({
          slides: defaultHeroSlides,
          button1Text: 'About Us',
          button1Link: '/about',
          button2Text: "Let's Talk",
          button2Link: '/contact'
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const activeHero = heroData || {
    slides: defaultHeroSlides,
    button1Text: 'About Us',
    button1Link: '/about',
    button2Text: "Let's Talk",
    button2Link: '/contact'
  };

  const slides = activeHero.slides && activeHero.slides.length > 0 ? activeHero.slides : defaultHeroSlides;
  const activeSlide = slides[currentSlide] || slides[0] || {};

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) {
    return (
      <section className="relative w-full min-h-[550px] md:h-screen md:min-h-[650px] bg-[#0d0d0d] text-white overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col justify-between pt-16 md:pt-24 px-6 sm:px-10 md:p-16 z-10 bg-[#0d0d0d]">
          <div className="max-w-xl space-y-6 my-auto md:my-0 animate-pulse">
            <div className="w-3/4 h-10 sm:h-12 bg-white/20 rounded" />
            <div className="w-1/2 h-10 sm:h-12 bg-white/20 rounded" />
            <div className="w-full h-24 bg-white/20 rounded mt-4" />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full bg-[#141414] animate-pulse" />
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-[550px] md:h-screen md:min-h-[650px] bg-[#0d0d0d] text-white overflow-hidden flex flex-col md:flex-row">
      {/* Left Column: Content */}
      <div className="w-full md:w-1/2 min-h-[550px] md:h-full flex flex-col justify-between md:justify-start pt-16 md:pt-24 px-6 sm:px-10 md:p-16 z-10 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-[#0d0d0d]/40 md:bg-[#0d0d0d] text-white pb-20 md:pb-16">
        <div className="max-w-xl space-y-4 my-auto md:my-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight tracking-normal">
            {activeSlide.titleLine1} <br />
            <span>{activeSlide.titleLine2}</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-light">
            {activeSlide.subtitle}
          </p>
        </div>

        {/* Action Buttons for Mobile */}
        <div className="flex md:hidden items-center gap-3 sm:gap-4 pt-6 z-20">
          <Link
            to={activeHero.button1Link || '/about'}
            className="px-5 py-2.5 rounded-full border-2 border-white text-white font-medium text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300 shadow-lg shrink-0"
          >
            {activeHero.button1Text || 'About Us'}
          </Link>
          <Link
            to={activeHero.button2Link || '/contact'}
            className="px-5 py-2.5 rounded-full bg-black text-white font-medium text-xs sm:text-sm border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-lg shrink-0"
          >
            {activeHero.button2Text || "Let's Talk"}
          </Link>
        </div>
      </div>

      {/* Action Buttons: Desktop centered overlay */}
      <div className="hidden md:flex absolute bottom-8 left-[50%] -translate-x-1/2 items-center gap-12 z-20">
        <Link
          to={activeHero.button1Link || '/about'}
          className="px-7 py-3 rounded-full border-2 border-white text-white font-medium text-sm hover:bg-white hover:text-black transition-all duration-300 shadow-lg shrink-0"
        >
          {activeHero.button1Text || 'About Us'}
        </Link>
        <Link
          to={activeHero.button2Link || '/contact'}
          className="px-7 py-3 rounded-full bg-black text-white font-medium text-sm border border-white/20 hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-lg shrink-0"
        >
          {activeHero.button2Text || "Let's Talk"}
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
