import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';

const defaultClientAdoptionData = {
  badge: 'Our Process',
  heading: 'How do we serve the client',
  paragraph1: 'Our IT Client Adoption Process starts with the Initial Engagement phase, where we establish communication channels through digital platforms.',
  paragraph2: 'We begin with an in-depth consultation—either virtual or in-person—to understand your IT requirements, business goals, and operational challenges. During this stage, we gather essential documentation, including current IT infrastructure details, application landscapes, workflows, and user requirements, ensuring a tailored solution that aligns with your strategic objectives.',
  image: '/assets/home/adoption/adoption-1.jpg',
  fallbackImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  buttonText: 'View All Topics',
  buttonLink: '/services'
};

export default function HomeClientAdoptionSection() {
  const [data, setData] = useState(defaultClientAdoptionData);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/client-adoption')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeClientAdoption API data:', err));
  }, []);

  const imageSrc = getMediaUrl(data.image || defaultClientAdoptionData.image);
  const fallbackSrc = getMediaUrl(data.fallbackImage || defaultClientAdoptionData.fallbackImage);

  return (
    <section className="w-full bg-white py-16 lg:py-24 flex items-center justify-center border-b border-gray-100">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center">
        
        {/* Left Column: Vertical Image */}
        <div className="w-full lg:w-[30%] lg:ml-[60px] xl:ml-[100px] flex justify-center items-center overflow-hidden">
          <div className="w-full h-[350px] sm:h-[420px] lg:h-[480px] rounded-[10px] overflow-hidden">
            <img
              src={imageSrc}
              alt="How do we serve the client - Consultation"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackSrc;
              }}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div className="hidden lg:block w-[3px] h-[300px] bg-black mx-8 xl:mx-10 shrink-0" />

        {/* Right Column: Heading & Text */}
        <div className="w-full lg:w-[50%] py-5 text-left space-y-5">
          <span className="text-xs sm:text-sm font-medium tracking-widest text-orange-600 uppercase">
            {data.badge || defaultClientAdoptionData.badge}
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-medium text-black tracking-tight leading-[1.2]">
            {data.heading || defaultClientAdoptionData.heading}
          </h2>

          {data.paragraph1 && (
            <p className="text-base text-gray-700 leading-relaxed font-normal max-w-[500px]">
              {data.paragraph1}
            </p>
          )}

          {data.paragraph2 && (
            <p className="text-base text-gray-700 leading-relaxed font-normal max-w-[500px]">
              {data.paragraph2}
            </p>
          )}

          <div className="pt-2">
            <Link
              to={data.buttonLink || '/services'}
              className="inline-block px-6 py-2.5 rounded-[30px] border-2 border-black text-black text-sm font-medium bg-white hover:bg-black hover:text-white transition-all duration-300"
            >
              {data.buttonText || 'View All Topics'}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
