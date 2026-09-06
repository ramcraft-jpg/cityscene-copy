import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CareerJobGrid from './CareerJobGrid';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';
import { flashApiFetch } from '../../config/api';

const defaultHeroData = {
  title: 'Join Our Team',
  description: 'Find exciting career opportunities with us.',
  buttonText: 'Explore Jobs',
  buttonLink: '#jobs',
  bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
  bgVideo: '/files/vd10.mp4',
  videoFallback: '/files/vd12.mp4',
  onlineFallback: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4'
};

export default function CareerHero() {
  const [data, setData] = useState(defaultHeroData);
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    flashApiFetch('/home-content/career-hero')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content) {
          setData({
            ...defaultHeroData,
            ...resData.content
          });
        }
      })
      .catch((err) => console.error('Error fetching CareerHero API data:', err));
  }, []);

  const rawBgImage = data.bgImage || data.backgroundImage || defaultHeroData.bgImage;
  const rawBgVideo = data.bgVideo || data.backgroundVideo || defaultHeroData.bgVideo;

  const videoSrc = getMediaUrl(rawBgVideo || defaultHeroData.bgVideo);
  const videoFallbackSrc = getMediaUrl(defaultHeroData.videoFallback);
  const posterSrc = getMediaUrl(rawBgImage);
  const isVideoMode = data.backgroundMediaType === 'video' || (data.backgroundMediaType !== 'image' && !!rawBgVideo) || (!!rawBgVideo && !data.backgroundMediaType);

  const getEmbedVideoUrl = (url) => {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (trimmed.includes('youtube.com/watch')) {
      try {
        const urlObj = new URL(trimmed);
        const videoId = urlObj.searchParams.get('v');
        if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0`;
      } catch (e) {}
    }
    if (trimmed.includes('youtu.be/')) {
      const videoId = trimmed.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0`;
    }
    if (trimmed.includes('vimeo.com/')) {
      const videoId = trimmed.split('vimeo.com/')[1]?.split('?')[0];
      if (videoId) return `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0`;
    }
    return trimmed;
  };

  const embedVideoSrc = getEmbedVideoUrl(videoSrc);
  const isYoutubeOrVimeo = embedVideoSrc.includes('youtube.com') || embedVideoSrc.includes('vimeo.com');

  const buttonLink = data.buttonLink || '#jobs';
  const isExternalOrAnchor = buttonLink.startsWith('#') || buttonLink.startsWith('http');

  const handleScrollToTarget = (e) => {
    if (buttonLink.startsWith('#')) {
      e.preventDefault();
      const targetId = buttonLink.replace('#', '');
      const targetEl = document.getElementById(targetId) || document.getElementById('jobs-section') || document.getElementById('jobs');
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-between [clip-path:inset(0)]">
      {/* Background Image / Video Layer with Fixed Viewport Scroll-Over Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {isVideoMode && videoSrc ? (
          isYoutubeOrVimeo ? (
            <iframe
              src={embedVideoSrc}
              title="Career Hero Video"
              className="w-full h-full object-cover pointer-events-none"
              allow="autoplay; fullscreen"
            />
          ) : (
            <video
              ref={videoRef}
              key={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              poster={posterSrc}
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
          )
        ) : null}

        {(!isVideoMode || !videoSrc) && (
          <img
            src={posterSrc}
            alt="Career Hero Background"
            className="w-full h-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-black/40 transition-colors duration-700 pointer-events-none" />
      </div>

      {/* Relative Page Content Container overlaying the background */}
      <div className="relative z-10 w-full flex flex-col justify-between pt-20 sm:pt-28 pb-0">
        {/* 1. Hero Content Box */}
        <section className="max-w-lg mx-auto px-4 w-full py-6 text-center">
          <div
            className="hero-text rounded-[10px] p-6 sm:p-8 space-y-4 text-center mx-auto bg-black/40 backdrop-blur-md border border-white/10"
          >
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight tracking-tight">
              {data.title || 'Join Our Team'}
            </h1>

            {/* Supporting Text / Description */}
            <p className="text-sm sm:text-base md:text-lg text-white font-normal leading-snug max-w-xs sm:max-w-sm mx-auto">
              {data.description || 'Find exciting career opportunities with us.'}
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              {isExternalOrAnchor ? (
                <a
                  href={buttonLink}
                  onClick={handleScrollToTarget}
                  className="explore-btn inline-block px-7 py-3 text-sm sm:text-base font-bold text-black bg-white hover:bg-black hover:text-white rounded-[30px] transition-all duration-300 shadow-md cursor-pointer"
                >
                  {data.buttonText || 'Explore Jobs'}
                </a>
              ) : (
                <Link
                  to={buttonLink}
                  className="explore-btn inline-block px-7 py-3 text-sm sm:text-base font-bold text-black bg-white hover:bg-black hover:text-white rounded-[30px] transition-all duration-300 shadow-md"
                >
                  {data.buttonText || 'Explore Jobs'}
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* 2. Job Cards Row (Anchored to bottom edge with 0 bottom padding) */}
        <section id="jobs" className="w-full mt-auto pt-8 pb-0 mb-0">
          <CareerJobGrid />
        </section>
      </div>
    </div>
  );
}

