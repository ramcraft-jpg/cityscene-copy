import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import { getMediaUrl } from '../../../utils/imageUrl';

export default function AdminHomeServices() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    badge: 'What We Deliver',
    heading: 'Our Services',
    services: []
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const content = await getHomeSectionContent('services');
      if (content && content.services) {
        setFormData(content);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load Home Services content.' });
    } finally {
      setLoading(false);
    }
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setFormData({ ...formData, services: updatedServices });
  };

  const handleAddService = () => {
    const newService = {
      id: `service-${Date.now()}`,
      title: 'New Service Title',
      textPosition: 'bottom',
      image: '/assets/home/services/service-1.jpg'
    };
    setFormData({ ...formData, services: [...formData.services, newService] });
  };

  const handleDeleteService = (index) => {
    if (formData.services.length <= 1) {
      alert('At least one service card is required.');
      return;
    }
    const updated = formData.services.filter((_, idx) => idx !== index);
    setFormData({ ...formData, services: updated });
  };

  const handleMediaUpload = async (index, event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploadingIdx(index);
      const fileUrl = await uploadHomeMedia(file);
      handleServiceChange(index, 'image', fileUrl);
      setMessage({ type: 'success', text: 'Service card image uploaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Image upload failed.' });
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('services', formData);
      setMessage({ type: 'success', text: 'Home Services updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Home Services.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Home Services management...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">HOME SERVICES MANAGEMENT</h1>
        <p className="text-xs text-slate-500 font-medium">Manage featured services cards, titles, images, and section titles displayed on Home Page.</p>
      </div>

      {/* Single Source of Truth Notice */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent p-5 rounded-2xl border border-orange-200 text-slate-800 space-y-2">
        <div className="flex items-center gap-2 font-bold text-orange-950 text-sm">
          <span>⚡ Single Source of Truth for Services</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          The Home Page "Our Services" section automatically fetches service cards from the main <strong>What We Do Services API</strong>.
          Changing a service's title or <code>cardImage</code> in <strong>What We Do Services Cards</strong> automatically updates both <code>/services</code> and the Home Page.
        </p>
        <div className="pt-1">
          <a
            href="/admin/services/grid"
            className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline"
          >
            Go to What We Do Services Cards Management →
          </a>
        </div>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Section Titles */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Section Header</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Section Subtitle / Badge</label>
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
        </div>

        {/* Services Cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Service Cards ({formData.services.length})</h2>
            <button
              type="button"
              onClick={handleAddService}
              className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow transition"
            >
              + Add New Service Card
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formData.services.map((srv, idx) => (
              <div key={srv.id || idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded border border-orange-100">
                    Card #{idx + 1}
                  </span>
                  {formData.services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteService(idx)}
                      className="text-xs font-bold text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Title</label>
                  <input
                    type="text"
                    value={srv.title || ''}
                    onChange={(e) => handleServiceChange(idx, 'title', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Service ID / Slug</label>
                    <input
                      type="text"
                      value={srv.id || ''}
                      onChange={(e) => handleServiceChange(idx, 'id', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Text Overlay Position</label>
                    <select
                      value={srv.textPosition || 'bottom'}
                      onChange={(e) => handleServiceChange(idx, 'textPosition', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="bottom">Bottom</option>
                      <option value="top">Top</option>
                    </select>
                  </div>
                </div>

                {/* Service Card Image */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Image</label>
                  <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                      <img
                        src={getMediaUrl(srv.image)}
                        alt={srv.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = srv.fallback || 'https://via.placeholder.com/150'; }}
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={srv.image || ''}
                        onChange={(e) => handleServiceChange(idx, 'image', e.target.value)}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white"
                      />
                      <label className="cursor-pointer px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded transition inline-block">
                        {uploadingIdx === idx ? 'Uploading...' : 'Replace Image'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleMediaUpload(idx, e)}
                          disabled={uploadingIdx === idx}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
