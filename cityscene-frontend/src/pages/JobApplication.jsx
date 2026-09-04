import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import { jobsData } from '../data/jobs';
import { submitJobApplication } from '../services/applicationService';
import { getJobs } from '../services/jobService';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function JobApplication() {
  const { jobId } = useParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    position: '',
    resume: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const [availableJobs, setAvailableJobs] = useState(jobsData);

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobs()
      .then((jobsList) => {
        if (jobsList && Array.isArray(jobsList)) {
          setAvailableJobs(jobsList);
          if (jobId) {
            const selectedJob = jobsList.find((j) => j.id === jobId);
            if (selectedJob) {
              setFormData((prev) => ({ ...prev, position: selectedJob.title }));
            }
          }
        }
      })
      .catch((err) => console.error('Error fetching jobs for application form:', err));

    if (jobId) {
      const selectedJob = jobsData.find((j) => j.id === jobId);
      if (selectedJob) {
        setFormData((prev) => ({ ...prev, position: selectedJob.title }));
      }
    }
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData((prev) => ({ ...prev, resume: files[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required.';
    if (!formData.position.trim() || formData.position === 'Select Position') {
      newErrors.position = 'Please select a position.';
    }
    if (!formData.resume) newErrors.resume = 'Please upload your resume.';
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
      const res = await submitJobApplication(formData);
      setStatusMessage({ type: 'success', text: res.message });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
        position: '',
        resume: null
      });
      setErrors({});
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow relative">
        {/* Full-width Background Image (Clean without black shadow overlay) */}
        <div className="relative w-full min-h-[550px] lg:min-h-[650px] bg-gray-100 overflow-hidden py-10 md:py-14 flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
              alt="Office collaboration backdrop"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full flex justify-start">
            <div className="w-full max-w-md space-y-6">
              <div className="text-left">
                <Link
                  to="/career"
                  className="inline-flex items-center gap-2 text-sm text-gray-800 hover:text-black bg-white/95 hover:bg-white px-5 py-2.5 rounded-full shadow-lg transition-all duration-200 font-medium"
                >
                  <ArrowLeft size={16} /> Back to Career
                </Link>
              </div>

              {/* Apply Online White Form Card (Side Aligned) */}
              <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 text-gray-900">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-left">
                  Apply Online
                </h2>

                {statusMessage && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium mb-6 flex items-start gap-2 ${
                      statusMessage.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Your Message */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Your Message:
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none"
                    />
                  </div>

                  {/* Position Dropdown */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Position:
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm bg-white text-gray-700"
                    >
                      <option value="">Select Position</option>
                      {availableJobs.map((job) => (
                        <option key={job.id || job._id} value={job.title}>
                          {job.title}
                        </option>
                      ))}
                    </select>
                    {errors.position && (
                      <p className="text-xs text-red-500 mt-1">{errors.position}</p>
                    )}
                  </div>

                  {/* Upload Resume */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Upload Resume:
                    </label>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 border border-gray-200 rounded-lg p-1"
                    />
                    {errors.resume && (
                      <p className="text-xs text-red-500 mt-1">{errors.resume}</p>
                    )}
                  </div>

                  {/* Submit & Continue Button */}
                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-medium text-sm transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit & Continue'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
