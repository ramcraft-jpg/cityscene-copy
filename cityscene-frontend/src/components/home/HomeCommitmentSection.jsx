import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  const videoSrc = data.videoSrc || defaultCommitmentData.videoSrc;
  const videoFallback = data.videoFallback || defaultCommitmentData.videoFallback;
  const posterSrc = data.posterSrc || defaultCommitmentData.posterSrc;
  const posterFallback = data.posterFallback || defaultCommitmentData.posterFallback;

  return (
    <section className="relative w-full min-h-screen min-h-[100svh] bg-black text-white flex items-center overflow-hidden border-b border-white/10 py-16 lg:py-24">
      {/* Background Video / Media with Fallback */}
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        onError={(e) => {
          if (e.target.poster !== posterFallback) {
            e.target.poster = posterFallback;
          }
        }}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={videoSrc} type="video/mp4" />
        <source src={videoFallback} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50 z-10 pointer-events-none" />

      {/* Hero-Spaced Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-left space-y-6">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-500 uppercase block">
            {data.badge || defaultCommitmentData.badge}
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {data.heading || defaultCommitmentData.heading}
          </h2>

          <p className="text-lg sm:text-2xl text-gray-200 leading-relaxed font-light">
            {data.description || defaultCommitmentData.description}
          </p>

          <div className="pt-2">
            <Link
              to={data.buttonLink || '/about'}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base"
            >
              {data.buttonText || 'Learn More'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
