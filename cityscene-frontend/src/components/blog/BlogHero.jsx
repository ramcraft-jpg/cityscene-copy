import React, { useState, useEffect } from 'react';

const defaultHeroData = {
  subheading: 'BLOG',
  title: 'Pioneering the\nNext Wave of\nTechnology',
  description: 'Innovative, scalable, and AI-driven solutions for a smarter digital world.',
  bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
  bgVideo: ''
};

export default function BlogHero({ videoSrc: propVideoSrc }) {
  const [data, setData] = useState(defaultHeroData);

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

  const bgImage = data.bgImage || data.backgroundImage || defaultHeroData.bgImage;
  const bgVideo = propVideoSrc || data.bgVideo || data.backgroundVideo || defaultHeroData.bgVideo;
  const isVideoMode = data.backgroundMediaType === 'video' || (data.backgroundMediaType !== 'image' && !!bgVideo);

  return (
    <section className="relative w-full min-h-[720px] lg:min-h-[850px] h-[88vh] bg-black text-white flex items-center overflow-hidden py-20 md:py-32">
      {/* Background Image / Video Layer */}
      <div className="absolute inset-0 z-0">
        {isVideoMode && bgVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={bgImage}
            className="w-full h-full object-cover object-center"
            src={bgVideo}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : null}

        {(!isVideoMode || !bgVideo) && (
          <img
            src={bgImage}
            alt="Person using stylus on digital tablet with charts"
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left">
          {/* Eyebrow Label matching screenshot */}
          <span className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-white block">
            {data.subheading || defaultHeroData.subheading}
          </span>

          {/* Full-width Horizontal White Line Divider below BLOG */}
          <div className="w-full max-w-xl sm:max-w-2xl h-[2px] bg-white/90 my-3" />

          {/* Main Heading matching screenshot */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4 whitespace-pre-line">
            {data.title || defaultHeroData.title}
          </h1>

          {/* Supporting Text matching screenshot */}
          <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed max-w-lg">
            {data.description || defaultHeroData.description}
          </p>
        </div>
      </div>
    </section>
  );
}
