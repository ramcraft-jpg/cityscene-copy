import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { servicesData } from '../data/services';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ServiceDetailPlaceholder() {
  const { serviceId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  const service = servicesData.find(
    (s) => s.id === serviceId || s.path.endsWith(`/${serviceId}`)
  ) || {
    displayTitle: serviceId ? serviceId.replace(/-/g, ' ').toUpperCase() : 'Service Detail',
    shortDesc: 'Comprehensive enterprise solutions tailored to elevate your business performance.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {/* Service Hero Banner */}
        <div className="relative bg-[#171717] text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img
              src={service.image}
              alt={service.displayTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Services
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              {service.displayTitle}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
              {service.shortDesc}
            </p>
          </div>
        </div>

        {/* Detail Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                At CityScene Global, our {service.displayTitle} offerings leverage cutting-edge methodologies and modern technology architectures to drive transformative outcomes.
              </p>
              <h3 className="text-xl font-bold text-gray-900 pt-4">Key Capabilities</h3>
              <ul className="space-y-3">
                {[
                  'Scalable, robust enterprise architecture',
                  'High availability & cloud deployment integration',
                  'Custom tailored workflows for maximum ROI',
                  '24/7 dedicated engineering support & maintenance'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle size={20} className="text-orange-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar CTA */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 h-fit">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to transform your business?</h3>
              <p className="text-gray-600 text-sm mb-6">
                Consult with our expert engineering team for custom pricing and architectural scope.
              </p>
              <Link
                to="/contact"
                className="block w-full text-center py-3 px-6 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium transition-colors"
              >
                Let's Talk
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
