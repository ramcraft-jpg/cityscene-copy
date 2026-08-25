import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';

const defaultCommitmentData = {
  badge: 'Partnering For Growth',
  heading: 'Our Commitment',
  description: 'Your success is our priority! We go beyond just providing IT solutions – we build partnerships that drive real growth.',
  videoSrc: '/assets/home/commitment/commitment-video.mp4',
  videoFallback: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4',
  posterSrc: '/assets/home/commitment/commitment-bg.jpg',
  posterFallback: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80',
  buttonText: 'Learn More',
  buttonLink: '/about'
};

export default function HomeCommitmentSection() {
  const [data, setData] = useState(defaultCommitmentData);
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/commitment')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeCommitment API data:', err));
  }, []);

  const videoSrc = getMediaUrl(data.videoSrc || data.backgroundVideo || defaultCommitmentData.videoFallback);
  const posterSrc = getMediaUrl(data.posterSrc || data.backgroundImage || defaultCommitmentData.posterFallback);
  const isVideoMode = data.backgroundMediaType === 'video' || (data.backgroundMediaType !== 'image' && !!videoSrc);

  return (
    <section className="group relative w-full min-h-screen min-h-[100svh] bg-black text-white flex items-center overflow-hidden border-b border-white/10 py-16 lg:py-24">
      {/* Background Video / Media with Fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isVideoMode && videoSrc ? (
          <video
            ref={videoRef}
            key={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            poster={posterSrc}
            onError={(e) => {
              if (e.target.src !== defaultCommitmentData.videoFallback) {
                e.target.src = defaultCommitmentData.videoFallback;
              }
            }}
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={defaultCommitmentData.videoFallback} type="video/mp4" />
          </video>
        ) : null}

        {(!isVideoMode || !videoSrc) && (
          <img
            src={posterSrc}
            alt="Commitment background"
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-700 pointer-events-none" />
      </div>

      {/* Center Content Container */}
      <div className="relative z-10 max-w-[700px] mx-auto px-5 w-full text-center flex flex-col items-center justify-center space-y-4">
        <span className="text-xs sm:text-sm font-medium tracking-widest text-orange-500 uppercase block">
          {data.badge || defaultCommitmentData.badge}
        </span>

        <h2 className="text-3xl sm:text-5xl font-medium text-white leading-tight">
          {data.heading || defaultCommitmentData.heading}
        </h2>

        <p className="text-lg sm:text-[22px] text-gray-200 leading-normal font-light max-w-[600px] mx-auto">
          {data.description || defaultCommitmentData.description}
        </p>

        <div className="pt-3">
          <Link
            to={data.buttonLink || '/about'}
            className="inline-block px-7 py-3.5 bg-[#ff6600] hover:bg-[#e65c00] text-white font-medium text-lg sm:text-xl rounded-[8px] transition-all duration-300 shadow-md"
          >
            {data.buttonText || 'Learn More'}
          </Link>
        </div>
      </div>
    </section>
  );
}
