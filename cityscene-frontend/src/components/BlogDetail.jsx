import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare } from 'lucide-react';

export default function BlogDetail({ blog, relatedBlogs = [] }) {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-8">The requested blog post could not be found or has been moved.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        name: authorName.trim() || 'Guest Reader',
        email: authorEmail.trim(),
        text: commentText.trim(),
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      }
    ]);
    setCommentText('');
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleCommentSubmit(e);
    }
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(Math.max(0, likesCount - 1));
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
  };

  const scrollToComments = () => {
    const el = document.getElementById('comment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categorySlug = (blog.category || 'it-solutions').toLowerCase().replace(/\s+/g, '-');
  const authorAvatar = blog.author?.avatar || "/assets/images/author-vishwambhar.png";
  const authorDisplayName = blog.author?.name || "Vishwambhar Singh";
  const authorTagline = blog.author?.tagline || "CityScene Global — Jaipur's IT & Digital Innovation Partner";

  return (
    <article className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans pb-24">
      {/* Top Banner Header matching Image 4 */}
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

        {/* Top Horizontal Separator */}
        <hr className="border-t border-gray-200/90 my-4" />
      </div>

      {/* Main Content White Card matching Images 1, 2, 3, 5 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-10 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] mb-10">
          
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

          {/* Engagement Bar & Published Date Line matching Image 1 */}
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
                <span>{comments.length}</span>
              </button>
            </div>

            <div className="text-xs sm:text-sm text-gray-500">
              Published on {blog.date || "24 November 2025"}
            </div>
          </div>

          <hr className="border-t border-gray-200 my-6" />

          {/* Author Block matching Image 1 */}
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

          {/* Comments & Discussion Section matching Image 1 */}
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

        </div>
      </div>
    </article>
  );
}
