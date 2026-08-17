import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogDetailHeader({ blog, categorySlug }) {
  if (!blog) return null;

  const videoSrc = blog.heroVideo || blog.backgroundVideo || blog.video;
  const imageSrc = blog.backgroundImage || blog.heroImage || blog.image;
  const isVideoMode = blog.backgroundMediaType === 'video' || (blog.backgroundMediaType !== 'image' && !!videoSrc);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-1.5 text-xs sm:text-sm text-gray-500 mb-6 font-normal">
        <Link to="/blog" className="hover:text-gray-900 transition-colors underline-offset-2 hover:underline">
          Blog
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-[#0055d4] hover:underline cursor-pointer font-normal">
          {categorySlug}
        </span>
      </nav>

      {/* Main Article Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#111827] tracking-tight leading-[1.25] mb-4">
        {blog.title}
      </h1>

      {/* Subtitle / Excerpt */}
      {blog.summary && (
        <p className="text-base text-gray-600 font-normal mb-4 leading-relaxed">
          {blog.summary}
        </p>
      )}

      {/* Date and Read Time */}
      <div className="text-xs sm:text-sm text-gray-500 font-normal mb-6">
        {blog.date || "24 November 2025"} {blog.readTime ? `· ${blog.readTime}` : ""}
      </div>

      {/* Hero / Featured Background Media Banner */}
      <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-6 bg-slate-900">
        {isVideoMode && videoSrc ? (
          <video
            src={videoSrc}
            poster={imageSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : null}

        {(!isVideoMode || !videoSrc) && imageSrc && (
          <img
            src={imageSrc}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Top Horizontal Separator */}
      <hr className="border-t border-gray-200/90 my-4" />
    </div>
  );
}
