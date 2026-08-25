import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare } from 'lucide-react';
import { getMediaUrl } from '../../utils/imageUrl';

export default function BlogDetailContent({ blog, authorTagline, liked, likesCount, handleLike, commentsCount, scrollToComments }) {
  if (!blog) return null;

  // Safely parse blocks if passed as JSON string or array
  let blocksList = [];
  if (Array.isArray(blog.blocks)) {
    blocksList = blog.blocks;
  } else if (typeof blog.blocks === 'string' && blog.blocks.trim()) {
    try {
      blocksList = JSON.parse(blog.blocks);
    } catch (e) {
      blocksList = [];
    }
  }

  const renderBlock = (block, index) => {
    if (!block) return null;
    const key = block.id || `block-${index}`;

    switch (block.type) {
      case 'h2':
        return (
          <h2 key={key} className="text-xl sm:text-2xl font-medium text-gray-900 mt-8 first:mt-0 mb-3.5 tracking-tight leading-snug">
            {block.text || block.content}
          </h2>
        );

      case 'h3':
        return (
          <h3 key={key} className="text-lg sm:text-xl font-medium text-gray-900 mt-6 first:mt-0 mb-3 tracking-tight leading-snug">
            {block.text || block.content}
          </h3>
        );

      case 'bullet_list': {
        const items = Array.isArray(block.items) ? block.items : (typeof block.text === 'string' ? block.text.split('\n') : []);
        return (
          <ul key={key} className="my-4 list-disc pl-6 space-y-2 text-base text-gray-800 font-normal">
            {items.map((item, i) => (
              <li key={i}>{typeof item === 'string' ? item : item?.text || ''}</li>
            ))}
          </ul>
        );
      }

      case 'numbered_list': {
        const items = Array.isArray(block.items) ? block.items : (typeof block.text === 'string' ? block.text.split('\n') : []);
        return (
          <ol key={key} className="my-4 list-decimal pl-6 space-y-2 text-base text-gray-800 font-normal">
            {items.map((item, i) => (
              <li key={i}>{typeof item === 'string' ? item : item?.text || ''}</li>
            ))}
          </ol>
        );
      }

      case 'image':
        return (
          <figure key={key} className="my-8">
            <img
              src={getMediaUrl(block.url || block.image || block.content)}
              alt={block.caption || block.alt || 'Blog article image'}
              className="w-full rounded-2xl border border-gray-200 shadow-sm object-cover max-h-[500px]"
            />
            {block.caption && (
              <figcaption className="text-center text-xs text-gray-500 font-medium mt-2">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'quote':
        return (
          <blockquote key={key} className="border-l-4 border-orange-500 bg-orange-50/40 p-5 sm:p-6 my-8 rounded-r-2xl italic text-gray-800 font-serif">
            <p className="text-lg sm:text-xl font-medium leading-relaxed">
              "{block.text || block.content}"
            </p>
            {(block.author || block.attribution) && (
              <cite className="block text-xs font-sans font-medium text-gray-600 mt-2.5 not-italic">
                — {block.author || block.attribution}
              </cite>
            )}
          </blockquote>
        );

      case 'callout':
        return (
          <div key={key} className="bg-amber-50/80 border border-amber-200/80 border-l-4 border-l-amber-500 p-5 my-8 rounded-2xl text-amber-900 text-sm sm:text-base font-normal flex items-start gap-3.5 shadow-sm">
            <span className="text-xl shrink-0">💡</span>
            <div className="leading-relaxed">{block.text || block.content}</div>
          </div>
        );

      case 'divider':
        return <hr key={key} className="border-t border-gray-200 my-8" />;

      case 'paragraph':
      case 'text_paragraph':
      default:
        return (
          <p key={key} className="mb-5 leading-[1.8] text-base sm:text-[17px] text-gray-800 font-normal first:mt-0">
            {block.text || block.content}
          </p>
        );
    }
  };

  return (
    <>
      {/* Dynamic Content Blocks OR Fallback Legacy HTML */}
      <div className="article-body text-[#2d3748] leading-relaxed">
        {blocksList && blocksList.length > 0 ? (
          blocksList.map((block, idx) => renderBlock(block, idx))
        ) : (
          <div
            className="prose prose-lg max-w-none text-[#2d3748] leading-relaxed
              prose-p:mb-5 prose-p:leading-[1.8] prose-p:text-base sm:prose-p:text-[17px] prose-p:font-normal prose-p:text-gray-800
              prose-headings:font-medium prose-headings:text-gray-900 prose-headings:tracking-tight
              prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:mb-3.5 prose-h2:font-medium
              prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:font-medium prose-h3:text-gray-900
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
              prose-li:text-base prose-li:text-gray-700
              prose-strong:font-semibold prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.summary || ''}</p>` }}
          />
        )}

        {/* Blue Contact Us Today CTA Button matching CityScene reference image */}
        <div className="mt-8 mb-4">
          <Link
            to={blog.ctaButtonLink || "/contact"}
            className="inline-block px-6 py-2.5 bg-[#007bff] hover:bg-[#0056b3] text-white font-normal text-base sm:text-lg rounded-md shadow-sm transition-colors underline underline-offset-4 decoration-white"
          >
            {blog.ctaButtonText || "Contact Us Today"}
          </Link>
        </div>
      </div>

      {/* Engagement Bar & Published Date Line */}
      <div className="mt-10 pt-4 flex items-center justify-between text-sm text-gray-500 font-normal">
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

        <div className="text-xs sm:text-sm text-gray-500 font-normal">
          Published on {blog.date || "March 26, 2025"}
        </div>
      </div>

      {/* Horizontal Divider Line */}
      <hr className="border-t border-gray-200/90 mt-4 mb-6" />
    </>
  );
}
