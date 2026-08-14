import React from 'react';

export default function BlogDetailComments({
  comments,
  authorName,
  setAuthorName,
  authorEmail,
  setAuthorEmail,
  commentText,
  setCommentText,
  handleCommentSubmit,
  handleKeyDown
}) {
  return (
    <div id="comment-section" className="pt-2">
      {comments.length === 0 ? (
        <p className="text-xs sm:text-sm text-gray-500 mb-6 font-normal">
          No comments yet. Start a new discussion
        </p>
      ) : (
        <p className="text-sm font-semibold text-gray-900 mb-6">
          Discussion ({comments.length})
        </p>
      )}

      {/* Comment Input Card Form */}
      <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-8 max-w-2xl shadow-sm mb-8">
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          {/* 2 Input Row: Your Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="authorName" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                Your Name
              </label>
              <input
                id="authorName"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="authorEmail" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                Email
              </label>
              <input
                id="authorEmail"
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Textarea Field: Add a comment */}
          <div>
            <label htmlFor="commentText" className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              Add a comment
            </label>
            <textarea
              id="commentText"
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-y transition-all"
            />
            <span className="text-[11px] text-gray-400 mt-1 block">
              Ctrl+Enter to add comment
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="bg-black text-white text-xs font-semibold px-5 py-2 rounded-md hover:bg-gray-800 transition-colors focus:outline-none"
            >
              Comment
            </button>
          </div>
        </form>
      </div>

      {/* List of Posted Comments */}
      {comments.length > 0 && (
        <div className="space-y-4 max-w-2xl">
          {comments.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs sm:text-sm text-gray-900">{c.name}</span>
                <span className="text-[11px] text-gray-400">{c.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
