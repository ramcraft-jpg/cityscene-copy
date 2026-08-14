import React from 'react';
import { Heart, MessageSquare } from 'lucide-react';

export default function BlogDetailContent({ blog, authorTagline, liked, likesCount, handleLike, commentsCount, scrollToComments }) {
  if (!blog) return null;

  return (
    <>
      {/* Card Header inside White Card */}
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-2">
          {blog.title}
        </h2>
        <p className="text-sm font-semibold text-gray-500">
          {authorTagline}
        </p>
      </div>

      {/* Article Body HTML Content */}
      <div
        className="prose prose-lg max-w-none text-[#2d3748] leading-relaxed
          prose-p:mb-5 prose-p:leading-[1.8] prose-p:text-base sm:prose-p:text-[17px] prose-p:font-normal prose-p:text-gray-800
          prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-gray-900
          prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
          prose-li:text-base prose-li:text-gray-700
          prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.summary || ''}</p>` }}
      />

      {/* Engagement Bar & Published Date Line */}
      <div className="mt-12 pt-4 border-t border-gray-200/80 flex items-center justify-between text-sm text-gray-500 font-normal">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 hover:text-red-500 transition-colors focus:outline-none"
            title="Like"
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={scrollToComments}
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors focus:outline-none"
            title="Comments"
          >
            <MessageSquare className="w-4 h-4 text-gray-500" />
            <span>{commentsCount}</span>
          </button>
        </div>

        <div className="text-xs sm:text-sm text-gray-500">
          Published on {blog.date || "24 November 2025"}
        </div>
      </div>
    </>
  );
}
