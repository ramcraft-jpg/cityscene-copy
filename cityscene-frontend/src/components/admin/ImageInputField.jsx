import React, { useState, useEffect } from 'react';

export default function ImageInputField({
  label = 'Image URL',
  value = '',
  onChange,
  placeholder = 'https://images.unsplash.com/... or paste image URL',
  helpText = 'Paste a direct image link (JPG, PNG, WEBP, SVG)',
  required = false
}) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] text-slate-400 hover:text-red-400 font-medium transition"
          >
            Clear Image
          </button>
        )}
      </div>

      <div className="relative">
        <input
          type="url"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3.5 py-2 text-xs bg-slate-950 text-white border border-slate-800 rounded-lg focus:outline-none focus:border-orange-500 transition placeholder:text-slate-600"
        />
      </div>

      {helpText && (
        <p className="text-[11px] text-slate-500 font-normal">{helpText}</p>
      )}

      {/* Image Preview Box */}
      {value ? (
        <div className="mt-2 relative rounded-lg border border-slate-800 overflow-hidden bg-slate-950 group">
          {!imageError ? (
            <div className="relative aspect-video w-full max-h-48 overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={value}
                alt="Preview"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold text-emerald-400 border border-emerald-500/30">
                Live Preview
              </div>
            </div>
          ) : (
            <div className="p-4 text-center space-y-1 bg-red-950/20 border border-red-900/30">
              <p className="text-xs font-semibold text-red-400">⚠️ Unable to load image preview</p>
              <p className="text-[11px] text-slate-400">Check that the image URL is direct and accessible.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-2 aspect-video max-h-32 w-full rounded-lg border border-dashed border-slate-800 bg-slate-950/50 flex flex-col items-center justify-center text-slate-600 space-y-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[11px]">No image URL provided</span>
        </div>
      )}
    </div>
  );
}
