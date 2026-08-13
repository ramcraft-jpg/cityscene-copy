import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getServiceById } from '../services/serviceService';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ServiceDetailPlaceholder() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);

    getServiceById(serviceId)
      .then((data) => {
        setService(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[ServiceDetail Error]:', err);
        setError(err.message || 'Failed to load service details.');
        setLoading(false);
      });
  }, [serviceId]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
          <>
            {/* 2. Hero Section */}
            <section className="w-full bg-white py-12 md:py-20 border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Visual Image Container */}
                  <div className="lg:col-span-6 order-2 lg:order-1">
                    <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-gray-100 aspect-[4/3]">
                      <img
                        src={service.heroImage || service.image}
                        alt={service.displayTitle}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Right Column: Hero Information */}
                  <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
                    <div>
                      <span className="text-sm font-bold tracking-widest text-gray-800 uppercase block mb-1">
                        SERVICES
                      </span>
                      <div className="w-12 h-0.5 bg-gray-900 mb-6" />
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                      {service.displayTitle}
                    </h1>

                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                      {service.heroDesc || service.shortDesc}
                    </p>

                    <div className="pt-2">
                      <Link
                        to="/about"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-gray-900 text-gray-900 font-semibold text-sm hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-sm"
                      >
                        About Us
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Clean Intro Paragraphs Section */}
            {(service.introP1 || service.introP2) && (
              <section className="w-full bg-white py-14 md:py-20 border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-700 leading-relaxed text-base sm:text-lg space-y-6">
                  {service.introP1 && (
                    <p>
                      At <strong className="text-gray-900 font-semibold">CityScene Global</strong>, {service.introP1.replace(/^At CityScene Global,\s*/i, '')}
                    </p>
                  )}
                  {service.introP2 && <p>{service.introP2}</p>}
                </div>
              </section>
            )}

            {/* 4. Why Choose Us Section */}
            {service.whyChooseCards && service.whyChooseCards.length > 0 && (
              <section className="relative w-full bg-black text-white py-20 md:py-28 overflow-hidden border-t border-b border-white/10">
                <div className="absolute inset-0 z-0 opacity-20">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80"
                    alt="Background visual"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/85 to-black z-0 pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white inline-block relative pb-2">
                      Why <span className="underline decoration-white underline-offset-8">Choose</span> Us?
                    </h2>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      {service.whyChooseSubtitle || 'Empowering organizations with robust software solutions.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {service.whyChooseCards.map((card, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0b0b0b]/90 backdrop-blur-md border border-neutral-800 rounded-2xl p-8 text-left space-y-4 hover:border-neutral-600 transition-all duration-300 shadow-2xl min-h-[220px] flex flex-col justify-start"
                      >
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                          {card.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                          {card.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 5. Expertise Section */}
            {service.expertiseItems && service.expertiseItems.length > 0 && (
              <section className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-5 space-y-4">
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        {service.expertiseTitle || 'Our Expertise'}
                      </h2>
                      <div className="w-16 h-1 bg-gray-900 my-4" />
                      <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                        {service.expertiseSubtitle || 'Delivering high quality capabilities across domains.'}
                      </p>
                    </div>

                    <div className="lg:col-span-7 lg:border-l-2 lg:border-gray-900 lg:pl-12 space-y-8 text-left">
                      {service.expertiseItems.map((item, idx) => (
                        <div key={idx} className="space-y-2 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                            {item.title}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 6. Process Section */}
            {service.processSteps && service.processSteps.length > 0 && (
              <section className="w-full bg-gray-50 py-16 md:py-24 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                      {service.processTitle || 'Our Process'}
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg">
                      Structured, transparent, and result-oriented engineering workflows.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {service.processSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl p-8 border border-gray-200/80 shadow-sm relative text-left hover:shadow-md transition-shadow"
                      >
                        <span className="text-4xl font-extrabold text-orange-500/30 block mb-4">
                          0{idx + 1}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 7. FAQs Section */}
            {service.faqs && service.faqs.length > 0 && (
              <section className="w-full bg-white py-16 md:py-24 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-12 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4 text-left">
                    {service.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-xl overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between p-6 text-left bg-gray-50 hover:bg-gray-100/80 transition-colors font-bold text-gray-900 text-base sm:text-lg"
                        >
                          <span>{faq.q}</span>
                          {openFaq === idx ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {openFaq === idx && (
                          <div className="p-6 bg-white border-t border-gray-200 text-sm sm:text-base text-gray-600 leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
