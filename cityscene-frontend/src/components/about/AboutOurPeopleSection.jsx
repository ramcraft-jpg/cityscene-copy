import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getMediaUrl } from '../../utils/imageUrl';
import { flashApiFetch } from '../../config/api';

const defaultPeopleData = {
  subheading: 'Our People',
  title: 'How do you drive meaningful change? By recruiting, appreciating, and supporting top talent from diverse backgrounds.',
  buttonText: "Let's Talk",
  buttonLink: '/contact',
  bgImage: ''
};

export default function AboutOurPeopleSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    flashApiFetch('/home-content/about-people')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.title) {
          setData(resData.content);
        } else {
          setData(defaultPeopleData);
        }
      })
      .catch((err) => {
        console.error('Error fetching AboutOurPeopleSection API data:', err);
        setData(defaultPeopleData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#171717] text-white py-10 md:py-12 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
          <div className="max-w-2xl text-left border-l border-white/60 pl-8 sm:pl-10 py-2 space-y-6 animate-pulse">
            <div className="w-24 h-4 bg-white/20 rounded" />
            <div className="w-full h-16 bg-white/20 rounded" />
            <div className="w-32 h-10 bg-white/20 rounded-full" />
          </div>
        </div>
      </section>
    );
  }

  const activeData = data || defaultPeopleData;

  return (
    <section className="w-full bg-[#171717] text-white py-10 md:py-12 relative overflow-hidden">
      {activeData.bgImage && (
        <div className="absolute inset-0 z-0">
          <img src={getMediaUrl(activeData.bgImage)} alt="Our People Background" className="w-full h-full object-cover opacity-20" />
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
        <div className="max-w-2xl text-left border-l border-white/60 pl-8 sm:pl-10 py-2 space-y-6">
          {/* Section Label */}
          <div className="text-gray-300 font-normal text-sm sm:text-base tracking-wide uppercase">
            {activeData.subheading || defaultPeopleData.subheading}
          </div>

          {/* Main Statement */}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-normal text-white leading-[1.35] tracking-tight whitespace-pre-line">
            {activeData.title || defaultPeopleData.title}
          </h2>

          {/* Let's Talk CTA Button */}
          <div className="pt-2">
            <Link
              to={activeData.buttonLink || '/contact'}
              className="inline-flex items-center gap-3 group text-white font-medium text-base sm:text-lg hover:text-white/90 transition-all duration-200"
            >
              <span>{activeData.buttonText || "Let's Talk"}</span>
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
