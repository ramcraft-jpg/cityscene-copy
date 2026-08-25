import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function PortfolioDetailDemoModal({ isOpen, onClose, titleSystem, demoSubmitted, demoForm, setDemoForm, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {demoSubmitted ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h4 className="text-xl font-medium text-gray-900 mb-2">Demo Request Received!</h4>
            <p className="text-sm text-gray-600">
              Thank you for requesting a demo of <strong>{titleSystem}</strong>. Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">
              Request a Demo
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Schedule a personalized walk-through of {titleSystem}
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-800 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-800 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-800 mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={demoForm.company}
                  onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                  placeholder="Company Name"
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors mt-2"
              >
                Submit Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
