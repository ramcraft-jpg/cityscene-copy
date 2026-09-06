import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';
import { flashApiFetch } from '../../config/api';

const defaultAboutData = {
  heading: 'About Us',
  paragraph1: 'At CityScene Global Private Limited, we are committed to transforming urban landscapes with cutting-edge technology and sustainable solutions. In an era where businesses face challenges such as outdated infrastructure, slow system performance, and complex IT management, we provide future-ready solutions that drive efficiency, security, and innovation.',
  paragraph2: 'We specialize in Automation, Artificial Intelligence (AI), Blockchain, Smart City Solutions, and Digital Infrastructure, enabling businesses and governments to navigate the fast-paced digital world seamlessly. Our expertise ensures the integration of intelligent, scalable, and efficient systems tailored to your needs.',
  image: '/assets/home/about/about-1.jpg',
  fallbackImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
  buttonText: 'Learn More',
  buttonLink: '/about'
};

export default function HomeAboutUsSection() {
  const [data, setData] = useState(defaultAboutData);

  useEffect(() => {
    flashApiFetch('/home-content/about')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeAbout API data:', err));
  }, []);

  return (
    <section className="w-full bg-[#222222] text-white py-10 sm:py-16 flex items-center justify-center border-b border-white/10">
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 relative">

        {/* Vertical Left Line Divider */}
        <div className="absolute left-2 sm:left-0 top-[50px] sm:top-[60px] h-[80%] w-[3px] sm:w-[4px] bg-[#ccc]" />

        <div className="pl-5 sm:pl-6 space-y-4">
          <h2 className="text-2xl sm:text-[32px] font-medium text-white text-left mb-4">
            {data.heading || defaultAboutData.heading}
          </h2>

          {data.paragraph1 && (
            <p className="text-sm sm:text-base leading-relaxed text-[#ddd] font-light text-left sm:text-justify mb-4">
              {data.paragraph1}
            </p>
          )}

          {data.paragraph2 && (
            <p className="text-sm sm:text-base leading-relaxed text-[#ddd] font-light text-left sm:text-justify mb-4">
              {data.paragraph2}
            </p>
          )}

          <div className="pt-2 text-left">
            <Link
              to={data.buttonLink || '/about'}
              className="inline-block px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border-2 border-white text-white font-medium text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              {data.buttonText || 'Learn More'}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
