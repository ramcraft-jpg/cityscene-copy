import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogDetailHeader({ blog, categorySlug }) {
  if (!blog) return null;

  const categoryName = blog.category || 'IT Solutions';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6">
      {/* Category Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-6 font-normal">
        <Link to="/blog" className="hover:text-gray-900 transition-colors">
          Blog
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-[#0055d4] font-medium cursor-pointer hover:underline">
          {categoryName}
        </span>
      </nav>

      {/* Main Blog Title - Reduced Boldness */}
      <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-medium text-gray-900 tracking-tight leading-[1.25] mb-4">
        {blog.title}
      </h1>

      {/* Excerpt Summary if present */}
      {blog.summary && (
        <p className="text-base sm:text-lg text-gray-600 font-normal mb-5 leading-relaxed">
          {blog.summary}
        </p>
      )}

      {/* Date & Reading Time */}
      <div className="text-xs sm:text-sm text-gray-500 font-normal mb-6">
        {blog.date || "March 26, 2025"} {blog.readTime ? `· ${blog.readTime}` : "· 3 min read"}
      </div>

      {/* Top Divider Line */}
      <hr className="border-t border-gray-200 mb-8" />
    </div>
  );
}
