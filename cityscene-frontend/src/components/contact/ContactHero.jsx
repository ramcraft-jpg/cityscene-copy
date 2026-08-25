import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactForm } from '../../services/contactService';
import { getMediaUrl } from '../../utils/imageUrl';
import { useVideoIntersectionObserver } from '../../utils/useVideoIntersectionObserver';

const defaultHero = {
  subheading: "LET'S TALK",
  title: 'Contact\nUs',
  description: 'Bridging The Gap Between Ideas & Execution, Contact Us Today.',
  bgImage: '/assets/images/contact-hero.jpg',
  bgVideo: ''
};

export default function ContactHero() {
  const [heroData, setHeroData] = useState(defaultHero);
  const videoRef = useVideoIntersectionObserver({ threshold: 0.15 });

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
    fetch('http://localhost:5000/api/home-content/contact-hero')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content && resData.content.title) {
          setHeroData(resData.content);
        }
      })
      .catch((err) => console.error('Error fetching ContactHero API data:', err));
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

  const bgImage = getMediaUrl(heroData.bgImage || heroData.backgroundImage || defaultHero.bgImage);
  const bgVideo = getMediaUrl(heroData.bgVideo || heroData.backgroundVideo);
  const isVideoMode = heroData.backgroundMediaType === 'video' || (heroData.backgroundMediaType !== 'image' && !!bgVideo);

  return (
    <section className="group relative w-full bg-[#1c1917] text-white min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center py-12 lg:py-16 overflow-hidden">
      {/* Background Overhead Image / Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isVideoMode && bgVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={bgImage}
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
            src={bgVideo}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : null}

        {(!isVideoMode || !bgVideo) && (
          <img
            src={bgImage}
            alt="Contact Us Background"
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        )}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-700 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading and Messaging */}
          <div className="lg:col-span-6 text-left">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white mb-2">
              {heroData.subheading || defaultHero.subheading}
            </div>

            {/* Horizontal Line under Subheading matching reference width */}
            <div className="w-full max-w-[340px] sm:max-w-[380px] h-[1.5px] bg-white/90 mb-5" />

            <h1
              className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-white tracking-tight leading-[1.05] mb-4 whitespace-pre-line"
              style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
            >
              {heroData.title || defaultHero.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal max-w-[340px] sm:max-w-[380px]">
              {heroData.description || defaultHero.description}
            </p>
          </div>

          {/* Right Column: Dark Floating Form Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] bg-[#333333]/85 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/10 text-white">
              
              {status === 'success' && (
                <div className="mb-4 p-3.5 rounded-xl bg-green-900/40 border border-green-500/50 flex items-start gap-3 text-green-200 text-xs sm:text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{successMessage}</p>
                    <p className="text-[11px] text-green-300 mt-0.5 font-normal">
                      Our IT experts will get back to you shortly.
                    </p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-4 p-3.5 rounded-xl bg-red-900/40 border border-red-500/50 flex items-center gap-3 text-red-200 text-xs sm:text-sm">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="font-medium">Something went wrong. Please try submitting again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-white mb-1 tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full px-5 py-2.5 rounded-full bg-[#464646]/90 border text-sm text-white placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                        : 'border-transparent focus:ring-2 focus:ring-cyan-400'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-[11px] text-red-400 font-normal flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-white mb-1 tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full px-5 py-2.5 rounded-full bg-[#464646]/90 border text-sm text-white placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                        : 'border-transparent focus:ring-2 focus:ring-cyan-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-red-400 font-normal flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone No */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-white mb-1 tracking-wide">
                    Phone No
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={`w-full px-5 py-2.5 rounded-full bg-[#464646]/90 border text-sm text-white placeholder-gray-400 focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                        : 'border-transparent focus:ring-2 focus:ring-cyan-400'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-[11px] text-red-400 font-normal flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-white mb-1 tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    className={`w-full px-5 py-2.5 rounded-2xl bg-[#464646]/90 border text-sm text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                      errors.message
                        ? 'border-red-500 focus:ring-2 focus:ring-red-400'
                        : 'border-transparent focus:ring-2 focus:ring-cyan-400'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-red-400 font-normal flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Cyan/Teal Submit Button */}
                <div className="pt-1 flex justify-end">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-[#00bcd4] hover:bg-[#00acc1] text-white font-semibold text-xs sm:text-sm rounded-lg transition-all shadow-md active:scale-95 disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
