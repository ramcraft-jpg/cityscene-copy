import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';
import { flashApiFetch } from '../../config/api';

const defaultCommitmentData = {
  heading: 'Our Commitment',
  description: 'Your success is our priority! We go beyond just providing IT solutions – we build partnerships that drive real growth.',
  quote: '"CitySceneGlobal helped us grow 3X!" - JaiKisaan Solar',
  videoSrc: '/files/vd15.mp4',
  videoFallback: '/files/vd12.mp4',
  onlineFallback: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4',
  posterSrc: '/assets/home/commitment/commitment-bg.jpg',
  posterFallback: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80',
  buttonText: 'Learn More',
  buttonLink: '/services'
};

export default function HomeCommitmentSection() {
  const [data, setData] = useState(defaultCommitmentData);
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    flashApiFetch('/home-content/commitment')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeCommitment API data:', err));
  }, []);

  const videoSrc = getMediaUrl(data.videoSrc || data.backgroundVideo || defaultCommitmentData.videoSrc);
  const videoFallbackSrc = getMediaUrl(defaultCommitmentData.videoFallback);
  const posterSrc = getMediaUrl(data.posterSrc || data.backgroundImage || defaultCommitmentData.posterFallback);
  const isVideoMode = data.backgroundMediaType === 'video' || (data.backgroundMediaType !== 'image' && !!videoSrc);

  return (
    <section className="relative w-full min-h-[550px] py-16 md:py-24 md:min-h-[650px] lg:h-screen bg-black text-white flex flex-col justify-center items-center overflow-hidden [clip-path:inset(0)]">
      {/* Background Video with Fixed Viewport Scroll-Over Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
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
              if (e.target.src !== videoFallbackSrc) {
                e.target.src = videoFallbackSrc;
              }
            }}
            className="w-full h-full object-cover object-center"
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={videoFallbackSrc} type="video/mp4" />
            <source src={defaultCommitmentData.onlineFallback} type="video/mp4" />
          </video>
        ) : null}

        {(!isVideoMode || !videoSrc) && (
          <img
            src={posterSrc}
            alt="Commitment background"
            className="w-full h-full object-cover object-center"
          />
        )}
        <div className="absolute inset-0 bg-black/50 transition-colors duration-700 pointer-events-none" />
      </div>

      {/* Center Content Container Scrolling Over Fixed Video */}
      <div className="relative z-10 max-w-[800px] mx-auto px-5 w-full text-center flex flex-col items-center justify-center space-y-6">
        <h2 className="text-4xl sm:text-5xl lg:text-[50px] font-bold text-white leading-tight tracking-tight">
          {data.heading || defaultCommitmentData.heading}
        </h2>

        <p className="text-lg sm:text-xl lg:text-[22px] text-gray-100 leading-relaxed font-normal max-w-[650px] mx-auto">
          {data.description || defaultCommitmentData.description}
        </p>

        <div className="pt-2">
          <Link
            to={data.buttonLink || '/services'}
            className="inline-block px-7 py-3 text-base font-bold bg-white text-black hover:bg-black hover:text-white border-2 border-black rounded-full transition-all duration-300 shadow-lg"
          >
            {data.buttonText || defaultCommitmentData.buttonText}
          </Link>
        </div>

        {/* Testimonial / Client Quote matching original code */}
        <p className="italic text-white text-base sm:text-lg font-medium tracking-wide pt-3">
          {data.quote || defaultCommitmentData.quote}
        </p>

        {/* Small horizontal line */}
        <div className="w-8 h-[2px] bg-white/70 rounded-full mx-auto mt-2" />
      </div>
    </section>
  );
}

