import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMediaUrl } from '../../utils/imageUrl';
import ScrollReveal from '../shared/ScrollReveal';

const defaultServices = [
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    textPosition: 'bottom',
    image: '/assets/home/services/service-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    textPosition: 'top',
    image: '/assets/home/services/service-2.jpg',
    fallback: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'web-development',
    title: 'Web Development',
    textPosition: 'bottom',
    image: '/assets/home/services/service-3.jpg',
    fallback: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    textPosition: 'top',
    image: '/assets/home/services/service-4.jpg',
    fallback: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blockchain-development',
    title: 'Blockchain Development',
    textPosition: 'bottom',
    image: '/assets/home/services/service-5.jpg',
    fallback: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    textPosition: 'top',
    image: '/assets/home/services/service-6.jpg',
    fallback: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ai-tools-agents',
    title: 'Development of AI Tools & Agents',
    textPosition: 'bottom',
    image: '/assets/home/services/service-7.jpg',
    fallback: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ai-scope-feasibility',
    title: 'AI Scope & Feasibility Analysis',
    textPosition: 'top',
    image: '/assets/home/services/service-8.jpg',
    fallback: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'robotics-automation',
    title: 'Robotics & Automation',
    textPosition: 'bottom',
    image: '/assets/home/services/service-9.jpg',
    fallback: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'business-research-ai-innovation',
    title: 'Business Research with AI Innovation',
    textPosition: 'top',
    image: '/assets/home/services/service-10.jpg',
    fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'software-testing-qa',
    title: 'Software Testing & QA',
    textPosition: 'bottom',
    image: '/assets/home/services/service-11.jpg',
    fallback: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    textPosition: 'top',
    image: '/assets/home/services/service-12.jpg',
    fallback: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  }
];

export default function HomeOurServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [sectionData, setSectionData] = useState({
    badge: 'What We Deliver',
    heading: 'Our Services',
    services: defaultServices
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content && data.content.services && data.content.services.length > 0) {
          setSectionData(data.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeServices API data:', err));
  }, []);

  const allServices = sectionData.services || defaultServices;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, allServices.length - cardsPerView);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section className="w-full min-h-screen min-h-[100svh] bg-[#181818] text-white py-10 md:py-14 flex flex-col justify-center overflow-hidden relative">
      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 sm:mb-12 flex items-center justify-between">
        <ScrollReveal animation="up" delay={100}>
          <div>
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-500 uppercase block mb-1">
              {sectionData.badge || 'What We Deliver'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight">
              {sectionData.heading || 'Our Services'}
            </h2>
          </div>
        </ScrollReveal>

        {/* Navigation Buttons & Counter */}
        <ScrollReveal animation="fade" delay={200} className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-400 font-mono hidden sm:inline-block">
            {String(currentIndex + 1).padStart(2, '0')} / {String(allServices.length).padStart(2, '0')}
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              aria-label="Previous service"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next service"
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* 3-Card Display Viewport Container */}
      <ScrollReveal animation="scale" delay={300} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden" style={{ clipPath: 'inset(0 0 0 0)' }}>
        <div
          style={{
            transform: `translateX(calc(-${currentIndex} * (100% + 24px) / ${cardsPerView}))`,
            transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="flex gap-6 w-full"
        >
          {allServices.map((srv, idx) => {
            const isVisible = idx >= currentIndex && idx < currentIndex + cardsPerView;

            return (
              <Link
                key={`${srv.id}-${idx}`}
                to={`/services/${srv.id}`}
                tabIndex={isVisible ? 0 : -1}
                className={`w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] h-[400px] sm:h-[460px] lg:h-[480px] shrink-0 rounded-2xl overflow-hidden relative group border border-white/10 shadow-2xl block transition-all duration-500 hover:border-orange-500/50 ${
                  isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Background Image */}
                <img
                  src={getMediaUrl(srv.image)}
                  alt={srv.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = srv.fallback || defaultServices[0].fallback;
                  }}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/85 group-hover:from-black/90 group-hover:to-black/90 transition-all duration-300" />

                {/* Text Overlay */}
                <div
                  className={`absolute left-7 right-7 z-10 ${
                    srv.textPosition === 'top' ? 'top-8' : 'bottom-8'
                  }`}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug group-hover:text-orange-400 transition-colors">
                    {srv.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Pagination Bar */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {allServices.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-orange-500' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
