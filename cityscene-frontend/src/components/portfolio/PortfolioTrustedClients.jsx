import React from 'react';
import clients from '../../data/clients';

export default function PortfolioTrustedClients() {
  return (
    <section className="w-full bg-[#f8f9fa] py-16 sm:py-20 border-t border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Trusted by fast growing startups
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Empowering innovative brands, enterprises, and high-growth ventures globally.
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-center justify-center">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-xl p-5 border border-gray-200/70 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col items-center justify-center text-center h-28 group"
            >
              {/* Logo Emblem Icon */}
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-blue-600 flex items-center justify-center mb-2.5 transition-colors">
                <span className="text-xs font-black text-gray-700 group-hover:text-white transition-colors">
                  {client.name.charAt(0)}
                </span>
              </div>

              {/* Client Name */}
              <span className="text-sm font-bold text-gray-900 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                {client.name}
              </span>

              {/* Client Subtitle */}
              <span className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                {client.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
