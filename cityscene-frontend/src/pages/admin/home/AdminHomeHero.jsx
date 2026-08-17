import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import AdminHeroMediaControl from '../../../components/admin/AdminHeroMediaControl';

export default function AdminHomeHero() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    slides: [
      {
        id: 1,
        titleLine1: '',
        titleLine2: '',
        subtitle: '',
        backgroundMediaType: 'image',
        image: '',
        video: ''
      }
    ],
    button1Text: 'About Us',
    button1Link: '/about',
    button2Text: "Let's Talk",
    button2Link: '/contact'
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const content = await getHomeSectionContent('hero');
      if (content && content.slides) {
        setFormData(content);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load Home Hero content.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSlideChange = (index, field, value) => {
    const updatedSlides = [...formData.slides];
    updatedSlides[index] = { ...updatedSlides[index], [field]: value };
    setFormData({ ...formData, slides: updatedSlides });
  };

  const handleAddSlide = () => {
    const newSlide = {
      id: Date.now(),
      titleLine1: 'New Headline Title',
      titleLine2: 'Highlighted Subtitle',
      subtitle: 'Write short compelling description here.',
      backgroundMediaType: 'video',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-42866-large.mp4',
      image: '/assets/home/hero/hero-1.jpg'
    };
    setFormData({ ...formData, slides: [...formData.slides, newSlide] });
  };

  const handleDeleteSlide = (index) => {
    if (formData.slides.length <= 1) {
      alert('At least one slide is required.');
      return;
    }
    const updated = formData.slides.filter((_, idx) => idx !== index);
    setFormData({ ...formData, slides: updated });
  };

  const handleMediaUpload = async (index, file, targetType) => {
    if (!file) return;

    try {
      setUploadingIdx(index);
      const fileUrl = await uploadHomeMedia(file);
      const updatedSlides = [...formData.slides];
      const isVid = targetType === 'video' || file.type.startsWith('video/');

      if (isVid) {
        updatedSlides[index] = {
          ...updatedSlides[index],
          video: fileUrl,
          backgroundMediaType: 'video'
        };
      } else {
        updatedSlides[index] = {
          ...updatedSlides[index],
          image: fileUrl,
          backgroundMediaType: 'image'
        };
      }

      setFormData({ ...formData, slides: updatedSlides });
      setMessage({ type: 'success', text: `${isVid ? 'Video' : 'Image'} uploaded successfully.` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Media upload failed.' });
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleRemoveMedia = (index, targetType) => {
    const updatedSlides = [...formData.slides];
    if (targetType === 'video') {
      updatedSlides[index] = {
        ...updatedSlides[index],
        video: '',
        backgroundMediaType: 'image'
      };
    } else {
      updatedSlides[index] = {
        ...updatedSlides[index],
        image: ''
      };
    }
    setFormData({ ...formData, slides: updatedSlides });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('hero', formData);
      setMessage({ type: 'success', text: 'Home Hero updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Home Hero.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Home Hero management...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">HOME HERO MANAGEMENT</h1>
          <p className="text-xs text-slate-500 font-medium">Manage slides, headlines, background video & image media & CTA buttons for HomeHero section.</p>
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
        {/* Slides List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Hero Slides ({formData.slides.length})</h2>
            <button
              type="button"
              onClick={handleAddSlide}
              className="px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow transition"
            >
              + Add New Slide
            </button>
          </div>

          {formData.slides.map((slide, idx) => (
            <div key={slide.id || idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded border border-orange-100">
                  Slide #{idx + 1}
                </span>
                {formData.slides.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteSlide(idx)}
                    className="text-xs font-bold text-red-600 hover:text-red-800"
                  >
                    Delete Slide
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Heading (Line 1)</label>
                  <input
                    type="text"
                    value={slide.titleLine1 || ''}
                    onChange={(e) => handleSlideChange(idx, 'titleLine1', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="e.g. Transforming Visions"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Highlight (Line 2)</label>
                  <input
                    type="text"
                    value={slide.titleLine2 || ''}
                    onChange={(e) => handleSlideChange(idx, 'titleLine2', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="e.g. into Digital Realities"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={slide.subtitle || ''}
                  onChange={(e) => handleSlideChange(idx, 'subtitle', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Slide description text..."
                  required
                />
              </div>

              {/* Media Preview & Replacement Component */}
              <AdminHeroMediaControl
                mediaType={slide.backgroundMediaType || (slide.video ? 'video' : 'image')}
                imageUrl={slide.image || ''}
                videoUrl={slide.video || ''}
                onChangeMediaType={(type) => handleSlideChange(idx, 'backgroundMediaType', type)}
                onChangeImage={(url) => handleSlideChange(idx, 'image', url)}
                onChangeVideo={(url) => handleSlideChange(idx, 'video', url)}
                uploading={uploadingIdx === idx}
                onUpload={(file, type) => handleMediaUpload(idx, file, type)}
                onRemoveMedia={(type) => handleRemoveMedia(idx, type)}
              />
            </div>
          ))}
        </div>

        {/* Global CTA Buttons */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Hero CTA Buttons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Button Text</label>
              <input
                type="text"
                value={formData.button1Text || ''}
                onChange={(e) => setFormData({ ...formData, button1Text: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Button Link</label>
              <input
                type="text"
                value={formData.button1Link || ''}
                onChange={(e) => setFormData({ ...formData, button1Link: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Button Text</label>
              <input
                type="text"
                value={formData.button2Text || ''}
                onChange={(e) => setFormData({ ...formData, button2Text: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Secondary Button Link</label>
              <input
                type="text"
                value={formData.button2Link || ''}
                onChange={(e) => setFormData({ ...formData, button2Link: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              />
            </div>
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
