import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function WhatWeDoDetailFaq({ service }) {
  const [openFaq, setOpenFaq] = useState(null);

  if (!service || !service.faqs || service.faqs.length === 0) return null;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mb-8 tracking-tight">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3 text-left">
          {service.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-gray-50 hover:bg-gray-100/80 transition-colors font-semibold text-gray-900 text-base sm:text-lg"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="p-5 bg-white border-t border-gray-200 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
