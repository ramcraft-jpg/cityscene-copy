import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent } from '../../../services/homeContentService';

export default function AdminContactMap() {
  const [data, setData] = useState({
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.513233887208!2d75.72754637604473!3d26.9189874591522!2m3!1f00!2f00!3f00!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db350106fffff%3A0x8670fa929d91fbd0!2sSirsi%20Rd%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    directMapLink: 'https://maps.google.com/?q=S.P+Tower,+Sirsi+Rd,+Jaipur,+Rajasthan',
    buttonText: 'Open in Maps'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getHomeSectionContent('contact-map');
      if (res && res.mapEmbedUrl) {
        setData(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('contact-map', data);
      setMessage({ type: 'success', text: 'Google Map settings updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update map settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Map Settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>🗺️</span> ContactMap Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage Google Maps iframe embed URL, direct map link, and button overlay text.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-sm ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs underline font-normal">Dismiss</button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps Embed URL (iframe src)</label>
          <textarea
            rows="3"
            value={data.mapEmbedUrl || ''}
            onChange={(e) => setData({ ...data, mapEmbedUrl: e.target.value })}
            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg font-mono"
            placeholder="https://www.google.com/maps/embed?pb=..."
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Direct Google Maps Link URL</label>
          <input
            type="text"
            value={data.directMapLink || ''}
            onChange={(e) => setData({ ...data, directMapLink: e.target.value })}
            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg font-mono"
            placeholder="https://maps.google.com/?q=..."
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Overlay Button Label</label>
          <input
            type="text"
            value={data.buttonText || ''}
            onChange={(e) => setData({ ...data, buttonText: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            placeholder="Open in Maps"
            required
          />
        </div>

        {/* Live Preview */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Live Map Preview</label>
          <div className="h-64 rounded-xl overflow-hidden border border-slate-300 bg-slate-100">
            <iframe
              title="Map Preview"
              src={data.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition"
          >
            {saving ? 'Saving...' : 'Save Map Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
