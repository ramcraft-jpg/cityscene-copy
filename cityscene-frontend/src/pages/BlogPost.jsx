import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import SEO from '../components/common/SEO';
import BlogDetail from '../components/blog/BlogDetail';
import { getBlogBySlug, getRelatedBlogs } from '../services/blogService';

import blogsData from '../data/blogs';

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

    getBlogBySlug(slug)
      .then((blogData) => {
        const local = blogsData.find((b) => b.slug.toLowerCase() === slug?.toLowerCase() || b.id === slug);
        
        // Use backend blogData if it has rich blocks, otherwise merge or use local rich seed data
        if (blogData && blogData.blocks) {
          let parsedBlocks = blogData.blocks;
          if (typeof parsedBlocks === 'string') {
            try { parsedBlocks = JSON.parse(parsedBlocks); } catch (e) { parsedBlocks = []; }
          }
          if (Array.isArray(parsedBlocks) && parsedBlocks.length >= 3) {
            setBlog(blogData);
          } else if (local) {
            setBlog({ ...local, ...blogData, blocks: local.blocks });
          } else {
            setBlog(blogData);
          }
        } else if (local) {
          setBlog(local);
        } else {
          setBlog(blogData);
        }

        getRelatedBlogs(slug, 3).then(setRelatedBlogs).catch(() => {});
        setLoading(false);
      })
      .catch((err) => {
        const local = blogsData.find((b) => b.slug.toLowerCase() === slug?.toLowerCase() || b.id === slug);
        if (local) {
          setBlog(local);
          setError(null);
        } else {
          setError(err.message || 'Failed to load blog article.');
        }
        setLoading(false);
      });
  }, [slug]);

  const seoTitle = blog?.seoTitle || (blog ? `${blog.title} | CityScene Blog` : 'Blog Article | CityScene Global');
  const seoDesc = blog?.seoDescription || blog?.summary || 'Read our latest tech insights and articles at CityScene Global.';
  const ogImg = blog?.ogImage || blog?.image || '';

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col selection:bg-orange-500 selection:text-white">
      <SEO
        pageKey={`blog:${slug}`}
        fallback={{
          title: seoTitle,
          description: seoDesc,
          ogImage: ogImg,
          keywords: blog?.seoKeywords || blog?.focusKeyword || ''
        }}
      />
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
