import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Share2, ArrowRight, Clock, Calendar } from 'lucide-react';
import { getMediaUrl } from '../../utils/imageUrl';

export default function BlogCard({ blog }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(12);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        url: window.location.origin + `/blog/${blog.slug}`
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + `/blog/${blog.slug}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 h-full"
    >
      {/* Image Container with Padding matching CityScene design */}
      <div className="p-3 pb-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100">
          <img
            src={getMediaUrl(blog.image)}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          {/* Category Tag */}
          {blog.category && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-medium px-3 py-1 rounded-full shadow-sm border border-gray-200/50">
              {blog.category}
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5 justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata: Date & Read Time */}
          {(blog.date || blog.readTime) && (
            <div className="flex items-center text-xs text-gray-500 space-x-3 font-medium">
              {blog.date && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {blog.date}
                </span>
              )}
              {blog.date && blog.readTime && <span>•</span>}
              {blog.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {blog.readTime}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-gray-900 font-semibold text-lg md:text-xl leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            {blog.title}
          </h3>

          {/* Summary / Description */}
          {blog.summary && (
            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed font-normal">
              {blog.summary}
            </p>
          )}
        </div>

        {/* Card Footer Actions matching reference icons & Read More */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-gray-500 text-xs">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors ${
                liked ? 'text-red-500 font-medium' : 'hover:text-red-500'
              }`}
              title="Like"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <div className="flex items-center gap-1 hover:text-blue-600 transition-colors" title="Comments">
              <MessageSquare className="w-4 h-4" />
              <span>0</span>
            </div>

            <button
              onClick={handleShare}
              className="hover:text-gray-900 transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1 font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
            <span>Read More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
