import React, { useEffect } from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import { Link } from 'react-router-dom';

export default function GenericPlaceholder({ title }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 max-w-md mb-8">
          This section is part of the CityScene Global platform. Explore our full suite of services on our main services page.
        </p>
        <Link
          to="/services"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Go to Services Page
        </Link>
      </main>
      <Footer />
    </div>
  );
}
