import React, { useState, useEffect } from 'react';
import { getClients } from '../../services/clientService';
import { getMediaUrl } from '../../utils/imageUrl';

const defaultHeading = 'Trusted by fast growing startups';

export default function PortfolioTrustedClients() {
  const [heading, setHeading] = useState(defaultHeading);
  const [clientsList, setClientsList] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5000/api/home-content/portfolio-clients').then((r) => r.json()).catch(() => null),
      getClients().catch(() => [])
    ]).then(([headerRes, clientsData]) => {
      if (headerRes && headerRes.success && headerRes.content && headerRes.content.heading) {
        setHeading(headerRes.content.heading);
      }
      if (Array.isArray(clientsData)) {
        setClientsList(clientsData);
      }
    });
  }, []);

  return (
    <section className="w-full bg-white py-12 sm:py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black tracking-tight">
            {heading || defaultHeading}
          </h2>
        </div>

        {/* All 6 Logos in Single Horizontal Line */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 items-center justify-center justify-items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-7xl mx-auto">
          {clientsList.map((client) => (
            <div
              key={client.id || client._id}
              className="flex items-center justify-center p-2 transition-transform duration-200 hover:scale-105 w-full"
              title={client.name}
            >
              {client.logo ? (
                <img
                  src={getMediaUrl(client.logo)}
                  alt={client.name || 'Client Logo'}
                  className="h-14 sm:h-16 md:h-20 lg:h-24 w-full max-w-[150px] sm:max-w-[170px] md:max-w-[190px] object-contain transition-all duration-200 drop-shadow-sm mx-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-sm font-bold text-gray-900 tracking-tight text-center">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
