import React, { useState, useEffect } from 'react';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';

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
    fetch('http://localhost:5000/api/home-content/blog-hero')
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
    <section className="group relative w-full min-h-[720px] lg:min-h-[850px] h-[88vh] bg-black text-white flex items-center overflow-hidden py-20 md:py-32">
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
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
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
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-700 pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute top-[40%] left-[5%] -translate-y-1/2 z-10 max-w-[85%] md:max-w-[50vw] text-left text-white">
        {/* Small Text Label with 80vw Horizontal Line */}
        <div className="relative text-[0.8rem] font-medium uppercase tracking-[1px] text-white pt-2 mb-5 pb-1">
          <span>{data.subheading || defaultHeroData.subheading}</span>
          <div className="absolute left-0 -bottom-1 w-[80vw] h-[1.5px] bg-white" />
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl font-normal leading-[1.3] text-white max-w-[90%] my-3 whitespace-pre-line">
          {data.title || defaultHeroData.title}
        </h1>

        {/* Supporting Paragraph */}
        <p className="text-base text-gray-300 my-4 leading-relaxed font-light max-w-[80%]">
          {data.description || defaultHeroData.description}
        </p>
      </div>
    </section>
  );
}
