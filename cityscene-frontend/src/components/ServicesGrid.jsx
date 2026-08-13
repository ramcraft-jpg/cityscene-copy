import React, { useState, useEffect } from 'react';
import { getServices } from '../services/serviceService';
import ServiceCard from './ServiceCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ServicesGrid() {
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
        console.error('[ServicesGrid Error]:', err);
        setError(err.message || 'Failed to load services.');
        setLoading(false);
      });
  }, []);

  // Initial display shows 6 cards, expand to all 12 when "View More" is toggled
  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <section className="w-full bg-[#171717] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-left mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl font-normal text-white tracking-tight">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedServices.map((service) => (
                <ServiceCard key={service.id || service._id} service={service} />
              ))}
            </div>

            {/* View More / View Less Toggle Button */}
            {services.length > 6 && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base border border-white/20 transition-all duration-300 transform hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
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
