import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';

export default function AdminHomeClientAdoption() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    badge: 'Our Process',
    heading: 'How do we serve the client',
    paragraph1: '',
    paragraph2: '',
    image: '/assets/home/adoption/adoption-1.jpg',
    buttonText: 'View All Topics',
    buttonLink: '/services'
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const content = await getHomeSectionContent('client-adoption');
      if (content && content.heading) {
        setFormData(content);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load Home Client Adoption content.' });
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileUrl = await uploadHomeMedia(file);
      setFormData({ ...formData, image: fileUrl });
      setMessage({ type: 'success', text: 'Client adoption image uploaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Image upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('client-adoption', formData);
      setMessage({ type: 'success', text: 'Home Client Adoption updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Home Client Adoption.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Home Client Adoption management...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">HOME CLIENT ADOPTION MANAGEMENT</h1>
        <p className="text-xs text-slate-500 font-medium">Manage client consultation process, paragraphs, side visual image and action button.</p>
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
          <label className="block text-xs font-bold text-slate-700 mb-1">Paragraph 1</label>
          <textarea
            rows="4"
            value={formData.paragraph1 || ''}
            onChange={(e) => setFormData({ ...formData, paragraph1: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Paragraph 2</label>
          <textarea
            rows="4"
            value={formData.paragraph2 || ''}
            onChange={(e) => setFormData({ ...formData, paragraph2: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>

        {/* Section Image */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Consultation Image</label>
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="w-36 h-28 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              <img
                src={formData.image}
                alt="Client Adoption Preview"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = formData.fallbackImage || 'https://via.placeholder.com/300x200'; }}
              />
            </div>
            <div className="flex-1 space-y-2 w-full">
              <input
                type="text"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
              />
              <label className="cursor-pointer px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition inline-block">
                {uploading ? 'Uploading...' : 'Replace Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMediaUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
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
