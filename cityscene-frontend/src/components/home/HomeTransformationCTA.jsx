import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const defaultTransformationData = {
  heading: 'Transformation starts here',
  subtitle: 'Reimagine your future.',
  description: 'Be part of an innovative team driving AI, Blockchain, and Smart City solutions. Work on global projects, grow with cutting-edge training, and shape the future of digital transformation.',
  features: [
    'Exciting global opportunities',
    'AI & smart tech innovation',
    'Career growth & learning.'
  ],
  buttonText: 'Connect With Us',
  buttonLink: '/contact'
};

export default function HomeTransformationCTA() {
  const [data, setData] = useState(defaultTransformationData);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/transformation')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeTransformation API data:', err));
  }, []);

  const features = data.features && data.features.length > 0 ? data.features : defaultTransformationData.features;
  const headingText = data.heading || defaultTransformationData.heading;
  const isDefaultHeading = headingText.toLowerCase().includes('transformation starts here');

  return (
    <section className="w-full bg-white text-black py-12 sm:py-16 flex items-center justify-center border-b border-gray-100">
      <div className="w-full max-w-[1100px] mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-center">
        
        {/* Left Side */}
        <div className="w-full md:w-[42%] max-w-[360px] text-left space-y-3 shrink-0">
          <h2 className="text-3xl sm:text-[2.8rem] font-semibold text-black leading-[1.1] tracking-tight">
            {isDefaultHeading ? (
              <>
                Transformation <br />
                <span>starts here</span>
              </>
            ) : (
              headingText
            )}
          </h2>

          <p className="text-lg sm:text-[1.2rem] text-black font-light pt-1 pb-1">
            {data.subtitle || defaultTransformationData.subtitle}
          </p>

          <div className="pt-2">
            <Link
              to={data.buttonLink || '/contact'}
              className="inline-block px-5 py-2.5 text-[14px] font-medium text-black bg-white border-2 border-black rounded-[30px] hover:bg-black hover:text-white transition-all duration-300"
            >
              {data.buttonText || 'Connect With Us'}
            </Link>
          </div>
        </div>

        {/* Center Vertical Divider Line */}
        <div className="hidden md:block w-[2px] h-[220px] sm:h-[240px] bg-black mx-10 lg:mx-16 shrink-0" />

        {/* Right Side */}
        <div className="w-full md:w-[48%] max-w-[440px] text-left text-black mt-8 md:mt-0 space-y-4">
          <p className="text-[15px] sm:text-[16px] text-black leading-[1.6]">
            {data.description || defaultTransformationData.description}
          </p>

          <div className="space-y-1.5 text-[15px] sm:text-[16px] font-normal text-black leading-snug">
            {features.map((feat, idx) => (
              <p key={idx}>
                {feat}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

