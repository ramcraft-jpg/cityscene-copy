import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogDetailHeader from './BlogDetailHeader';
import BlogDetailContent from './BlogDetailContent';
import BlogDetailAuthor from './BlogDetailAuthor';
import BlogDetailComments from './BlogDetailComments';

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
  const authorAvatar = (typeof blog.author === 'object' ? blog.author?.avatar : null) || blog.authorAvatar || "/assets/images/author-vishwambhar.png";
  const authorDisplayName = (typeof blog.author === 'object' ? blog.author?.name : null) || blog.author || "Vishwambhar Singh";
  const authorTagline = (typeof blog.author === 'object' ? blog.author?.tagline : null) || "CityScene Global — Jaipur's IT & Digital Innovation Partner";

  return (
    <article className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans pb-24">
      <BlogDetailHeader blog={blog} categorySlug={categorySlug} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-10 md:p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] mb-10">
          <BlogDetailContent
            blog={blog}
            authorTagline={authorTagline}
            liked={liked}
            likesCount={likesCount}
            handleLike={handleLike}
            commentsCount={comments.length}
            scrollToComments={scrollToComments}
          />

          <hr className="border-t border-gray-200 my-6" />

          <BlogDetailAuthor authorAvatar={authorAvatar} authorDisplayName={authorDisplayName} />

          <BlogDetailComments
            comments={comments}
            authorName={authorName}
            setAuthorName={setAuthorName}
            authorEmail={authorEmail}
            setAuthorEmail={setAuthorEmail}
            commentText={commentText}
            setCommentText={setCommentText}
            handleCommentSubmit={handleCommentSubmit}
            handleKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </article>
  );
}
