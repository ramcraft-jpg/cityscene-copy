import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const isVideoUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const clean = url.split('?')[0].toLowerCase();
  return (
    clean.endsWith('.mp4') ||
    clean.endsWith('.webm') ||
    clean.endsWith('.mov') ||
    clean.endsWith('.avi') ||
    clean.endsWith('.mkv') ||
    clean.includes('mixkit.co/videos') ||
    clean.startsWith('data:video/')
  );
};

const defaultHeroSlides = [
  {
    id: 1,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4',
    image: '/assets/home/hero/hero-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80',
    titleLine1: 'Transforming Visions',
    titleLine2: 'into Digital Realities',
    subtitle: 'We empower your business with cutting-edge IT solutions through seamless digital engagement. From virtual consultations to personalized meetings, we deliver tailored solutions to drive your success.'
  },
  {
    id: 2,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-31620-large.mp4',
    image: '/assets/home/hero/hero-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80',
    titleLine1: 'Empowering Businesses',
    titleLine2: 'With AI & Automation',
    subtitle: 'Streamline operations, improve efficiency, and unlock new growth opportunities with our custom AI and cloud engineering services.'
  },
  {
    id: 3,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-on-a-laptop-keyboard-41555-large.mp4',
    image: '/assets/home/hero/hero-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
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
      .then((data) => {
        if (data.success && data.content && data.content.slides && data.content.slides.length > 0) {
          setHeroData(data.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeHero API data:', err));
  }, []);

  const slides = heroData.slides || defaultHeroSlides;
  const activeSlide = slides[currentSlide] || slides[0] || defaultHeroSlides[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] min-h-[calc(100svh-64px)] bg-black text-white overflow-hidden flex items-center py-12 lg:py-0">
      {/* Slides Background */}
      {slides.map((slide, idx) => {
        const videoSrc = slide.video || slide.videoSrc || (isVideoUrl(slide.image) ? slide.image : null);
        const isVid = slide.backgroundMediaType === 'video' || (slide.backgroundMediaType !== 'image' && (!!videoSrc || isVideoUrl(slide.image)));

        return (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {isVid && videoSrc ? (
              <video
                src={videoSrc}
                poster={slide.image || slide.fallback}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[7000ms] ease-out"
                onError={(e) => {
                  // Fallback to image if video fails to play/load
                  e.target.style.display = 'none';
                }}
              />
            ) : null}

            {(!isVid || !videoSrc) && (
              <img
                src={slide.image}
                alt={slide.titleLine1 || 'Hero slide'}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = slide.fallback || defaultHeroSlides[0].fallback;
                }}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[7000ms] ease-out"
              />
            )}
          </div>
        );
      })}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left space-y-6 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            {activeSlide.titleLine1} <br />
            <span className="text-orange-500">{activeSlide.titleLine2}</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed font-normal">
            {activeSlide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to={heroData.button1Link || '/about'}
              className="px-7 py-3.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md text-sm sm:text-base"
            >
              {heroData.button1Text || 'About Us'}
            </Link>
            <Link
              to={heroData.button2Link || '/contact'}
              className="px-7 py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm sm:text-base"
            >
              {heroData.button2Text || "Let's Talk"}
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
        {slides.map((_, idx) => (
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
