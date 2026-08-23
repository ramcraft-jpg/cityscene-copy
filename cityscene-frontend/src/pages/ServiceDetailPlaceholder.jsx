import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import WhatWeDoServiceDetail from '../components/whatwedo/WhatWeDoServiceDetail';
import { getServiceById } from '../services/serviceService';

export default function ServiceDetailPlaceholder() {
  const { serviceId, slug } = useParams();
  const targetId = serviceId || slug;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);

    getServiceById(targetId)
      .then((data) => {
        if (!data) {
          setError(`Service '${targetId}' not found.`);
        } else {
          setService(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('[ServiceDetail Error]:', err);
        setError(err.message || 'Failed to load service details.');
        setLoading(false);
      });
  }, [targetId]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. Header Navigation */}
      <Header />

      <main className="flex-grow">
        {loading && (
          <div className="py-24 text-center text-gray-700">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-medium">Loading service details from database...</p>
          </div>
        )}

        {error && !loading && (
          <div className="max-w-4xl mx-auto my-24 p-8 bg-red-50 rounded-2xl border border-red-200 text-center text-red-800">
            <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
            <p className="text-sm text-red-600 mb-6">{error}</p>
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-colors"
            >
              Back to All Services
            </Link>
          </div>
        )}

        {!loading && !error && service && (
          <WhatWeDoServiceDetail service={service} />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
