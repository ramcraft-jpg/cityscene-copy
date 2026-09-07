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
  posterSrc: '',
  posterFallback: '',
  buttonText: 'Learn More',
  buttonLink: '/services'
};

export default function HomeCommitmentSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

  useEffect(() => {
    flashApiFetch('/home-content/commitment')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        } else {
          setData(defaultCommitmentData);
        }
      })
      .catch((err) => {
        console.error('Error fetching HomeCommitment API data:', err);
        setData(defaultCommitmentData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="relative w-full min-h-[550px] py-16 md:py-24 md:min-h-[650px] lg:h-screen bg-black text-white flex flex-col justify-center items-center overflow-hidden">
        <div className="relative z-10 max-w-[800px] mx-auto px-5 w-full text-center flex flex-col items-center justify-center space-y-6 animate-pulse">
          <div className="w-3/4 h-12 bg-white/20 rounded mx-auto" />
          <div className="w-full h-16 bg-white/20 rounded mx-auto" />
          <div className="w-36 h-10 bg-white/20 rounded-full mx-auto" />
        </div>
      </section>
    );
  }

  const activeData = data || defaultCommitmentData;

  const videoSrc = getMediaUrl(activeData.videoSrc || activeData.backgroundVideo || defaultCommitmentData.videoSrc);
  const videoFallbackSrc = getMediaUrl(defaultCommitmentData.videoFallback);
  const posterSrc = (activeData.posterSrc || activeData.backgroundImage) ? getMediaUrl(activeData.posterSrc || activeData.backgroundImage) : '';
  const isVideoMode = activeData.backgroundMediaType === 'video' || (activeData.backgroundMediaType !== 'image' && !!videoSrc);

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
            poster={posterSrc || undefined}
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
          {activeData.heading || defaultCommitmentData.heading}
        </h2>

        <p className="text-lg sm:text-xl lg:text-[22px] text-gray-100 leading-relaxed font-normal max-w-[650px] mx-auto">
          {activeData.description || defaultCommitmentData.description}
        </p>

        <div className="pt-2">
          <Link
            to={activeData.buttonLink || '/services'}
            className="inline-block px-7 py-3 text-base font-bold bg-white text-black hover:bg-black hover:text-white border-2 border-black rounded-full transition-all duration-300 shadow-lg"
          >
            {activeData.buttonText || defaultCommitmentData.buttonText}
          </Link>
        </div>

        {/* Testimonial / Client Quote matching original code */}
        <p className="italic text-white text-base sm:text-lg font-medium tracking-wide pt-3">
          {activeData.quote || defaultCommitmentData.quote}
        </p>

        {/* Small horizontal line */}
        <div className="w-8 h-[2px] bg-white/70 rounded-full mx-auto mt-2" />
      </div>
    </section>
  );
}

