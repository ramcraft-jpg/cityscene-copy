import React, { useState, useEffect } from 'react';
import { valuesData as staticValues } from '../../data/aboutData';
import { getMediaUrl } from '../../utils/imageUrl';

const defaultValuesData = {
  heading: 'Our Values',
  values: staticValues
};

export default function AboutValuesSection() {
  const [data, setData] = useState(defaultValuesData);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/about-values')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.values) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching AboutValuesSection API data:', err));
  }, []);

  const getPositionClasses = (position) => {
    switch (position) {
      case 'top-left':
        return 'top-8 left-8 text-left items-start';
      case 'bottom-right':
        return 'bottom-8 right-8 text-right items-end';
      case 'bottom-left':
      default:
        return 'bottom-8 left-8 text-left items-start';
    }
  };

  const valuesList = data.values && data.values.length > 0 ? data.values : staticValues;

  return (
    <section className="w-full bg-white py-20 md:py-28 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 tracking-tight">
            {data.heading || 'Our Values'}
          </h2>
        </div>

        {/* 3 Values Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {valuesList.map((val, idx) => (
            <div
              key={val.id || idx}
              className="group relative block w-full h-[380px] sm:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Background Image */}
              <img
                src={getMediaUrl(val.image)}
                alt={val.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-300" />

              {/* Text Container with Dynamic Positioning */}
              <div className={`absolute max-w-[85%] flex flex-col z-10 ${getPositionClasses(val.position)}`}>
                <h3 className="text-white text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
                  {val.title}
                </h3>
                <p className="text-gray-200 text-sm sm:text-base font-normal leading-snug">
                  {val.description}
                </p>
              </div>

              {/* Subtle Border Glow */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/10 group-hover:border-white/30 transition-colors pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
