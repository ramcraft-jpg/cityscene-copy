import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import { getMediaUrl } from '../../../utils/imageUrl';

export default function AdminAboutContent() {
  const [data, setData] = useState({
    paragraph1: 'At CityScene Global Private Limited, we understand the challenges businesses face in navigating today’s fast-paced, technology-driven world. Many companies grapple with outdated infrastructure, slow system performance, and the complexity of managing multiple IT solutions—all while trying to keep up with the latest advancements in Automation, AI, and Blockchain. These obstacles can hinder growth, drain resources, and create inefficiencies that disrupt operations.',
    paragraph2: 'We are here to help. At CityScene Global, we specialize in delivering clear, practical, and customized IT solutions, leveraging cutting-edge technologies to empower your business. With more than Ten years of expertise, we have built a reputation as a trusted partner, providing innovative solutions that streamline processes, enhance productivity, and drive business success.',
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
      const res = await getHomeSectionContent('about-company');
      if (res && (res.paragraph1 || res.paragraph2)) {
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
      setMessage({ type: 'success', text: 'Image uploaded successfully.' });
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
      await updateHomeSectionContent('about-company', data);
      setMessage({ type: 'success', text: 'About Company content updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update content.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading About Content Settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>📖</span> AboutContent Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage company description paragraphs, challenges, and optional section image.
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
          <label className="block text-xs font-bold text-slate-700 mb-1">Company Paragraph 1 (Overview & Challenges)</label>
          <textarea
            rows="5"
            value={data.paragraph1 || ''}
            onChange={(e) => setData({ ...data, paragraph1: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Company Paragraph 2 (Solutions & 10+ Years Expertise)</label>
          <textarea
            rows="5"
            value={data.paragraph2 || ''}
            onChange={(e) => setData({ ...data, paragraph2: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            required
          />
        </div>

        {/* Section Image */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Section Image (Optional)</label>
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
            {data.image ? (
              <div className="w-36 h-20 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                <img src={getMediaUrl(data.image)} alt="Company Section Preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-36 h-20 rounded-lg bg-slate-200 flex items-center justify-center text-xs text-slate-400 font-semibold shrink-0">
                No Image
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

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition"
          >
            {saving ? 'Saving...' : 'Save Content Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
