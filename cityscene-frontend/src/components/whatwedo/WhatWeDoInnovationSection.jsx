import React, { useState, useEffect } from 'react';
import { getMediaUrl } from '../../utils/imageUrl';
import { flashApiFetch } from '../../config/api';

const defaultEmpoweringData = {
  heading: 'Empowering Businesses with Innovation',
  description: 'At CityScene Global, we help businesses thrive through cutting-edge solutions. Our services empower companies to achieve sustainable growth, enhance customer experiences, and stay ahead in the digital era.',
  image: ''
};

export default function WhatWeDoInnovationSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    flashApiFetch('/home-content/whatwedo-innovation')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        } else {
          setData(defaultEmpoweringData);
        }
      })
      .catch((err) => {
        console.error('Error fetching WhatWeDoInnovationSection API data:', err);
        setData(defaultEmpoweringData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white py-16 sm:py-20 flex items-center justify-between z-20 relative border-b border-gray-100">
        <div className="w-full max-w-full flex flex-col md:flex-row items-center justify-between animate-pulse">
          <div className="flex-1 py-5 px-6 md:pl-[80px] lg:pl-[100px] text-left space-y-4">
            <div className="w-3/4 h-8 bg-gray-200 rounded md:ml-[30px] lg:ml-[50px]" />
            <div className="w-full max-w-[550px] h-20 bg-gray-200 rounded md:ml-[30px] lg:ml-[50px]" />
          </div>
          <div className="flex-1 flex justify-center items-center p-5 md:mr-[50px] lg:mr-[100px]">
            <div className="w-[80%] max-w-[400px] h-64 bg-gray-200 rounded-[10px]" />
          </div>
        </div>
      </section>
    );
  }

  const activeData = data || defaultEmpoweringData;
  const imageSrc = activeData.image ? getMediaUrl(activeData.image) : '';

  return (
    <section className="w-full bg-white py-16 sm:py-20 flex items-center justify-between z-20 relative">
      <div className="w-full max-w-full flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Column: Text Content */}
        <div className="flex-1 py-5 px-6 md:pl-[80px] lg:pl-[100px] text-left">
          <h2 className="text-3xl sm:text-[32px] font-bold text-[#222] leading-tight mb-4 md:ml-[30px] lg:ml-[50px]">
            {activeData.heading || defaultEmpoweringData.heading}
          </h2>
          <p className="text-base text-[#666] leading-relaxed font-normal max-w-[550px] md:ml-[30px] lg:ml-[50px]">
            {activeData.description || defaultEmpoweringData.description}
          </p>
        </div>

        {/* Right Column: Image */}
        {imageSrc ? (
          <div className="flex-1 flex justify-center items-center p-5 md:mr-[50px] lg:mr-[100px]">
            <div className="w-full flex justify-center">
              <img
                src={imageSrc}
                alt="Business Innovation"
                className="w-[80%] max-w-[400px] h-auto object-cover rounded-[10px] shadow-sm"
              />
            </div>
          </div>
        ) : null}

      </div>
    </section>
  );
}
