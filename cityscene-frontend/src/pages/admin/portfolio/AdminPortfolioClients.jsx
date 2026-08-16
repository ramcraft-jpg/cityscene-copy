import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent } from '../../../services/homeContentService';

export default function AdminPortfolioClients() {
  const [data, setData] = useState({
    heading: 'Trusted by fast growing startups',
    subtitle: 'Empowering innovative brands, enterprises, and high-growth ventures globally.'
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
      const res = await getHomeSectionContent('portfolio-clients');
      if (res && res.heading) {
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
      await updateHomeSectionContent('portfolio-clients', data);
      setMessage({ type: 'success', text: 'Portfolio Trusted Clients section updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update section.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Trusted Clients Settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>🤝</span> PortfolioClients Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage Trusted Clients section title and supporting subtitle text.
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
          <label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label>
          <input
            type="text"
            value={data.heading || ''}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            placeholder="Trusted by fast growing startups"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Supporting Subtitle</label>
          <textarea
            rows="2"
            value={data.subtitle || ''}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            placeholder="Empowering innovative brands..."
            required
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition"
          >
            {saving ? 'Saving...' : 'Save Clients Header Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
