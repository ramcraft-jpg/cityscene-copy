import React, { useState, useEffect } from 'react';

const defaultIntro = {
  heading: 'How can we\nassist you today?',
  description: "We're here to assist you! Let us know your requirements, and we'll connect you with the right IT experts to deliver the best solutions.",
  badgeText: 'REACH US OUT'
};

export default function ContactIntro() {
  const [data, setData] = useState(defaultIntro);

  useEffect(() => {
    fetch('http://localhost:5000/api/home-content/contact-intro')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching ContactIntro API data:', err));
  }, []);

  return (
    <section className="w-full bg-[#0a0a0a] text-white py-6 md:py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left & Right Text Layout */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 lg:gap-12 mb-4">
          {/* Left Main Heading */}
          <div className="flex-1 max-w-lg">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight whitespace-pre-line">
              {data.heading || defaultIntro.heading}
            </h2>
          </div>

          {/* Vertical Divider Line */}
          <div className="hidden md:block w-[2px] h-14 bg-white/80 flex-shrink-0" />

          {/* Right Supporting Text */}
          <div className="flex-1 max-w-xl">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              {data.description || defaultIntro.description}
            </p>
          </div>
        </div>

        {/* Horizontal Line with Centered "REACH US OUT" Badge */}
        <div className="relative flex items-center justify-center pt-2">
          <div className="w-full h-[1px] bg-white/20 absolute inset-0 top-1/2 -translate-y-1/2" />
          <span className="relative z-10 bg-[#0a0a0a] px-5 text-xs font-bold tracking-widest text-white uppercase">
            {data.badgeText || defaultIntro.badgeText}
          </span>
        </div>
      </div>
    </section>
  );
}
