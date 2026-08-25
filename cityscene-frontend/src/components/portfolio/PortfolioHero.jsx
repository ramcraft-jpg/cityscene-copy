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

        {/* CTA Button with Circular Arrow Icon */}
        <Link
          to={data.buttonLink || '/contact'}
          className="inline-flex items-center gap-2 text-[1.2rem] font-medium text-white hover:opacity-90 transition-opacity mt-2 group"
        >
          <span>{data.buttonText || "Let's Talk"}</span>
          <div className="w-[35px] h-[35px] bg-white text-black rounded-full flex items-center justify-center font-bold text-lg group-hover:translate-x-1 transition-transform">
            ➜
          </div>
        </Link>
      </div>
    </section>
  );
}
