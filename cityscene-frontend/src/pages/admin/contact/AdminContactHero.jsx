import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import AdminHeroMediaControl from '../../../components/admin/AdminHeroMediaControl';

export default function AdminContactHero() {
  const [data, setData] = useState({
    subheading: "LET'S TALK",
    title: 'Contact\nUs',
    description: 'Bridging The Gap Between Ideas & Execution, Contact Us Today.',
    bgImage: '/assets/images/contact-hero.jpg',
    bgVideo: ''
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
      const res = await getHomeSectionContent('contact-hero');
      if (res && res.title) {
        const mediaType = res.backgroundMediaType || (res.bgVideo || res.backgroundVideo ? 'video' : 'image');
        setData({ ...res, backgroundMediaType: mediaType });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e, fieldKey) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const fileUrl = await uploadHomeMedia(file);
      setData((prev) => ({ ...prev, [fieldKey]: fileUrl }));
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
      await updateHomeSectionContent('contact-hero', data);
      setMessage({ type: 'success', text: 'Contact Hero section updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Contact Hero.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Contact Hero Settings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>📞</span> ContactHero Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage contact hero eyebrow text, main title, supporting description, background image and video.
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
          <label className="block text-xs font-bold text-slate-700 mb-1">Eyebrow Label</label>
          <input
            type="text"
            value={data.subheading || ''}
            onChange={(e) => setData({ ...data, subheading: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            placeholder="LET'S TALK"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Main Heading</label>
          <textarea
            rows="2"
            value={data.title || ''}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-semibold"
            placeholder="Contact&#10;Us"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Supporting Description</label>
          <textarea
            rows="3"
            value={data.description || ''}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            placeholder="Bridging The Gap Between Ideas & Execution..."
            required
          />
        </div>

        {/* Background Media Management Component */}
        <AdminHeroMediaControl
          mediaType={data.backgroundMediaType || (data.bgVideo ? 'video' : 'image')}
          imageUrl={data.bgImage || data.backgroundImage || ''}
          videoUrl={data.bgVideo || data.backgroundVideo || ''}
          onChangeMediaType={(type) => setData({ ...data, backgroundMediaType: type })}
          onChangeImage={(url) => setData({ ...data, bgImage: url, backgroundImage: url, backgroundMediaType: 'image' })}
          onChangeVideo={(url) => setData({ ...data, bgVideo: url, backgroundVideo: url, backgroundMediaType: 'video' })}
          uploading={uploading}
          onUpload={async (file, type) => {
            if (!file) return;
            try {
              setUploading(true);
              const fileUrl = await uploadHomeMedia(file);
              if (type === 'video') {
                setData((prev) => ({ ...prev, bgVideo: fileUrl, backgroundVideo: fileUrl, backgroundMediaType: 'video' }));
              } else {
                setData((prev) => ({ ...prev, bgImage: fileUrl, backgroundImage: fileUrl, backgroundMediaType: 'image' }));
              }
              setMessage({ type: 'success', text: 'Media uploaded successfully.' });
            } catch (err) {
              setMessage({ type: 'error', text: err.message || 'Media upload failed.' });
            } finally {
              setUploading(false);
            }
          }}
          onRemoveMedia={(type) => {
            if (type === 'video') {
              setData({ ...data, bgVideo: '', backgroundVideo: '', backgroundMediaType: 'image' });
            } else {
              setData({ ...data, bgImage: '', backgroundImage: '' });
            }
          }}
        />

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition"
          >
            {saving ? 'Saving...' : 'Save Hero Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
