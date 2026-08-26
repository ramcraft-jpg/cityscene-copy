import React, { useState, useEffect } from 'react';
import { getServices } from '../../services/serviceService';
import WhatWeDoCard from './WhatWeDoCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function WhatWeDoGrid() {
  const [showAll, setShowAll] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getServices()
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[WhatWeDoGrid Error]:', err);
        setError(err.message || 'Failed to load services.');
        setLoading(false);
      });
  }, []);

  // Initial display shows 6 cards, expand to all 12 when "View More" is toggled
  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <section className="w-full bg-[#1a1a1a] text-white py-12 sm:py-16 px-5 sm:px-[40px] text-center">
      <div className="max-w-[1100px] mx-auto w-full">
        {/* Section Heading */}
        <div className="text-left">
          <h2 className="text-3xl sm:text-[40px] font-medium text-white tracking-tight mb-6 ml-0 sm:ml-[10px]">
            Our Services
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center text-white">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-medium">Loading services from database...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="py-12 text-center text-red-400 bg-red-900/20 rounded-2xl border border-red-800/40 p-6">
            <p className="font-semibold text-lg mb-2">Unable to load services</p>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* 3-Column Service Cards Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
              {displayedServices.map((service, idx) => (
                <WhatWeDoCard key={service.id || service._id} service={service} index={idx} />
              ))}
            </div>

            {/* View More / View Less Toggle Button */}
            {services.length > 6 && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[25px] bg-transparent hover:bg-white hover:text-black text-white font-medium text-sm sm:text-base border-2 border-white transition-all duration-300 shadow-md"
                >
                  <span>{showAll ? 'View Less Services' : 'View More Services'}</span>
                  {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
