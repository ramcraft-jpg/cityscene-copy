import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactForm } from '../../services/contactService';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [successMessage, setSuccessMessage] = useState('');

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
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
        Send Us a Message
      </h3>

      {/* Success Notification Banner */}
      {status === 'success' && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3 text-green-800 text-sm">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{successMessage}</p>
            <p className="text-xs text-green-700 mt-1 font-normal">
              We have received your details and will get in touch with you within 24 hours.
            </p>
          </div>
        </div>
      )}

      {/* Error Notification Banner */}
      {status === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-800 text-sm">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="font-medium">Something went wrong. Please try submitting again.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
              errors.fullName
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            }`}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-red-500 font-normal flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
                errors.email
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500 font-normal flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone No */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
              Phone No <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
                errors.phone
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              }`}
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-500 font-normal flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project or requirements..."
            className={`w-full p-4 rounded-xl border text-sm text-gray-900 bg-gray-50 focus:bg-white focus:outline-none transition-colors ${
              errors.message
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent'
            }`}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs text-red-500 font-normal flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl shadow-md hover:from-orange-600 hover:to-amber-600 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed text-base"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Submit</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
