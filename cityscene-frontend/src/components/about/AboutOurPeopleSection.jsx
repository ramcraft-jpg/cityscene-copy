import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getMediaUrl } from '../../utils/imageUrl';

const defaultPeopleData = {
  subheading: 'Our People',
  title: 'How do you drive meaningful change? By recruiting, appreciating, and supporting top talent from diverse backgrounds.',
  buttonText: "Let's Talk",
  buttonLink: '/contact',
  bgImage: ''
};

export default function AboutOurPeopleSection() {
  const [data, setData] = useState(defaultPeopleData);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/about-people')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.title) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching AboutOurPeopleSection API data:', err));
  }, []);

  return (
    <section className="w-full bg-[#171717] text-white py-12 md:py-16 relative overflow-hidden">
      {data.bgImage && (
        <div className="absolute inset-0 z-0">
          <img src={getMediaUrl(data.bgImage)} alt="Our People Background" className="w-full h-full object-cover opacity-20" />
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="max-w-2xl text-left border-l border-white/60 pl-8 sm:pl-10 py-2 space-y-6">
          {/* Section Label */}
          <div className="text-gray-300 font-normal text-sm sm:text-base tracking-wide uppercase">
            {data.subheading || defaultPeopleData.subheading}
          </div>

          {/* Main Statement */}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-white leading-[1.35] tracking-tight whitespace-pre-line">
            {data.title || defaultPeopleData.title}
          </h2>

          {/* Let's Talk CTA Button */}
          <div className="pt-2">
            <Link
              to={data.buttonLink || '/contact'}
              className="inline-flex items-center gap-3 group text-white font-medium text-base sm:text-lg hover:text-white/90 transition-all duration-200"
            >
              <span>{data.buttonText || "Let's Talk"}</span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center text-gray-900 group-hover:bg-gray-100 group-hover:scale-105 transition-all shadow-md">
                <ArrowRight size={18} className="stroke-[2.5]" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
