import React, { useState, useEffect } from 'react';
import { getMediaUrl } from '../../utils/imageUrl';

const defaultEmpoweringData = {
  heading: 'Empowering Businesses with Innovation',
  description: 'At CityScene Global, we help businesses thrive through cutting-edge solutions. Our services empower companies to achieve sustainable growth, enhance customer experiences, and stay ahead in the digital era.',
  image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80'
};

export default function WhatWeDoInnovationSection() {
  const [data, setData] = useState(defaultEmpoweringData);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/whatwedo-innovation')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching WhatWeDoInnovationSection API data:', err));
  }, []);

  const imageSrc = getMediaUrl(data.image || defaultEmpoweringData.image);

  return (
    <section className="w-full bg-white py-16 flex items-center justify-between z-10 relative">
      <div className="w-full max-w-full flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Column: Text Content */}
        <div className="flex-1 py-5 px-6 md:pl-[100px] text-left">
          <h2 className="text-3xl sm:text-[32px] font-medium text-[#222] leading-tight mb-4 md:ml-[50px] lg:ml-[100px]">
            {data.heading || defaultEmpoweringData.heading}
          </h2>
          <p className="text-base text-[#666] leading-relaxed font-normal max-w-[550px] md:ml-[50px] lg:ml-[100px]">
            {data.description || defaultEmpoweringData.description}
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="flex-1 flex justify-center items-center p-5 md:mr-[50px] lg:mr-[100px]">
          <div className="w-full flex justify-center">
            <img
              src={imageSrc}
              alt="High angle aerial view of team collaborating over blueprints and laptops"
              className="w-[80%] max-w-[400px] h-auto object-cover rounded-[10px] shadow-sm"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
