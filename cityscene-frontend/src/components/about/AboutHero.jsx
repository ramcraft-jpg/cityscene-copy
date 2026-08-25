import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';

const defaultHeroData = {
  subheading: 'WHO WE ARE',
  title: 'About Us',
  description: 'We provide top-notch, high-quality services tailored to meet your unique needs. Our expert solutions are designed to enhance your growth, efficiency, and creativity. Let us help you turn your vision into reality and achieve long-term success.',
  buttonText: "Let's Talk",
  buttonLink: '/contact',
  bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
  bgVideo: ''
};

export default function AboutHero() {
  const [data, setData] = useState(defaultHeroData);
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/about-hero')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.title) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching AboutHero API data:', err));
  }, []);

  const rawBgImage = data.bgImage || data.backgroundImage || defaultHeroData.bgImage;
  const rawBgVideo = data.bgVideo || data.backgroundVideo || defaultHeroData.bgVideo;

  const bgImage = getMediaUrl(rawBgImage);
  const bgVideo = getMediaUrl(rawBgVideo);
  const isVideoMode = data.backgroundMediaType === 'video' || (data.backgroundMediaType !== 'image' && !!rawBgVideo) || (!!rawBgVideo && !data.backgroundMediaType);

  return (
    <section className="group relative w-full min-h-[720px] lg:min-h-[850px] h-[88vh] bg-black overflow-hidden flex items-center">
      {/* Background Media Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isVideoMode && bgVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={bgImage}
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            src={bgVideo}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : null}

        {(!isVideoMode || !bgVideo) && (
          <img
            src={bgImage}
            alt="Tech team and business innovation atmosphere"
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-700 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="max-w-2xl text-left">
          {/* Subheading Label */}
          <div className="text-white font-medium text-sm sm:text-base tracking-widest uppercase mb-3">
            {data.subheading || defaultHeroData.subheading}
          </div>

          {/* Thin Horizontal Line Divider */}
          <div className="w-full max-w-4xl lg:max-w-5xl h-[1px] bg-white/40 mb-8" />

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-[1.12] tracking-tight mb-6 whitespace-pre-line">
            {data.title || defaultHeroData.title}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed mb-10 max-w-xl">
            {data.description || defaultHeroData.description}
          </p>

          {/* CTA Button */}
          <Link
            to={data.buttonLink || '/contact'}
            className="inline-flex items-center gap-3 group/btn text-white font-medium text-lg hover:text-white/90 transition-all duration-200"
          >
            <span>{data.buttonText || "Let's Talk"}</span>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-900 group-hover/btn:bg-gray-100 group-hover/btn:scale-105 transition-all shadow-lg">
              <ArrowRight size={20} className="stroke-[2.5]" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
