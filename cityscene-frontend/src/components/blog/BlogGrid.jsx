import React from 'react';
import BlogCard from './BlogCard';

export default function BlogGrid({ blogs }) {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="bg-black py-16 text-center text-gray-400">
        No articles found.
      </div>
    );
  }

  return (
    <section className="w-full bg-black py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
