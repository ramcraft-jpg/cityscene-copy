import React, { useState } from 'react';
import { submitCareerContact } from '../services/contactService';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await submitCareerContact(formData);
      setStatusMessage({ type: 'success', text: response.message });
      setFormData({ fullName: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-[#303030] text-white py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching Screenshot 2 */}
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-3">
            Contact Us
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            Have questions? Get in touch with us.
          </p>
        </div>

        {/* Contact Form matching Screenshot 2 */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5" noValidate>
          {statusMessage && (
            <div
              className={`p-4 rounded-lg text-sm font-medium text-center ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="sr-only">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-5 py-3.5 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-base"
            />
            {errors.fullName && (
              <p className="text-xs text-red-400 mt-1 pl-1 text-left">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-5 py-3.5 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-base"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1 pl-1 text-left">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-5 py-3.5 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-base"
            />
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1 pl-1 text-left">{errors.phone}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              className="w-full px-5 py-3.5 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-base resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-12 py-3 rounded-full bg-white text-gray-900 font-bold text-base hover:bg-gray-100 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
