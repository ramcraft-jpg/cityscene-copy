import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';
import { flashApiFetch } from '../../config/api';

const defaultHeroData = {
  subheading: 'WHAT WE DO',
  title: 'Professional\nServices Tailored for\nYou',
  description: 'Helping businesses innovate and grow in the digital age.',
  buttonText: "Let's Talk",
  buttonLink: '/contact',
  bgImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1920&q=80',
  bgVideo: '/files/vd12.mp4'
};

export default function WhatWeDoHero() {
  const [data, setData] = useState(defaultHeroData);
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    flashApiFetch('/home-content/whatwedo-hero')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.title) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching WhatWeDoHero API data:', err));
  }, []);

  const rawBgImage = data.bgImage || data.backgroundImage || defaultHeroData.bgImage;
  const rawBgVideo = data.bgVideo || data.backgroundVideo || defaultHeroData.bgVideo;

  const bgImage = getMediaUrl(rawBgImage);
  const bgVideo = getMediaUrl(rawBgVideo);
  const isVideoMode = data.backgroundMediaType === 'video' || (data.backgroundMediaType !== 'image' && !!rawBgVideo) || (!!rawBgVideo && !data.backgroundMediaType);

  return (
    <section className="group relative w-full h-screen min-h-[600px] flex items-center text-left bg-transparent overflow-hidden z-10">
      {/* Scroll-Over Fixed Background Video / Image Layer */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden pointer-events-none">
        {isVideoMode && bgVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={bgImage}
            className="w-full h-full object-cover"
            src={bgVideo}
            onError={(e) => {
              console.warn('Video failed to load, falling back:', e);
            }}
          />
        ) : null}

        {(!isVideoMode || !bgVideo) && (
          <img
            src={bgImage}
            alt="Background"
            className="w-full h-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Hero Header Content Unit */}
      <div className="absolute top-[45%] md:top-[40%] left-[5%] md:left-[8%] -translate-y-1/2 z-10 w-[90%] md:w-[85%] max-w-[550px] lg:max-w-[600px] text-left text-white">
        {/* Small Text Label with 80vw Horizontal Line */}
        <div className="relative text-[0.8rem] font-bold uppercase tracking-[1px] text-white pt-2 mb-4 pb-1">
          <span>{data.subheading || defaultHeroData.subheading}</span>
          <div className="absolute left-0 -bottom-1 w-[80vw] h-[1.5px] bg-white" />
        </div>

        {/* Main Heading with Exact Line Breaks */}
        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold leading-[1.25] text-white my-4 whitespace-pre-line tracking-tight max-w-[90%]">
          {data.title || defaultHeroData.title}
        </h1>

        {/* Supporting Paragraph */}
        <p className="text-base sm:text-lg text-gray-200 my-4 leading-relaxed font-normal max-w-[80%]">
          {data.description || defaultHeroData.description}
        </p>

        {/* CTA Button with Circular Arrow Icon */}
        <Link
          to={data.buttonLink || '/contact'}
          className="inline-flex items-center gap-2 text-[1.2rem] font-bold text-white hover:opacity-90 transition-opacity mt-2 group"
        >
          <span>{data.buttonText || "Let's Talk"}</span>
          <div className="w-[35px] h-[35px] bg-white text-black rounded-full flex items-center justify-center font-bold text-lg group-hover:translate-x-1 transition-transform ml-1">
            ➜
          </div>
        </Link>
      </div>
    </section>
  );
}
