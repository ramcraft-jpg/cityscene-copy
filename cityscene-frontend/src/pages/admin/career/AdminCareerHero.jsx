import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import { getMediaUrl, handleImageError } from '../../../utils/imageUrl';

const isVideoUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const clean = url.split('?')[0].toLowerCase();
  return (
    clean.endsWith('.mp4') ||
    clean.endsWith('.webm') ||
    clean.endsWith('.mov') ||
    clean.endsWith('.avi') ||
    clean.endsWith('.mkv') ||
    clean.endsWith('.m4v') ||
    clean.includes('.mp4') ||
    clean.includes('/videos/') ||
    clean.includes('/video/') ||
    clean.includes('youtube.com') ||
    clean.includes('youtu.be') ||
    clean.includes('vimeo.com')
  );
};

export const getEmbedVideoUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (trimmed.includes('youtube.com/watch')) {
    try {
      const urlObj = new URL(trimmed);
      const videoId = urlObj.searchParams.get('v');
      if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0`;
    } catch (e) {}
  }
  if (trimmed.includes('youtu.be/')) {
    const videoId = trimmed.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0`;
  }
  if (trimmed.includes('vimeo.com/')) {
    const videoId = trimmed.split('vimeo.com/')[1]?.split('?')[0];
    if (videoId) return `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0`;
  }
  return trimmed;
};

export default function AdminCareerHero() {
  const [data, setData] = useState({
    title: 'Join Our Team',
    description: 'Find exciting career opportunities with us.',
    buttonText: 'Explore Jobs',
    buttonLink: '#jobs',
    backgroundMediaType: 'image',
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    backgroundImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    bgVideo: '',
    backgroundVideo: ''
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
      const res = await getHomeSectionContent('career-hero');
      if (res) {
        const rawVideo = res.bgVideo || res.backgroundVideo || '';
        const rawImage = res.bgImage || res.backgroundImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80';
        const detectedMode = res.backgroundMediaType || (rawVideo ? 'video' : 'image');

        setData({
          title: res.title || 'Join Our Team',
          description: res.description || 'Find exciting career opportunities with us.',
          buttonText: res.buttonText || 'Explore Jobs',
          buttonLink: res.buttonLink || '#jobs',
          backgroundMediaType: detectedMode,
          bgImage: rawImage,
          backgroundImage: rawImage,
          bgVideo: rawVideo,
          backgroundVideo: rawVideo
        });
      }
    } catch (err) {
      console.error('Error loading Career Hero settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e, targetType) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileUrl = await uploadHomeMedia(file);

      if (targetType === 'video') {
        setData((prev) => ({
          ...prev,
          bgVideo: fileUrl,
          backgroundVideo: fileUrl,
          backgroundMediaType: 'video'
        }));
      } else {
        setData((prev) => ({
          ...prev,
          bgImage: fileUrl,
          backgroundImage: fileUrl,
          backgroundMediaType: 'image'
        }));
      }
      setMessage({ type: 'success', text: `Career ${targetType === 'video' ? 'video' : 'image'} uploaded successfully.` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Media upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveMedia = (targetType) => {
    if (targetType === 'video') {
      setData((prev) => ({
        ...prev,
        bgVideo: '',
        backgroundVideo: '',
        backgroundMediaType: 'image'
      }));
    } else {
      setData((prev) => ({
        ...prev,
        bgImage: '',
        backgroundImage: ''
      }));
    }
    setMessage({ type: 'success', text: `Background ${targetType} removed.` });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);

      const payload = {
        title: data.title,
        description: data.description,
        buttonText: data.buttonText,
        buttonLink: data.buttonLink,
        backgroundMediaType: data.backgroundMediaType,
        bgImage: data.bgImage || data.backgroundImage || '',
        backgroundImage: data.bgImage || data.backgroundImage || '',
        bgVideo: data.bgVideo || data.backgroundVideo || '',
        backgroundVideo: data.bgVideo || data.backgroundVideo || ''
      };

      await updateHomeSectionContent('career-hero', payload);
      setMessage({ type: 'success', text: 'Career Hero settings updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Career Hero settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Career Hero Settings...</div>;
  }

  const isVideoMode = data.backgroundMediaType === 'video' || isVideoUrl(data.bgVideo || data.backgroundVideo);
  const currentVideoSrc = getMediaUrl(data.bgVideo || data.backgroundVideo);
  const currentImageSrc = getMediaUrl(data.bgImage || data.backgroundImage);
  const embedVideoSrc = getEmbedVideoUrl(currentVideoSrc);
  const isYoutubeOrVimeo = embedVideoSrc.includes('youtube.com') || embedVideoSrc.includes('vimeo.com');

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>💼</span> Career Hero Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage Career Hero heading, supporting text, CTA button, and background media.
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

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* 1. Main Heading */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            1. Main Heading
          </label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="e.g. Join Our Team"
            required
          />
        </div>

        {/* 2. Supporting Text / Description */}
        <div>
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
            2. Supporting Text / Description
          </label>
          <textarea
            rows="3"
            value={data.description || ''}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="e.g. Find exciting career opportunities with us."
            required
          />
        </div>

        {/* 3 & 4. CTA Button Text & CTA Button Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              3. CTA Button Text
            </label>
            <input
              type="text"
              value={data.buttonText || ''}
              onChange={(e) => setData({ ...data, buttonText: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="e.g. Explore Jobs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              4. CTA Button Link
            </label>
            <input
              type="text"
              value={data.buttonLink || ''}
              onChange={(e) => setData({ ...data, buttonLink: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-orange-500 focus:outline-none"
              placeholder="e.g. #jobs or /career/apply"
              required
            />
          </div>
        </div>

        {/* 5. Background Media Management */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              5. Background Media Management
            </label>

            {/* Media Type Radio Buttons */}
            <div className="flex items-center gap-6 text-xs font-semibold text-slate-700">
              <span className="text-slate-500 font-medium">Background Media Type:</span>
              <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-orange-600">
                <input
                  type="radio"
                  name="careerHeroMediaTypeSelection"
                  value="image"
                  checked={!isVideoMode}
                  onChange={() => setData({ ...data, backgroundMediaType: 'image' })}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span>🖼️ Image</span>
              </label>
              <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-orange-600">
                <input
                  type="radio"
                  name="careerHeroMediaTypeSelection"
                  value="video"
                  checked={isVideoMode}
                  onChange={() => setData({ ...data, backgroundMediaType: 'video' })}
                  className="text-orange-600 focus:ring-orange-500"
                />
                <span>🎥 Video</span>
              </label>
            </div>
          </div>

          {/* Conditional Media Panel */}
          <div>
            {isVideoMode ? (
              /* IF VIDEO IS SELECTED */
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-800">Current Background Video</label>

                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  {/* Video Preview */}
                  <div className="w-full sm:w-64 h-36 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-300 relative flex items-center justify-center shadow-inner">
                    {(data.bgVideo || data.backgroundVideo) ? (
                      isYoutubeOrVimeo ? (
                        <iframe
                          src={embedVideoSrc}
                          title="Current Background Video"
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      ) : (
                        <video
                          src={currentVideoSrc}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      )
                    ) : (
                      <div className="text-slate-400 text-xs font-medium text-center p-3">No Video Selected</div>
                    )}
                    <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm uppercase tracking-wide">
                      🎥 Video Preview
                    </span>
                  </div>

                  {/* Video Input & Buttons */}
                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Background Video URL or File Path
                      </label>
                      <input
                        type="text"
                        value={data.bgVideo || data.backgroundVideo || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData({
                            ...data,
                            bgVideo: val,
                            backgroundVideo: val,
                            backgroundMediaType: 'video'
                          });
                        }}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        placeholder="e.g. /uploads/video.mp4 or https://www.youtube.com/watch?v=..."
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <label className="cursor-pointer px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition shadow-sm inline-flex items-center gap-1.5">
                        <span>📹</span>
                        <span>{uploading ? 'Uploading Video...' : 'Replace Video'}</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleMediaUpload(e, 'video')}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>

                      {(data.bgVideo || data.backgroundVideo) && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia('video')}
                          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-lg transition"
                        >
                          Remove Media
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* IF IMAGE IS SELECTED */
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-800">Current Background Image</label>

                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  {/* Image Preview */}
                  <div className="w-full sm:w-64 h-36 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300 relative flex items-center justify-center shadow-inner">
                    {(data.bgImage || data.backgroundImage) ? (
                      <img
                        src={currentImageSrc}
                        alt="Current Background Image"
                        className="w-full h-full object-cover"
                        onError={(e) => handleImageError(e)}
                      />
                    ) : (
                      <div className="text-slate-500 text-xs font-medium text-center p-3">No Image Selected</div>
                    )}
                    <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm uppercase tracking-wide">
                      🖼️ Image Preview
                    </span>
                  </div>

                  {/* Image Input & Buttons */}
                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Background Image URL or File Path
                      </label>
                      <input
                        type="text"
                        value={data.bgImage || data.backgroundImage || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (isVideoUrl(val)) {
                            setData({
                              ...data,
                              bgVideo: val,
                              backgroundVideo: val,
                              backgroundMediaType: 'video',
                              bgImage: '',
                              backgroundImage: ''
                            });
                          } else {
                            setData({
                              ...data,
                              bgImage: val,
                              backgroundImage: val,
                              backgroundMediaType: 'image'
                            });
                          }
                        }}
                        className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        placeholder="e.g. /assets/images/career-hero.jpg or https://..."
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <label className="cursor-pointer px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition shadow-sm inline-flex items-center gap-1.5">
                        <span>🖼️</span>
                        <span>{uploading ? 'Uploading Image...' : 'Replace Image'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleMediaUpload(e, 'image')}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>

                      {(data.bgImage || data.backgroundImage) && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMedia('image')}
                          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-lg transition"
                        >
                          Remove Media
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition flex items-center gap-2"
          >
            {saving ? 'Saving Changes...' : 'Save Hero Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
