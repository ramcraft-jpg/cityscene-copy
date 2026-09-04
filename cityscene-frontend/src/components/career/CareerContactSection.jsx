import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactForm } from '../../services/contactService';
import { flashApiFetch } from '../../config/api';

const defaultHeader = {
  heading: 'Contact Us',
  subtitle: 'Have questions? Get in touch with us.'
};

export default function CareerContactSection() {
  const [header, setHeader] = useState(defaultHeader);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    flashApiFetch('/home-content/career-contact')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.heading) {
          setHeader(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching CareerContactSection API data:', err));
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter a valid email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus('success');
        setSuccessMessage(result.message);
        setFormData({ fullName: '', email: '', phone: '', message: '' });
        setErrors({});
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="w-full bg-[#27272a] text-white py-12 lg:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-3">
          {header.heading || defaultHeader.heading}
        </h2>
        <p className="text-base sm:text-lg text-gray-300 mb-6">
          {header.subtitle || defaultHeader.subtitle}
        </p>

        {/* Success Banner */}
        {status === 'success' && (
          <div className="mb-6 p-4 rounded-xl bg-green-900/50 border border-green-500/50 flex items-start gap-3 text-green-200 text-sm text-left">
            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{successMessage}</p>
              <p className="text-xs text-green-300 mt-1">
                We'll get back to you shortly.
              </p>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {status === 'error' && (
          <div className="mb-6 p-4 rounded-xl bg-red-900/50 border border-red-500/50 flex items-center gap-3 text-red-200 text-sm text-left">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="font-semibold">Something went wrong. Please try submitting again.</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-left" noValidate>
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-5 py-3.5 rounded-lg bg-white text-gray-900 placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-white transition-all ${
                errors.fullName ? 'border-2 border-red-500' : 'border-0'
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-400 font-medium">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-5 py-3.5 rounded-lg bg-white text-gray-900 placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-white transition-all ${
                errors.email ? 'border-2 border-red-500' : 'border-0'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400 font-medium">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`w-full px-5 py-3.5 rounded-lg bg-white text-gray-900 placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-white transition-all ${
                errors.phone ? 'border-2 border-red-500' : 'border-0'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400 font-medium">{errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              className={`w-full p-5 rounded-lg bg-white text-gray-900 placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-white transition-all ${
                errors.message ? 'border-2 border-red-500' : 'border-0'
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400 font-medium">{errors.message}</p>
            )}
          </div>

          {/* White Pill Full Width Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-gray-100 text-gray-900 font-medium text-base shadow-md hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-gray-900" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
