import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';

const defaultSocialImpactData = {
  badge: 'Social Impact',
  heading: 'By CityScene Global',
  paragraph1: 'At CityScene Global, we are committed to leveraging technology to create a sustainable and inclusive future. Our initiatives focus on smart urban solutions, AI-driven job creation, and environmental sustainability.',
  paragraph2: 'We drive innovation by enhancing cybersecurity, advancing AI-driven education, and strengthening digital infrastructure. Through automation, blockchain, and AI, we create efficient, secure, and sustainable solutions that benefit businesses and communities alike.',
  image: '/assets/home/social-impact/social-impact-1.jpg',
  fallbackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
  buttonText: 'View All Impact',
  buttonLink: '/about'
};

export default function HomeSocialImpactSection() {
  const [data, setData] = useState(defaultSocialImpactData);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/social-impact')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeSocialImpact API data:', err));
  }, []);

  const imageSrc = getMediaUrl(data.image || defaultSocialImpactData.image);
  const fallbackSrc = getMediaUrl(data.fallbackImage || defaultSocialImpactData.fallbackImage);

  return (
    <section className="w-full bg-white py-14 flex items-center justify-center border-b border-gray-100">
      <div className="w-[90%] max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10">
        
        {/* Left Column: Heading & Text */}
        <div className="w-full lg:w-1/2 text-left space-y-4">
          <span className="text-base font-medium text-gray-800 block">
            {data.badge || defaultSocialImpactData.badge}
          </span>
          <h2 className="text-3xl sm:text-[32px] font-medium text-black leading-snug">
            {data.heading || defaultSocialImpactData.heading}
          </h2>

          {data.paragraph1 && (
            <p className="text-base text-gray-800 leading-relaxed font-normal">
              {data.paragraph1}
            </p>
          )}

          {data.paragraph2 && (
            <p className="text-base text-gray-800 leading-relaxed font-normal">
              {data.paragraph2}
            </p>
          )}

          <div className="pt-2">
            <Link
              to={data.buttonLink || '/about'}
              className="inline-block px-5 py-2.5 bg-[#FFA500] hover:bg-black text-white font-medium text-base rounded-[20px] transition-all duration-300 shadow-sm"
            >
              {data.buttonText || 'View All Impact'}
            </Link>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="w-full max-h-[350px] rounded-[10px] overflow-hidden shadow-md">
            <img
              src={imageSrc}
              alt="Social Impact By CityScene Global"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackSrc;
              }}
              className="w-full h-[350px] object-cover object-center rounded-[10px]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
