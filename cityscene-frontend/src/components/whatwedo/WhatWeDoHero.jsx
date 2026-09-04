import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
  bgVideo: ''
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
    <section className="group relative w-full min-h-[720px] lg:min-h-[850px] h-[88vh] bg-[#111] overflow-hidden flex items-center text-left">
      {/* Background Video / Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
              e.target.style.display = 'none';
            }}
          />
        ) : null}

        {(!isVideoMode || !bgVideo) && (
          <img
            src={bgImage}
            alt="Developer Workstation"
            className="w-full h-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Hero Header Content Unit */}
      <div className="absolute top-[50%] left-[8%] md:left-[10%] -translate-y-1/2 z-10 w-[85%] max-w-[550px] lg:max-w-[600px] text-left text-white">
        {/* Small Text Label with 80vw Horizontal Line */}
        <div className="relative text-[0.85rem] font-medium uppercase tracking-[1px] text-white pt-2 mb-6 pb-1">
          <span>{data.subheading || defaultHeroData.subheading}</span>
          <div className="absolute left-0 -bottom-1 w-[80vw] h-[1.5px] bg-white" />
        </div>

        {/* Main Heading with Exact Line Breaks */}
        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-normal leading-[1.25] text-white my-4 whitespace-pre-line tracking-tight">
          {data.title || defaultHeroData.title}
        </h1>

        {/* Supporting Paragraph */}
        <p className="text-base sm:text-lg text-gray-200 my-5 leading-relaxed font-light max-w-[480px]">
          {data.description || defaultHeroData.description}
        </p>

        {/* CTA Button with Circular Arrow Icon */}
        <Link
          to={data.buttonLink || '/contact'}
          className="inline-flex items-center gap-2 text-[1.2rem] font-medium text-white hover:opacity-90 transition-opacity mt-2 group"
        >
          <span>{data.buttonText || "Let's Talk"}</span>
          <div className="w-[35px] h-[35px] bg-white text-black rounded-full flex items-center justify-center font-medium text-lg group-hover:translate-x-1 transition-transform">
            ➜
          </div>
        </Link>
      </div>
    </section>
  );
}
