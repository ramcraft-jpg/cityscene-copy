import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';
import { flashApiFetch } from '../../config/api';

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
    flashApiFetch('/home-content/about-hero')
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
    <section className="relative w-full min-h-[480px] py-16 md:py-0 md:h-screen md:min-h-[650px] overflow-hidden flex items-center justify-center text-white text-left">
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
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={bgVideo}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : null}

        {(!isVideoMode || !bgVideo) && (
          <img
            src={bgImage}
            alt="About CityScene Global"
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

        {/* CTA Button with Arrow Icon */}
        <Link
          to={data.buttonLink || '/contact'}
          className="inline-flex items-center gap-3 text-lg font-medium text-white hover:opacity-90 transition-opacity group"
        >
          <span>{data.buttonText || "Let's Talk"}</span>
          <div className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center font-bold text-base group-hover:translate-x-1 transition-transform shadow">
            ➜
          </div>
        </Link>
      </div>
    </section>
  );
}
