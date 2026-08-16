import React, { useState, useEffect } from 'react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import BlogHero from '../components/blog/BlogHero';
import BlogGrid from '../components/blog/BlogGrid';
import { getBlogs } from '../services/blogService';

const defaultIntro = {
  heading: 'Technology is evolving rapidly - are you keeping up?',
  description: 'Dive into our latest articles covering AI, cloud computing, cybersecurity, data analytics, and emerging technologies to stay informed, enhance your digital strategy, and maintain a competitive edge in the ever-evolving tech landscape.'
};

export default function Blog() {
  const [blogsList, setBlogsList] = useState([]);
  const [introData, setIntroData] = useState(defaultIntro);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    Promise.all([
      getBlogs(),
      fetch('http://localhost:5000/api/home-content/blog-intro').then(r => r.json()).catch(() => null)
    ])
      .then(([data, introRes]) => {
        if (data) setBlogsList(data);
        if (introRes && introRes.success && introRes.content && introRes.content.heading) {
          setIntroData(introRes.content);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('[Blog Page Error]:', err);
        setError(err.message || 'Failed to fetch blogs from server.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Shared Header */}
      <Header />

      <main className="flex-grow">
        {/* Blog Hero Section */}
        <BlogHero />

        {/* Technology Introduction Section matching reference website */}
        <section className="w-full bg-white text-black py-16 md:py-24 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-16">
              {/* Left Main Heading */}
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 tracking-tight leading-snug whitespace-pre-line">
                  {introData.heading || defaultIntro.heading}
                </h2>
              </div>

              {/* Vertical Line Divider */}
              <div className="hidden md:block w-[2px] h-36 bg-gray-900 flex-shrink-0" />

              {/* Right Supporting Paragraph */}
              <div className="flex-1 max-w-xl space-y-4">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {introData.description || defaultIntro.description}
                </p>
                {introData.image && (
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 aspect-video max-h-56">
                    <img src={introData.image} alt="Intro Feature" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid Section */}
        {loading ? (
          <div className="bg-black py-24 text-center text-white">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-medium">Loading insights...</p>
          </div>
        ) : error ? (
          <div className="bg-black py-24 text-center text-red-400">
            <p className="text-lg font-semibold mb-2">Unable to load blog articles</p>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        ) : (
          <BlogGrid blogs={blogsList} />
        )}
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
