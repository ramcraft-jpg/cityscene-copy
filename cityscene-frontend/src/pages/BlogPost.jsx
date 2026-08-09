import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogDetail from '../components/BlogDetail';
import { getBlogBySlug, getRelatedBlogs } from '../services/blogService';

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    Promise.all([
      getBlogBySlug(slug),
      getRelatedBlogs(slug, 3)
    ]).then(([blogData, relatedData]) => {
      setBlog(blogData);
      setRelatedBlogs(relatedData);
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
        ) : (
          <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />
        )}
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
