import React from 'react';

export default function BlogDetailAuthor({ authorAvatar, authorDisplayName }) {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <img
        src={authorAvatar}
        alt={authorDisplayName}
        className="w-14 h-14 rounded-lg object-cover border border-gray-200 shadow-sm"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
        }}
      />
      <div>
        <a
          href="#author"
          className="text-lg font-medium text-gray-900 underline hover:text-blue-600 transition-colors decoration-1 underline-offset-4"
        >
          {authorDisplayName}
        </a>
      </div>
    </div>
  );
}
