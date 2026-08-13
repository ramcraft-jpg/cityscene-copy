import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogDetail from '../components/BlogDetail';
import { getBlogBySlug, getRelatedBlogs } from '../services/blogService';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);

    Promise.all([
      getBlogBySlug(slug),
      getRelatedBlogs(slug, 3)
    ])
      .then(([blogData, relatedData]) => {
        setBlog(blogData);
        setRelatedBlogs(relatedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[BlogPost Page Error]:', err);
        setError(err.message || 'Failed to load blog article.');
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Shared Header */}
      <Header />

      <main className="flex-grow">
        {loading ? (
          <div className="py-24 text-center text-gray-600">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-medium">Loading article...</p>
          </div>
        ) : error ? (
          <div className="max-w-3xl mx-auto my-24 p-8 bg-red-50 rounded-2xl border border-red-200 text-center text-red-800">
            <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
            <p className="text-sm text-red-600 mb-6">{error}</p>
            <Link
              to="/blog"
              className="inline-flex items-center px-6 py-2.5 rounded-full bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition-colors"
            >
              Back to Blog Articles
            </Link>
          </div>
        ) : (
          <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
        )}
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
