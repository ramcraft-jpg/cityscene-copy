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
    <section className="w-full min-h-screen min-h-[100svh] bg-white py-10 md:py-14 flex flex-col justify-center border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Text */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-600 uppercase block mb-1">
                {data.badge || defaultSocialImpactData.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight">
                {data.heading || defaultSocialImpactData.heading}
              </h2>
            </div>

            {data.paragraph1 && (
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                {data.paragraph1}
              </p>
            )}

            {data.paragraph2 && (
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                {data.paragraph2}
              </p>
            )}

            <div className="pt-2">
              <Link
                to={data.buttonLink || '/about'}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border-2 border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-colors"
              >
                {data.buttonText || 'View All Impact'}
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg h-[360px] sm:h-[440px] lg:h-[480px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
              <img
                src={imageSrc}
                alt="Social Impact By CityScene Global"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackSrc;
                }}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
