import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';

const defaultCommitmentData = {
  heading: 'Our Commitment',
  description: 'Your success is our priority! We go beyond just providing IT solutions – we build partnerships that drive real growth.',
  quote: '"CitySceneGlobal helped us grow 3X!" - JaiKisaan Solar',
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
    <section className="group relative w-full h-screen min-h-[100vh] lg:min-h-[750px] bg-black text-white flex flex-col justify-center items-center overflow-hidden py-16 lg:py-24">
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
            className="w-full h-full object-cover object-center"
          >
            <source src={videoSrc} type="video/mp4" />
            <source src={defaultCommitmentData.videoFallback} type="video/mp4" />
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

      {/* Center Content Container */}
      <div className="relative z-10 max-w-[800px] mx-auto px-5 w-full text-center flex flex-col items-center justify-center space-y-5">
        <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-semibold text-white leading-tight tracking-tight">
          {data.heading || defaultCommitmentData.heading}
        </h2>

        <p className="text-base sm:text-lg lg:text-xl text-gray-100 leading-relaxed font-normal max-w-[680px] mx-auto">
          {data.description || defaultCommitmentData.description}
        </p>

        <div className="pt-2">
          <Link
            to={data.buttonLink || '/about'}
            className="inline-block px-7 py-2.5 bg-white text-black hover:bg-gray-100 font-semibold text-sm sm:text-base rounded-full transition-all duration-300 shadow-lg"
          >
            {data.buttonText || defaultCommitmentData.buttonText}
          </Link>
        </div>

        {/* Testimonial / Client Quote matching Image 2 */}
        <p className="italic text-white text-sm sm:text-base lg:text-lg font-medium tracking-wide pt-2">
          {data.quote || defaultCommitmentData.quote}
        </p>

        {/* Small horizontal pill line at bottom matching Image 2 */}
        <div className="w-8 h-[2px] bg-white/70 rounded-full mx-auto mt-4" />
      </div>
    </section>
  );
}
