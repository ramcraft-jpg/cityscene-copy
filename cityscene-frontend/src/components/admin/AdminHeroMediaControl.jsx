import React from 'react';

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
  const isVideoMode = mediaType === 'video';

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
        <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          BACKGROUND MEDIA MANAGEMENT
        </label>

        {/* Media Type Radio Buttons */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
          <span className="text-slate-500 font-medium">Background Media Type:</span>
          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-orange-600">
            <input
              type="radio"
              name={`mediaType-${Math.random()}`}
              value="image"
              checked={!isVideoMode}
              onChange={() => onChangeMediaType && onChangeMediaType('image')}
              className="text-orange-600 focus:ring-orange-500"
            />
            <span>( ) Image</span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-orange-600">
            <input
              type="radio"
              name={`mediaType-${Math.random()}`}
              value="video"
              checked={isVideoMode}
              onChange={() => onChangeMediaType && onChangeMediaType('video')}
              className="text-orange-600 focus:ring-orange-500"
            />
            <span>( ) Video</span>
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
                  <video
                    src={videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
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
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Background Video URL or File Path
                  </label>
                  <input
                    type="text"
                    value={videoUrl || ''}
                    onChange={(e) => onChangeVideo && onChangeVideo(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="e.g. /uploads/video.mp4 or https://assets.mixkit.co/...mp4"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <label className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition shadow-sm inline-flex items-center gap-1.5">
                    <span>📹</span>
                    <span>{uploading ? 'Uploading...' : 'Replace Video'}</span>
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
                      Remove Media
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
                    src={imageUrl}
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
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Background Image URL or File Path
                  </label>
                  <input
                    type="text"
                    value={imageUrl || ''}
                    onChange={(e) => onChangeImage && onChangeImage(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="e.g. /assets/images/hero.jpg"
                  />
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
