import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent } from '../../../services/homeContentService';

export default function AdminHomeTestimonials() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    heading: 'What People Are Saying?',
    testimonials: []
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const content = await getHomeSectionContent('testimonials');
      if (content && content.testimonials) {
        setFormData(content);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load Home Testimonials content.' });
    } finally {
      setLoading(false);
    }
  };

  const handleTestimonialChange = (index, field, value) => {
    const updated = [...formData.testimonials];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, testimonials: updated });
  };

  const handleAddTestimonial = () => {
    const newItem = {
      id: Date.now(),
      quote: '"A game-changer for my business. Thank you!"',
      author: 'Client Company Name'
    };
    setFormData({ ...formData, testimonials: [...formData.testimonials, newItem] });
  };

  const handleDeleteTestimonial = (index) => {
    if (formData.testimonials.length <= 1) {
      alert('At least one testimonial quote is required.');
      return;
    }
    const updated = formData.testimonials.filter((_, idx) => idx !== index);
    setFormData({ ...formData, testimonials: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('testimonials', formData);
      setMessage({ type: 'success', text: 'Home Testimonials updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Home Testimonials.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Home Testimonials management...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">HOME TESTIMONIALS MANAGEMENT</h1>
        <p className="text-xs text-slate-500 font-medium">Manage testimonial marquee quotes, authors, and client reviews on Home Page.</p>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs underline font-normal">Dismiss</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section Heading */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <label className="block text-xs font-bold text-slate-700 mb-1">Section Heading</label>
          <input
            type="text"
            value={formData.heading || ''}
            onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>

        {/* Testimonials List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Featured Testimonials ({formData.testimonials.length})</h2>
            <button
              type="button"
              onClick={handleAddTestimonial}
              className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow transition"
            >
              + Add Testimonial
            </button>
          </div>

          {formData.testimonials.map((item, idx) => (
            <div key={item.id || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                  Review #{idx + 1}
                </span>
                {formData.testimonials.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteTestimonial(idx)}
                    className="text-xs font-bold text-red-600 hover:text-red-800"
                  >
                    Delete Review
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quote Text</label>
                <textarea
                  rows="2"
                  value={item.quote || ''}
                  onChange={(e) => handleTestimonialChange(idx, 'quote', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  placeholder='"Write testimonial quote here"'
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Author / Company Name</label>
                <input
                  type="text"
                  value={item.author || ''}
                  onChange={(e) => handleTestimonialChange(idx, 'author', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  placeholder="e.g. EsunScope"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 rounded-xl shadow-lg transition"
          >
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
