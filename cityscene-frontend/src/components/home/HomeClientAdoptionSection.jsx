import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/imageUrl';

const defaultClientAdoptionData = {
  heading: 'How do we serve the client',
  paragraph1: 'Our IT Client Adoption Process starts with the Initial Engagement phase, where we establish communication channels through digital platforms.',
  paragraph2: 'We begin with an in-depth consultation—either virtual or in-person—to understand your IT requirements, business goals, and operational challenges. During this stage, we gather essential documentation, including current IT infrastructure details, application landscapes, workflows, and user requirements, ensuring a tailored solution that aligns with your strategic objectives.',
  image: '/assets/home/adoption/adoption-1.jpg',
  fallbackImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  buttonText: 'View All Topics',
  buttonLink: '/about'
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

  const headingText = data.heading || defaultClientAdoptionData.heading;
  const isDefaultHeading = headingText.toLowerCase().includes('how do we serve the client');

  return (
    <section className="w-full bg-white py-12 sm:py-14 lg:py-16 flex items-center justify-center border-b border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center">
        
        {/* Left Image Container */}
        <div className="w-full lg:w-[34%] max-w-[360px] lg:max-w-[400px] flex justify-center items-center shrink-0">
          <div className="w-full h-[320px] sm:h-[380px] lg:h-[400px] rounded-[10px] overflow-hidden shadow-sm">
            <img
              src={imageSrc}
              alt="How do we serve the client"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackSrc;
              }}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div className="hidden lg:block w-[3px] h-[300px] sm:h-[330px] lg:h-[360px] bg-black mx-8 lg:mx-10 xl:mx-14 shrink-0" />

        {/* Right Content Section */}
        <div className="w-full lg:w-[48%] max-w-[500px] py-2 text-left flex flex-col justify-center">
          <h2 className="text-[28px] sm:text-[32px] font-semibold text-black mb-3.5 leading-[1.2] tracking-tight">
            {isDefaultHeading ? (
              <>
                How do we <br />
                <span>serve the client</span>
              </>
            ) : (
              headingText
            )}
          </h2>

          <div className="space-y-3.5 mb-6">
            {data.paragraph1 && (
              <p className="text-[15px] sm:text-[16px] text-[#444] leading-[1.6] font-normal">
                {data.paragraph1}
              </p>
            )}

            {data.paragraph2 && (
              <p className="text-[15px] sm:text-[16px] text-[#444] leading-[1.6] font-normal">
                {data.paragraph2}
              </p>
            )}
          </div>

          <div>
            <Link
              to={data.buttonLink || '/about'}
              className="inline-block px-5 py-2.5 text-[14px] font-medium text-black bg-white border-2 border-black rounded-[30px] hover:bg-black hover:text-white transition-all duration-300"
            >
              {data.buttonText || 'View All Topics'}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}




