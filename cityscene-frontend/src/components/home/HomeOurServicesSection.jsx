import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { getHomeSectionContent } from '../../services/homeContentService';
import { getServices } from '../../services/serviceService';

const defaultServices = [
  {
    id: 'custom-software-development',
    title: 'Custom Software Development',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'web-development',
    title: 'Web Development',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'blockchain-development',
    title: 'Blockchain Development',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ai-tools-agents',
    title: 'Development of AI Tools & Agents',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ai-scope-feasibility',
    title: 'AI Scope & Feasibility Analysis',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'robotics-automation',
    title: 'Robotics & Automation',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'business-research-ai-innovation',
    title: 'Business Research with AI Innovation',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'software-testing-qa',
    title: 'Software Testing & QA',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    fallback: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  }
];

export default function HomeOurServicesSection() {
  const [sectionData, setSectionData] = useState({
    heading: 'Our Services'
  });
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getServices().catch(() => null),
      getHomeSectionContent('services').catch(() => null)
    ])
      .then(([servicesRes, contentRes]) => {
        if (!isMounted) return;
        if (Array.isArray(servicesRes) && servicesRes.length > 0) {
          setItems(servicesRes);
        } else {
          setItems(defaultServices);
        }
        if (contentRes && contentRes.heading) {
          setSectionData((prev) => ({ ...prev, heading: contentRes.heading }));
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (isTransitioning) {
      setItems((prevItems) => {
        const next = [...prevItems];
        const first = next.shift();
        if (first) next.push(first);
        return next;
      });
      setIsTransitioning(false);
    }
  };

  if (loading || !items) {
    return (
      <section className="w-full bg-[#1a1a1a] text-white py-[50px] sm:py-[60px] px-5 sm:px-[40px] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto w-full">
          <div className="w-48 h-10 bg-white/20 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] sm:h-[440px] bg-white/10 rounded-[20px]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const serviceItems = items && items.length > 0 ? items : defaultServices;

  return (
    <section
      className="w-full bg-[#1a1a1a] text-white py-[50px] sm:py-[60px] px-5 sm:px-[40px] relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="max-w-[1100px] mx-auto w-full">
        {/* Section Heading */}
        <h2 className="text-[28px] sm:text-[40px] font-normal text-white text-left mb-6 sm:mb-8 tracking-tight capitalize">
          {sectionData.heading || 'Our Services'}
        </h2>

        {/* Services Carousel Grid Viewport */}
        <div className="w-full overflow-hidden relative">
          <div
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: isTransitioning
                ? `translateX(calc(-1 * (100% + 20px) / ${cardsPerView}))`
                : 'translateX(0px)',
              transition: isTransitioning
                ? 'transform 500ms ease-in-out'
                : 'none'
            }}
            className="flex gap-[20px] w-full"
          >
            {serviceItems.map((srv, idx) => {
              const isOdd = idx % 2 === 0;

              const fallbackUrl = defaultServices.find((ds) => ds.id === srv.id)?.fallback || defaultServices[5].fallback;
              const rawImg = srv.cardImage || srv.image;
              const imageUrl = rawImg ? getMediaUrl(rawImg) : fallbackUrl;

              return (
                <Link
                  key={`${srv.id}-${idx}`}
                  to={`/services/${srv.id}`}
                  className="w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] h-[400px] sm:h-[440px] shrink-0 rounded-[20px] overflow-hidden relative group block shadow-[0_5px_15px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                >
                  {/* Background Image */}
                  <img
                    src={imageUrl}
                    alt={srv.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackUrl;
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />

                  {/* Dark Overlay matching original rgba(0,0,0,0.5) and hover rgba(0,0,0,0.3) */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300 z-[1]" />

                  {/* Service Card Text: Odd = Top-Left, Even = Bottom-Left */}
                  <div
                    className={`relative z-[2] p-5 w-full h-full flex flex-col ${
                      isOdd ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div className="service-text text-left text-white text-[20px] sm:text-[28px] font-normal leading-[1.1] p-[10px] capitalize">
                      {srv.title}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

