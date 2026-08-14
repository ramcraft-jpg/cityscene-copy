import React, { useEffect } from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

export default function ContactPlaceholder() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Let's discuss how CityScene Global can elevate your business.
          </p>
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 text-left space-y-4">
            <div>
              <p className="font-semibold text-gray-900">India Office:</p>
              <p className="text-gray-600">S.P Tower, 150, Sirsi Rd, Jaipur, Rajasthan, India</p>
              <p className="text-gray-600">+91 7689999377</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">UAE Office:</p>
              <p className="text-gray-600">+971 528225509</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Email:</p>
              <p className="text-gray-600">info@citysceneglobal.com</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
