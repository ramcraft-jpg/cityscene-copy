import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent } from '../../../services/homeContentService';

export default function AdminHomeTransformation() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    badge: 'Digital Leadership',
    heading: 'Transformation starts here',
    subtitle: 'Reimagine your future.',
    description: '',
    features: [
      'Exciting global opportunities',
      'AI & smart tech innovation',
      'Career growth & learning.'
    ],
    buttonText: 'Connect With Us',
    buttonLink: '/contact'
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const content = await getHomeSectionContent('transformation');
      if (content && content.heading) {
        setFormData(content);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load Home Transformation content.' });
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData({ ...formData, features: updated });
  };

  const handleAddFeature = () => {
    setFormData({ ...formData, features: [...formData.features, 'New feature bullet point'] });
  };

  const handleDeleteFeature = (index) => {
    if (formData.features.length <= 1) {
      alert('At least one bullet point is required.');
      return;
    }
    const updated = formData.features.filter((_, idx) => idx !== index);
    setFormData({ ...formData, features: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('transformation', formData);
      setMessage({ type: 'success', text: 'Home Transformation updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Home Transformation.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Home Transformation management...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">HOME TRANSFORMATION MANAGEMENT</h1>
        <p className="text-xs text-slate-500 font-medium">Manage bottom digital leadership CTA banner, features list, text & contact link.</p>
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

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tagline Badge</label>
            <input
              type="text"
              value={formData.badge || ''}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Section Heading</label>
            <input
              type="text"
              value={formData.heading || ''}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle Line</label>
          <input
            type="text"
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Right Column Paragraph</label>
          <textarea
            rows="3"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>

        {/* Features Bullet Points */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-700">Feature Bullet Points ({formData.features.length})</label>
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-3 py-1 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded shadow"
            >
              + Add Bullet Point
            </button>
          </div>

          <div className="space-y-2">
            {formData.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-orange-500 font-bold">✓</span>
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => handleFeatureChange(idx, e.target.value)}
                  className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg"
                  required
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteFeature(idx)}
                    className="text-xs font-bold text-red-600 hover:text-red-800 px-2 py-1"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
            <input
              type="text"
              value={formData.buttonText || ''}
              onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Button Link</label>
            <input
              type="text"
              value={formData.buttonLink || ''}
              onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
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
