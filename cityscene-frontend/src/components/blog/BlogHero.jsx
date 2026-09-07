import React, { useState, useEffect } from 'react';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';
import { flashApiFetch } from '../../config/api';

const defaultHeroData = {
  subheading: 'BLOG',
  title: 'Pioneering the\nNext Wave of Technology',
  description: 'Innovative, scalable, and AI-driven solutions for a smarter digital world.',
  bgImage: '',
  bgVideo: '/files/vd14.mp4',
  videoFallback: '/files/vd12.mp4',
  onlineFallback: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4'
};

const isVideoUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const clean = url.split('?')[0].toLowerCase();
  return (
    clean.endsWith('.mp4') ||
    clean.endsWith('.webm') ||
    clean.endsWith('.mov') ||
    clean.endsWith('.avi') ||
    clean.endsWith('.mkv') ||
    clean.includes('.mp4') ||
    clean.includes('/videos/') ||
    clean.includes('/video/') ||
    clean.includes('mixkit.co/videos') ||
    clean.startsWith('data:video/')
  );
};

export default function BlogHero({ videoSrc: propVideoSrc }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    flashApiFetch('/home-content/blog-hero')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.title) {
          setData(resData.content);
        } else {
          setData(defaultHeroData);
        }
      })
      .catch((err) => {
        console.error('Error fetching BlogHero API data:', err);
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
        </div>
      </section>
    );
  }

  const activeData = data || defaultHeroData;

  const rawBgImage = activeData.bgImage || activeData.backgroundImage || defaultHeroData.bgImage;
  let rawBgVideo = propVideoSrc || activeData.bgVideo || activeData.backgroundVideo || defaultHeroData.bgVideo;

  if (!rawBgVideo && isVideoUrl(rawBgImage)) {
    rawBgVideo = rawBgImage;
  }

  const videoSrc = getMediaUrl(rawBgVideo || defaultHeroData.bgVideo);
  const videoFallbackSrc = getMediaUrl(defaultHeroData.videoFallback);
  const posterSrc = isVideoUrl(rawBgImage) ? '' : getMediaUrl(rawBgImage);

  const isVideoMode =
    activeData.backgroundMediaType === 'video' ||
    (activeData.backgroundMediaType !== 'image' && !!rawBgVideo) ||
    (!!rawBgVideo && !activeData.backgroundMediaType) ||
    isVideoUrl(rawBgImage) ||
    isVideoUrl(rawBgVideo);

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

        {(!isVideoMode || !videoSrc) && (
          <img
            src={posterSrc}
            alt="Blog Hero Background"
            className="w-full h-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-black/40 transition-colors duration-700 pointer-events-none" />
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
      </div>
    </section>
  );
}

