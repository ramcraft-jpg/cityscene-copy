import React from 'react';

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
  // YouTube watch link
  if (trimmed.includes('youtube.com/watch')) {
    try {
      const urlObj = new URL(trimmed);
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0`;
      }
    } catch (e) {}
  }
  // YouTube short link
  if (trimmed.includes('youtu.be/')) {
    const videoId = trimmed.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0`;
    }
  }
  // Vimeo link
  if (trimmed.includes('vimeo.com/')) {
    const videoId = trimmed.split('vimeo.com/')[1]?.split('?')[0];
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&byline=0&title=0`;
    }
  }
  return trimmed;
};

export default function AdminHeroMediaControl({
  mediaType = 'image',
  imageUrl = '',
  videoUrl = '',
  onChangeMediaType,
  onChangeImage,
  onChangeVideo,
  uploading = false,
  onUpload,
  onRemoveMedia
}) {
  const isVideoMode = mediaType === 'video' || isVideoUrl(imageUrl) || isVideoUrl(videoUrl);

  const getMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/uploads')) {
      return `http://localhost:5000${url}`;
    }
    return url;
  };

  const currentVideoSrc = getMediaUrl(videoUrl);
  const embedVideoSrc = getEmbedVideoUrl(currentVideoSrc);
  const isYoutubeOrVimeo = embedVideoSrc.includes('youtube.com') || embedVideoSrc.includes('vimeo.com');

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          BACKGROUND MEDIA MANAGEMENT
        </label>

        {/* Stable Media Type Radio Buttons */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
          <span className="text-slate-500 font-medium">Select Media Type:</span>
          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-orange-600">
            <input
              type="radio"
              name="heroMediaTypeSelection"
              value="image"
              checked={!isVideoMode}
              onChange={() => onChangeMediaType && onChangeMediaType('image')}
              className="text-orange-600 focus:ring-orange-500"
            />
            <span>🖼️ Image</span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-orange-600">
            <input
              type="radio"
              name="heroMediaTypeSelection"
              value="video"
              checked={isVideoMode}
              onChange={() => onChangeMediaType && onChangeMediaType('video')}
              className="text-orange-600 focus:ring-orange-500"
            />
            <span>🎥 Video</span>
          </label>
        </div>
      </div>

      {/* Main Controls & Previews */}
      <div className="space-y-4">
        {isVideoMode ? (
          /* VIDEO CONTROL PANEL */
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">Current Background Video</label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Video Preview */}
              <div className="w-full sm:w-56 h-32 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300 relative flex items-center justify-center shadow-inner">
                {videoUrl ? (
                  isYoutubeOrVimeo ? (
                    <iframe
                      src={embedVideoSrc}
                      title="Video preview"
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  ) : (
                    <video
                      src={currentVideoSrc}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      onError={(e) => {
                        console.warn('Video preview error:', e);
                      }}
                    />
                  )
                ) : (
                  <div className="text-slate-400 text-xs font-medium text-center p-2">No Video Selected</div>
                )}
                <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm uppercase tracking-wide">
                  🎥 Video Preview
                </span>
              </div>

              {/* Video Input & Actions */}
              <div className="flex-1 space-y-2.5 w-full">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Background Video Address / URL <span className="text-slate-400 font-normal">(Direct .mp4, YouTube, Vimeo, or local file)</span>
                  </label>
                  <input
                    type="text"
                    value={videoUrl || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChangeVideo && onChangeVideo(val);
                      onChangeMediaType && onChangeMediaType('video');
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white font-mono focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="Paste Video Address here (e.g. https://www.youtube.com/watch?v=... or https://.../video.mp4)"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    💡 You can paste any direct video URL, YouTube link, or upload a video file using the button below.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <label className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition shadow-sm inline-flex items-center gap-1.5">
                    <span>📹</span>
                    <span>{uploading ? 'Uploading Video...' : 'Upload Video File'}</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0] && onUpload) {
                          onUpload(e.target.files[0], 'video');
                        }
                      }}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>

                  {videoUrl && onRemoveMedia && (
                    <button
                      type="button"
                      onClick={() => onRemoveMedia('video')}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-lg transition"
                    >
                      Remove Video
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* IMAGE CONTROL PANEL */
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">Current Background Image</label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Image Preview */}
              <div className="w-full sm:w-56 h-32 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300 relative flex items-center justify-center shadow-inner">
                {imageUrl ? (
                  <img
                    src={getMediaUrl(imageUrl)}
                    alt="Background preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                ) : (
                  <div className="text-slate-500 text-xs font-medium text-center p-2">No Image Selected</div>
                )}
                <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm uppercase tracking-wide">
                  🖼️ Image Preview
                </span>
              </div>

              {/* Image Input & Actions */}
              <div className="flex-1 space-y-2.5 w-full">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Background Image or Video URL / File Path
                  </label>
                  <input
                    type="text"
                    value={imageUrl || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (isVideoUrl(val)) {
                        onChangeVideo && onChangeVideo(val);
                        onChangeMediaType && onChangeMediaType('video');
                        onChangeImage && onChangeImage('');
                      } else {
                        onChangeImage && onChangeImage(val);
                      }
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="e.g. /assets/images/hero.jpg or paste video link"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    💡 To use a video background, click <strong>🎥 Video</strong> radio button above or paste a video URL.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <label className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition shadow-sm inline-flex items-center gap-1.5">
                    <span>🖼️</span>
                    <span>{uploading ? 'Uploading...' : 'Replace Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0] && onUpload) {
                          onUpload(e.target.files[0], 'image');
                        }
                      }}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>

                  {imageUrl && onRemoveMedia && (
                    <button
                      type="button"
                      onClick={() => onRemoveMedia('image')}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-lg transition"
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
  );
}
