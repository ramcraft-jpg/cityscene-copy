import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';
import { flashApiFetch } from '../../config/api';

const defaultHeroData = {
  subheading: 'PORTFOLIO',
  title: 'Focused\nOn achieving client\nGoals',
  description: 'Purpose-driven digital work focused on delivering results that support your business direction.',
  buttonText: "Let's Talk",
  buttonLink: '/contact',
  bgImage: '',
  bgVideo: '/files/vd11.mp4',
  videoFallback: '/files/vd12.mp4',
  onlineFallback: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4'
};

export default function PortfolioHero({ videoSrc: propVideoSrc }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    flashApiFetch('/home-content/portfolio-hero')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.title) {
          setData(resData.content);
        } else {
          setData(defaultHeroData);
        }
      })
      .catch((err) => {
        console.error('Error fetching PortfolioHero API data:', err);
        setData(defaultHeroData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="relative w-full min-h-[500px] py-16 md:py-0 md:h-screen md:min-h-[650px] overflow-hidden flex items-center text-white text-left bg-[#0d0d0d]">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 text-left text-white w-full animate-pulse">
          <div className="w-32 h-4 bg-white/20 rounded mb-6" />
          <div className="w-3/4 max-w-2xl h-12 sm:h-16 bg-white/20 rounded mb-6" />
          <div className="w-full max-w-xl h-20 bg-white/20 rounded mb-8" />
          <div className="w-36 h-10 bg-white/20 rounded-full" />
        </div>
      </section>
    );
  }

  const activeData = data || defaultHeroData;

  const rawBgImage = activeData.bgImage || activeData.backgroundImage || '';
  const rawBgVideo = propVideoSrc || activeData.bgVideo || activeData.backgroundVideo || defaultHeroData.bgVideo;

  const videoSrc = getMediaUrl(rawBgVideo || defaultHeroData.bgVideo);
  const videoFallbackSrc = getMediaUrl(defaultHeroData.videoFallback);
  const posterSrc = rawBgImage ? getMediaUrl(rawBgImage) : '';
  const isVideoMode = activeData.backgroundMediaType === 'video' || (activeData.backgroundMediaType !== 'image' && !!rawBgVideo) || (!!rawBgVideo && !activeData.backgroundMediaType);

  return (
    <section className="relative w-full min-h-[500px] py-16 md:py-0 md:h-screen md:min-h-[650px] overflow-hidden flex items-center justify-center text-white text-left [clip-path:inset(0)]">
      {/* Background Image / Video Layer with Fixed Viewport Scroll-Over Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {isVideoMode && videoSrc ? (
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            poster={posterSrc || undefined}
            onError={(e) => {
              if (e.target.src !== videoFallbackSrc) {
                e.target.src = videoFallbackSrc;
              }
            }}
            className="w-full h-full object-cover object-center"
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={videoFallbackSrc} type="video/mp4" />
            <source src={defaultHeroData.onlineFallback} type="video/mp4" />
          </video>
        ) : null}

        {(!isVideoMode || !videoSrc) && posterSrc ? (
          <img
            src={posterSrc}
            alt="Portfolio Background"
            className="w-full h-full object-cover object-center"
          />
        ) : null}
        <div className="absolute inset-0 bg-black/55 transition-colors duration-700 pointer-events-none" />
      </div>

      {/* Hero Content Overlay Scrolling Over Fixed Video */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 text-left text-white w-full">
        {/* Small Text Label with Horizontal Line */}
        <div className="relative text-xs sm:text-sm font-semibold uppercase tracking-[2px] text-white pb-3 mb-6">
          <span>{activeData.subheading || defaultHeroData.subheading}</span>
          <div className="absolute left-0 bottom-0 w-[80vw] max-w-[800px] h-[1.5px] bg-white/80" />
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.2] text-white max-w-3xl mb-6 whitespace-pre-line">
          {activeData.title || defaultHeroData.title}
        </h1>

        {/* Supporting Paragraph */}
        <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-light max-w-2xl mb-8">
          {activeData.description || defaultHeroData.description}
        </p>

        {/* CTA Button with Arrow Icon */}
        <Link
          to={activeData.buttonLink || '/contact'}
          className="inline-flex items-center gap-3 text-lg font-medium text-white hover:opacity-90 transition-opacity group"
        >
          <span>{activeData.buttonText || "Let's Talk"}</span>
          <div className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center font-bold text-base group-hover:translate-x-1 transition-transform shadow">
            ➜
          </div>
        </Link>
      </div>
    </section>
  );
}

