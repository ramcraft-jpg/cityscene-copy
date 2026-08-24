import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import { getMediaUrl } from '../../../utils/imageUrl';

export default function AdminBlogContent() {
  const [data, setData] = useState({
    heading: 'Technology is evolving rapidly - are you keeping up?',
    description: 'Dive into our latest articles covering AI, cloud computing, cybersecurity, data analytics, and emerging technologies to stay informed, enhance your digital strategy, and maintain a competitive edge in the ever-evolving tech landscape.',
    image: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getHomeSectionContent('blog-intro');
      if (res && res.heading) {
        setData(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const fileUrl = await uploadHomeMedia(file);
      setData((prev) => ({ ...prev, image: fileUrl }));
      setMessage({ type: 'success', text: 'Media uploaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Media upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('blog-intro', data);
      setMessage({ type: 'success', text: 'Blog Introduction section updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update section.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Blog Introduction Settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>💡</span> BlogContent Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage Technology Introduction section main title, supporting paragraph, and section image.
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
          <label className="block text-xs font-bold text-slate-700 mb-1">Section Main Heading</label>
          <textarea
            rows="3"
            value={data.heading || ''}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-semibold"
            placeholder="Technology is evolving rapidly..."
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Supporting Paragraph</label>
          <textarea
            rows="4"
            value={data.description || ''}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            placeholder="Dive into our latest articles covering..."
            required
          />
        </div>

        {/* Section Feature Image */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Section Image (Optional)</label>
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
            {data.image ? (
              <div className="w-36 h-20 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300">
                <img src={getMediaUrl(data.image)} alt="Blog Intro Feature" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-36 h-20 rounded-lg bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-semibold shrink-0">
                No Image Set
              </div>
            )}
            <div className="flex-1 space-y-2 w-full">
              <input
                type="text"
                value={data.image || ''}
                onChange={(e) => setData({ ...data, image: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                placeholder="Image URL (optional)"
              />
              <div className="flex gap-2">
                <label className="cursor-pointer px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition inline-block">
                  {uploading ? 'Uploading...' : 'Replace / Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMediaUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                {data.image && (
                  <button
                    type="button"
                    onClick={() => setData({ ...data, image: '' })}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold rounded-lg transition"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition"
          >
            {saving ? 'Saving...' : 'Save Intro Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
