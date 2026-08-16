import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  const imageSrc = data.image || defaultClientAdoptionData.image;
  const fallbackSrc = data.fallbackImage || defaultClientAdoptionData.fallbackImage;

  return (
    <section className="w-full min-h-screen min-h-[100svh] bg-white py-10 md:py-14 flex flex-col justify-center border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Vertical Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-md lg:max-w-none h-[380px] sm:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
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

          {/* Right Column: Heading & Text with Vertical Left Divider */}
          <div className="lg:col-span-7 border-l-2 border-gray-900 pl-6 sm:pl-8 md:pl-10 space-y-6 flex flex-col items-start">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-orange-600 uppercase">
              {data.badge || defaultClientAdoptionData.badge}
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-gray-900 tracking-tight leading-[1.2]">
              {data.heading || defaultClientAdoptionData.heading}
            </h2>

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
                to={data.buttonLink || '/services'}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border-2 border-gray-900 text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                {data.buttonText || 'View All Topics'}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
