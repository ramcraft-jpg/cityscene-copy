import React, { useState, useEffect } from 'react';

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

  const imageSrc = data.image || defaultEmpoweringData.image;

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 whitespace-pre-line">
              {data.heading || defaultEmpoweringData.heading}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {data.description || defaultEmpoweringData.description}
            </p>
          </div>

          {/* Right Column: High Angle Blueprint Team Collaboration Image */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-md border border-gray-100 max-w-lg w-full">
              <img
                src={imageSrc}
                alt="High angle aerial view of team collaborating over blueprints and laptops"
                className="w-full h-auto max-h-[380px] object-cover object-center transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
