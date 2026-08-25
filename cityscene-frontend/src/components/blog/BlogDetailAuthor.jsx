import React from 'react';

export default function BlogDetailAuthor({ authorAvatar, authorDisplayName }) {
  if (!authorDisplayName) return null;

  return (
    <div className="flex items-center space-x-3.5 my-6">
      <img
        src={authorAvatar || "/assets/images/author-vishwambhar.png"}
        alt={authorDisplayName}
        className="w-12 h-12 rounded-full object-cover shrink-0"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
        }}
      />
      <div>
        <a
          href="#author"
          className="text-base sm:text-lg font-normal text-gray-900 underline underline-offset-4 decoration-gray-400 hover:text-blue-600 transition-colors"
        >
          {authorDisplayName}
        </a>
      </div>
    </div>
  );
}
