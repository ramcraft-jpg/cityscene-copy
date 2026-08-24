import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';

const defaultHeroData = {
  subheading: 'PORTFOLIO',
  title: 'Focused\nOn achieving client\nGoals',
  description: 'Purpose-driven digital work focused on delivering results that support your business direction.',
  buttonText: "Let's Talk",
  buttonLink: '/contact',
  bgImage: '/assets/images/portfolio-hero.jpg',
  bgVideo: ''
};

export default function PortfolioHero({ videoSrc: propVideoSrc }) {
  const [data, setData] = useState(defaultHeroData);
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/portfolio-hero')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.title) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching PortfolioHero API data:', err));
  }, []);

  const rawBgImage = data.bgImage || data.backgroundImage || defaultHeroData.bgImage;
  const rawBgVideo = propVideoSrc || data.bgVideo || data.backgroundVideo || defaultHeroData.bgVideo;

  const bgImage = getMediaUrl(rawBgImage);
  const bgVideo = getMediaUrl(rawBgVideo);
  const isVideoMode = data.backgroundMediaType === 'video' || (data.backgroundMediaType !== 'image' && !!rawBgVideo) || (!!rawBgVideo && !data.backgroundMediaType);

  return (
    <section className="group relative w-full h-[90vh] min-h-[720px] lg:min-h-[850px] bg-black text-white flex items-center overflow-hidden py-20 lg:py-32">
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
              e.target.style.display = 'none';
            }}
          />
        ) : null}

        {(!isVideoMode || !bgVideo) && (
          <img
            src={bgImage}
            alt="Portfolio Background"
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-700 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          {/* Eyebrow Label */}
          <span className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-white block">
            {data.subheading || defaultHeroData.subheading}
          </span>

          {/* Full-width Horizontal White Line Divider */}
          <div className="w-full max-w-xl sm:max-w-2xl h-[2px] bg-white/90 my-3" />

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4 whitespace-pre-line">
            {data.title || defaultHeroData.title}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-lg mb-8">
            {data.description || defaultHeroData.description}
          </p>

          {/* "Let's Talk ->" Button with circular arrow */}
          <div>
            <Link
              to={data.buttonLink || '/contact'}
              className="inline-flex items-center gap-3 text-white text-base sm:text-lg font-extrabold group/btn hover:opacity-90 transition-opacity"
            >
              <span>{data.buttonText || "Let's Talk"}</span>
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-md group-hover/btn:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
