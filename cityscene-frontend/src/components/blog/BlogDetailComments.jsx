import React from 'react';

export default function BlogDetailComments({
  comments,
  commentText,
  setCommentText,
  handleCommentSubmit,
  handleKeyDown
}) {
  return (
    <div id="comment-section" className="pt-6">
      {comments.length === 0 ? (
        <p className="text-sm text-gray-600 mb-6 font-normal">
          No comments yet. Start a new discussion
        </p>
      ) : (
        <p className="text-sm font-semibold text-gray-900 mb-6">
          Discussion ({comments.length})
        </p>
      )}

      {/* Visitor Comment Form Box */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] mb-8">
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <label htmlFor="commentText" className="block text-sm font-medium text-gray-800 mb-1">
            Add a comment
          </label>

          <div>
            <textarea
              id="commentText"
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-y transition-all"
              placeholder=""
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 font-normal">
              Ctrl+Enter to add comment
            </span>
            <button
              type="submit"
              className="bg-black hover:bg-slate-800 text-white text-xs font-semibold px-5 py-2 rounded-md transition-colors focus:outline-none shadow-sm"
            >
              Comment
            </button>
          </div>
        </form>
      </div>

      {/* Dynamic Posted Comments List */}
      {comments.length > 0 && (
        <div className="space-y-4 max-w-full">
          {comments.map((c) => (
            <div key={c.id} className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-900">{c.name}</span>
                <span className="text-xs text-gray-400">{c.date}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
