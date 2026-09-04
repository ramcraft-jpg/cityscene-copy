import React, { useState, useEffect } from 'react';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';
import { flashApiFetch } from '../../config/api';

const defaultHeroData = {
  subheading: 'BLOG',
  title: 'Pioneering the\nNext Wave of\nTechnology',
  description: 'Innovative, scalable, and AI-driven solutions for a smarter digital world.',
  bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
  bgVideo: ''
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
  const [data, setData] = useState(defaultHeroData);
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    flashApiFetch('/home-content/blog-hero')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.title) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching BlogHero API data:', err));
  }, []);

  const rawBgImage = data.bgImage || data.backgroundImage || defaultHeroData.bgImage;
  let rawBgVideo = propVideoSrc || data.bgVideo || data.backgroundVideo || defaultHeroData.bgVideo;

  if (!rawBgVideo && isVideoUrl(rawBgImage)) {
    rawBgVideo = rawBgImage;
  }

  const bgImage = isVideoUrl(rawBgImage) ? '' : getMediaUrl(rawBgImage);
  const bgVideo = getMediaUrl(rawBgVideo);

  const isVideoMode =
    data.backgroundMediaType === 'video' ||
    (data.backgroundMediaType !== 'image' && !!rawBgVideo) ||
    (!!rawBgVideo && !data.backgroundMediaType) ||
    isVideoUrl(rawBgImage) ||
    isVideoUrl(rawBgVideo);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center text-white text-left">
      {/* Background Image / Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isVideoMode && bgVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={bgImage}
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={bgVideo}
            onError={(e) => {
              console.error('Video load error:', bgVideo);
            }}
          />
        ) : null}

        {(!isVideoMode || !bgVideo) && (
          <img
            src={bgImage}
            alt="Person using stylus on digital tablet with charts"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 text-left text-white w-full">
        {/* Small Text Label with Horizontal Line */}
        <div className="relative text-xs sm:text-sm font-semibold uppercase tracking-[2px] text-white pb-3 mb-6">
          <span>{data.subheading || defaultHeroData.subheading}</span>
          <div className="absolute left-0 bottom-0 w-[80vw] max-w-[800px] h-[1.5px] bg-white/80" />
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.2] text-white max-w-3xl mb-6 whitespace-pre-line">
          {data.title || defaultHeroData.title}
        </h1>

        {/* Supporting Paragraph */}
        <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-light max-w-2xl mb-8">
          {data.description || defaultHeroData.description}
        </p>
      </div>
    </section>
  );
}
