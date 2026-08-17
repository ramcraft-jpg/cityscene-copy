import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import AdminHeroMediaControl from '../../../components/admin/AdminHeroMediaControl';

export default function AdminHomeCommitment() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    badge: 'Partnering For Growth',
    heading: 'Our Commitment',
    description: '',
    videoSrc: '/assets/home/commitment/commitment-video.mp4',
    posterSrc: '/assets/home/commitment/commitment-bg.jpg',
    buttonText: 'Learn More',
    buttonLink: '/about'
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const content = await getHomeSectionContent('commitment');
      if (content && content.heading) {
        setFormData(content);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load Home Commitment content.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploadingVideo(true);
      const fileUrl = await uploadHomeMedia(file);
      setFormData({ ...formData, videoSrc: fileUrl });
      setMessage({ type: 'success', text: 'Video uploaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Video upload failed.' });
    } finally {
      setUploadingVideo(false);
    }
  };

  const handlePosterUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploadingPoster(true);
      const fileUrl = await uploadHomeMedia(file);
      setFormData({ ...formData, posterSrc: fileUrl });
      setMessage({ type: 'success', text: 'Poster image uploaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Poster upload failed.' });
    } finally {
      setUploadingPoster(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('commitment', formData);
      setMessage({ type: 'success', text: 'Home Commitment updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Home Commitment.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Home Commitment management...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">HOME COMMITMENT MANAGEMENT</h1>
        <p className="text-xs text-slate-500 font-medium">Manage commitment headline, description, background video, poster image & link.</p>
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
          <label className="block text-xs font-bold text-slate-700 mb-1">Description Paragraph</label>
          <textarea
            rows="3"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            required
          />
        </div>

        {/* Background Media Management */}
        <AdminHeroMediaControl
          mediaType={formData.backgroundMediaType || (formData.videoSrc || formData.backgroundVideo ? 'video' : 'image')}
          imageUrl={formData.posterSrc || formData.backgroundImage || ''}
          videoUrl={formData.videoSrc || formData.backgroundVideo || ''}
          onChangeMediaType={(type) => setFormData({ ...formData, backgroundMediaType: type })}
          onChangeImage={(url) => setFormData({ ...formData, posterSrc: url, backgroundImage: url })}
          onChangeVideo={(url) => setFormData({ ...formData, videoSrc: url, backgroundVideo: url })}
          uploading={uploadingVideo || uploadingPoster}
          onUpload={async (file, type) => {
            if (!file) return;
            try {
              if (type === 'video') {
                setUploadingVideo(true);
                const fileUrl = await uploadHomeMedia(file);
                setFormData((prev) => ({ ...prev, videoSrc: fileUrl, backgroundVideo: fileUrl, backgroundMediaType: 'video' }));
              } else {
                setUploadingPoster(true);
                const fileUrl = await uploadHomeMedia(file);
                setFormData((prev) => ({ ...prev, posterSrc: fileUrl, backgroundImage: fileUrl, backgroundMediaType: 'image' }));
              }
              setMessage({ type: 'success', text: 'Media uploaded successfully.' });
            } catch (err) {
              setMessage({ type: 'error', text: err.message || 'Media upload failed.' });
            } finally {
              setUploadingVideo(false);
              setUploadingPoster(false);
            }
          }}
          onRemoveMedia={(type) => {
            if (type === 'video') {
              setFormData({ ...formData, videoSrc: '', backgroundVideo: '', backgroundMediaType: 'image' });
            } else {
              setFormData({ ...formData, posterSrc: '', backgroundImage: '' });
            }
          }}
        />

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
