import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const defaultCareerData = {
  badge: 'ARE YOU READY ?',
  headingLine1: 'Be A Part Of The',
  headingLine2: 'Next Big Thing',
  buttonText: 'VIEW OUR MORE',
  buttonLink: '/career'
};

export default function HomeCareerNextBigThingSection() {
  const [data, setData] = useState(defaultCareerData);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/career')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.badge) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching HomeCareer API data:', err));
  }, []);

  return (
    <section className="w-full bg-black text-white py-10 sm:py-12 lg:py-14 flex flex-col justify-center items-center text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Top Tagline matching reference image */}
        <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-white uppercase block">
          {data.badge || defaultCareerData.badge}
        </span>

        {/* Main Heading matching reference image */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.2]">
          {data.headingLine1 || defaultCareerData.headingLine1} <br />
          {data.headingLine2 || defaultCareerData.headingLine2}
        </h2>

        {/* Action Button matching reference image */}
        <div className="pt-2">
          <Link
            to={data.buttonLink || '/career'}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black font-bold text-[11px] sm:text-xs rounded-full tracking-widest hover:bg-gray-200 transition-all duration-300 shadow-md uppercase"
          >
            {data.buttonText || 'VIEW OUR MORE'}
          </Link>
        </div>
      </div>
    </section>
  );
}
