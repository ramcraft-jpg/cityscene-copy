import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { flashApiFetch } from '../../config/api';

const defaultSocialImpactData = {
  badge: 'Social Impact',
  heading: 'By CityScene Global',
  paragraph1: 'At CityScene Global, we are committed to leveraging technology to create a sustainable and inclusive future. Our initiatives focus on smart urban solutions, AI-driven job creation, and environmental sustainability.',
  paragraph2: 'We drive innovation by enhancing cybersecurity, advancing AI-driven education, and strengthening digital infrastructure. Through automation, blockchain, and AI, we create efficient, secure, and sustainable solutions that benefit businesses and communities alike.',
  image: '/files/si2.jpg',
  fallbackImage: '/files/si2.jpg',
  buttonText: 'View All Impact',
  buttonLink: '/about'
};

export default function HomeSocialImpactSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    flashApiFetch('/home-content/social-impact')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        } else {
          setData(defaultSocialImpactData);
        }
      })
      .catch((err) => {
        console.error('Error fetching HomeSocialImpact API data:', err);
        setData(defaultSocialImpactData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white py-10 sm:py-14 flex items-center justify-center border-b border-gray-100">
        <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10 animate-pulse">
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="w-24 h-4 bg-gray-200 rounded" />
            <div className="w-3/4 h-8 bg-gray-200 rounded" />
            <div className="w-full h-20 bg-gray-200 rounded" />
          </div>
          <div className="w-full lg:w-1/2 h-[260px] sm:h-[350px] bg-gray-200 rounded-[10px]" />
        </div>
      </section>
    );
  }

  const activeData = data || defaultSocialImpactData;

  const imageSrc = getMediaUrl(activeData.image || defaultSocialImpactData.image);
  const fallbackSrc = getMediaUrl(activeData.fallbackImage || defaultSocialImpactData.fallbackImage);

  return (
    <section className="w-full bg-white py-10 sm:py-14 flex items-center justify-center border-b border-gray-100">
      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10">

        {/* Left Column: Heading & Text */}
        <div className="w-full lg:w-1/2 text-left space-y-4">
          <span className="text-sm font-medium text-gray-800 block">
            {activeData.badge || defaultSocialImpactData.badge}
          </span>
          <h2 className="text-3xl sm:text-[32px] font-medium text-black leading-snug">
            {activeData.heading || defaultSocialImpactData.heading}
          </h2>

          {activeData.paragraph1 && (
            <p className="text-base text-gray-800 leading-relaxed font-normal">
              {activeData.paragraph1}
            </p>
          )}

          {activeData.paragraph2 && (
            <p className="text-base text-gray-800 leading-relaxed font-normal">
              {activeData.paragraph2}
            </p>
          )}

          <div className="pt-2">
            <Link
              to={activeData.buttonLink || '/about'}
              className="inline-block px-5 py-2.5 bg-none border border-black text-black font-medium text-sm rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              {activeData.buttonText || 'View All Impact'}
            </Link>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="w-full h-[260px] sm:h-[350px] rounded-[10px] overflow-hidden shadow-md">
            <img
              src={imageSrc}
              alt="Social Impact By CityScene Global"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackSrc;
              }}
              className="w-full h-full object-cover object-center rounded-[10px]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
