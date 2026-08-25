import React, { useState, useEffect, useMemo } from 'react';
import { getAllSeoMeta, updateSeoMeta, resetSeoMeta } from '../../../services/seoService';
import { getServices } from '../../../services/serviceService';
import { getBlogs } from '../../../services/blogService';
import { getProjects } from '../../../services/projectService';
import { uploadHomeMedia } from '../../../services/homeContentService';

const MAIN_PAGES = [
  { key: 'home', name: 'Home Page', group: 'main', path: '/' },
  { key: 'about', name: 'About CityScene', group: 'main', path: '/about' },
  { key: 'services', name: 'What We Do / Services', group: 'main', path: '/services' },
  { key: 'career', name: 'Careers Page', group: 'main', path: '/career' },
  { key: 'blog', name: 'Blogs Index Page', group: 'main', path: '/blog' },
  { key: 'portfolio', name: 'Portfolio Index Page', group: 'main', path: '/portfolio' },
  { key: 'contact', name: 'Contact Us', group: 'main', path: '/contact' }
];

export default function AdminSeoManagement() {
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [allPagesList, setAllPagesList] = useState(MAIN_PAGES);
  const [selectedPageKey, setSelectedPageKey] = useState('home');
  const [seoRecordsMap, setSeoRecordsMap] = useState({});
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  // Form State for currently selected page
  const [formData, setFormData] = useState({
    pageKey: 'home',
    pageName: 'Home Page',
    pageGroup: 'main',
    title: '',
    description: '',
    keywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    robots: 'index, follow'
  });

  // Load all SEO records and dynamic options on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch dynamic pages from backend APIs
      const [fetchedSeoRecords, servicesList, blogsList, projectsList] = await Promise.all([
        getAllSeoMeta('all').catch(() => []),
        getServices(true).catch(() => []),
        getBlogs(true).catch(() => []),
        getProjects(true).catch(() => [])
      ]);

      // Map existing SEO DB records by pageKey
      const recordsMap = {};
      if (Array.isArray(fetchedSeoRecords)) {
        fetchedSeoRecords.forEach((item) => {
          recordsMap[item.pageKey] = item;
        });
      }
      setSeoRecordsMap(recordsMap);

      // Build unified pages catalog
      const dynamicServicePages = (servicesList || []).map((srv) => {
        const key = `services:${srv.id || srv._id}`;
        return {
          key,
          name: `Service: ${srv.displayTitle || srv.title}`,
          group: 'service',
          path: `/services/${srv.id || srv._id}`
        };
      });

      const dynamicBlogPages = (blogsList || []).map((blog) => {
        const slug = blog.slug || blog.id;
        const key = `blog:${slug}`;
        return {
          key,
          name: `Blog: ${blog.title}`,
          group: 'blog',
          path: `/blog/${slug}`
        };
      });

      const dynamicPortfolioPages = (projectsList || []).map((prj) => {
        const slug = prj.slug || prj.id;
        const key = `portfolio:${slug}`;
        return {
          key,
          name: `Portfolio: ${prj.title}`,
          group: 'portfolio',
          path: `/portfolio/${slug}`
        };
      });

      const combinedPages = [
        ...MAIN_PAGES,
        ...dynamicServicePages,
        ...dynamicBlogPages,
        ...dynamicPortfolioPages
      ];

      setAllPagesList(combinedPages);

      // Initialize form with home page or current selection
      populateFormForPage('home', recordsMap, combinedPages);
    } catch (err) {
      console.error('Error loading SEO management data:', err);
      setMessage({ type: 'error', text: 'Failed to load SEO records from database.' });
    } finally {
      setLoading(false);
    }
  };

  const populateFormForPage = (pageKey, recordsMap = seoRecordsMap, pagesList = allPagesList) => {
    const pageMeta = pagesList.find((p) => p.key === pageKey) || {
      key: pageKey,
      name: pageKey,
      group: 'main',
      path: `/${pageKey}`
    };

    const existingRecord = recordsMap[pageKey] || {};
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://citysceneglobal.com';

    setFormData({
      pageKey,
      pageName: pageMeta.name,
      pageGroup: pageMeta.group,
      title: existingRecord.title || `${pageMeta.name.replace(/^(Service:|Blog:|Portfolio:)\s*/, '')} | CityScene Global`,
      description: existingRecord.description || `Explore ${pageMeta.name} solutions and engineering innovations at CityScene Global.`,
      keywords: existingRecord.keywords || 'CityScene Global, Enterprise Tech, Software Engineering',
      canonicalUrl: existingRecord.canonicalUrl || `${origin}${pageMeta.path}`,
      ogTitle: existingRecord.ogTitle || existingRecord.title || `${pageMeta.name} | CityScene Global`,
      ogDescription: existingRecord.ogDescription || existingRecord.description || `Discover ${pageMeta.name} at CityScene Global.`,
      ogImage: existingRecord.ogImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      robots: existingRecord.robots || 'index, follow'
    });
  };

  const handleSelectPage = (key) => {
    setSelectedPageKey(key);
    populateFormForPage(key);
    setMessage(null);
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const fileUrl = await uploadHomeMedia(file);
      setFormData((prev) => ({ ...prev, ogImage: fileUrl }));
      setMessage({ type: 'success', text: 'Open Graph image uploaded successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Image upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);

      const savedRecord = await updateSeoMeta(formData.pageKey, formData);

      // Update in local records map
      setSeoRecordsMap((prev) => ({
        ...prev,
        [formData.pageKey]: savedRecord
      }));

      setMessage({ type: 'success', text: `SEO settings for "${formData.pageName}" saved successfully!` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to save SEO settings.' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm(`Are you sure you want to reset SEO settings for "${formData.pageName}" to system defaults?`)) {
      return;
    }
    try {
      setSaving(true);
      await resetSeoMeta(formData.pageKey);
      
      const newMap = { ...seoRecordsMap };
      delete newMap[formData.pageKey];
      setSeoRecordsMap(newMap);

      populateFormForPage(formData.pageKey, newMap);
      setMessage({ type: 'success', text: `SEO settings for "${formData.pageName}" reset to default.` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to reset SEO settings.' });
    } finally {
      setSaving(false);
    }
  };

  // Filtered pages for selector
  const filteredPages = useMemo(() => {
    return allPagesList.filter((p) => {
      const matchesGroup = selectedGroupFilter === 'all' || p.group === selectedGroupFilter;
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.path.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGroup && matchesSearch;
    });
  }, [allPagesList, selectedGroupFilter, searchQuery]);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-semibold flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <span>Loading SEO & Meta Tag Management System...</span>
      </div>
    );
  }

  const isConfiguredInDb = Boolean(seoRecordsMap[selectedPageKey]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 font-sans">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🎯</span>
            <h1 className="text-2xl font-black tracking-tight text-white">
              SEO & Meta Tag Management
            </h1>
            <span className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-orange-500/30">
              Live System
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Configure dynamic Meta Titles, Descriptions, Keywords, Canonical URLs, Social Media Open Graph tags, and Robots instructions for all pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
            Total Pages: {allPagesList.length}
          </span>
          <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            Configured in DB: {Object.keys(seoRecordsMap).length}
          </span>
        </div>
      </div>

      {/* Global Status Message */}
      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-sm ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{message.type === 'success' ? '✓' : '⚠️'}</span>
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-xs underline font-normal hover:opacity-80">
            Dismiss
          </button>
        </div>
      )}

      {/* Page Selection Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'All Pages' },
              { id: 'main', label: 'Main Pages' },
              { id: 'service', label: 'Service Pages' },
              { id: 'blog', label: 'Blog Posts' },
              { id: 'portfolio', label: 'Portfolio Projects' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedGroupFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedGroupFilter === tab.id
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search page by name or key..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Page Selector Dropdown */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Select Page to Configure ({filteredPages.length} pages available)
          </label>
          <select
            value={selectedPageKey}
            onChange={(e) => handleSelectPage(e.target.value)}
            className="w-full px-4 py-2.5 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {filteredPages.map((page) => {
              const isConfigured = Boolean(seoRecordsMap[page.key]);
              return (
                <option key={page.key} value={page.key}>
                  {isConfigured ? '🟢 [Configured] ' : '⚪ [Default] '} {page.name} ({page.path})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Main Grid: Form + Live Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <span>⚙️</span> {formData.pageName}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Key: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-orange-600 font-bold">{formData.pageKey}</code>
              </p>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                isConfiguredInDb
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-amber-50 text-amber-700 border-amber-300'
              }`}
            >
              {isConfiguredInDb ? 'Saved in DB' : 'System Default'}
            </span>
          </div>

          {/* Meta Title */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-800">Page Title / Meta Title *</label>
              <span className={`text-[11px] font-semibold ${formData.title.length > 60 ? 'text-amber-600' : 'text-slate-400'}`}>
                {formData.title.length} / 60 chars (Recommended: 50-60)
              </span>
            </div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
              placeholder="e.g. CityScene Global - Enterprise Software & AI Solutions"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 font-medium"
              required
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-800">Meta Description *</label>
              <span className={`text-[11px] font-semibold ${formData.description.length > 160 ? 'text-amber-600' : 'text-slate-400'}`}>
                {formData.description.length} / 160 chars (Recommended: 120-160)
              </span>
            </div>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              placeholder="Provide a compelling summary for search engine results..."
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 font-medium"
              required
            />
          </div>

          {/* Meta Keywords */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Meta Keywords <span className="text-slate-400 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => handleFormChange('keywords', e.target.value)}
              placeholder="e.g. Artificial Intelligence, Custom Software, Web Development, Mobile Apps"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 font-medium"
            />
          </div>

          {/* Canonical URL */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-800">Canonical URL</label>
              <button
                type="button"
                onClick={() => {
                  const path = allPagesList.find((p) => p.key === formData.pageKey)?.path || '/';
                  handleFormChange('canonicalUrl', `${window.location.origin}${path}`);
                }}
                className="text-[11px] font-semibold text-orange-600 hover:underline"
              >
                Auto-fill domain URL
              </button>
            </div>
            <input
              type="url"
              value={formData.canonicalUrl}
              onChange={(e) => handleFormChange('canonicalUrl', e.target.value)}
              placeholder="https://citysceneglobal.com/services/custom-software-development"
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 font-medium"
            />
          </div>

          {/* Robots Meta Tag */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">Robots Meta Directive</label>
            <select
              value={formData.robots}
              onChange={(e) => handleFormChange('robots', e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 font-semibold"
            >
              <option value="index, follow">index, follow (Standard Public Indexing)</option>
              <option value="noindex, follow">noindex, follow (Hide page, follow links)</option>
              <option value="index, nofollow">index, nofollow (Index page, ignore links)</option>
              <option value="noindex, nofollow">noindex, nofollow (Block search engines completely)</option>
            </select>
          </div>

          <hr className="border-slate-200" />

          {/* Open Graph Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>🌐</span> Open Graph & Social Media Tags
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Open Graph Title</label>
              <input
                type="text"
                value={formData.ogTitle}
                onChange={(e) => handleFormChange('ogTitle', e.target.value)}
                placeholder="Title shown when sharing on LinkedIn, Twitter, Facebook..."
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Open Graph Description</label>
              <textarea
                rows="2"
                value={formData.ogDescription}
                onChange={(e) => handleFormChange('ogDescription', e.target.value)}
                placeholder="Description snippet for social media previews..."
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Open Graph Banner Image URL</label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => handleFormChange('ogImage', e.target.value)}
                  placeholder="https://images.unsplash.com/... or upload image"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 font-medium"
                />
                
                <div className="flex items-center gap-3">
                  <label className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 cursor-pointer transition inline-flex items-center gap-1.5">
                    <span>📷 Upload Banner Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  {uploading && <span className="text-xs text-orange-600 font-semibold animate-pulse">Uploading image...</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-200">
            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition"
            >
              Reset to Defaults
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md transition flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save SEO Settings</span>
              )}
            </button>
          </div>
        </form>

        {/* Right Column: Live Previews (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Google Search Preview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C6.721,2,2,6.721,2,12.545S6.721,23.09,12.545,23.09c6.536,0,10.849-4.596,10.849-11.042c0-0.741-0.074-1.282-0.18-1.809H12.545z" />
                </svg>
                Google Search Result Preview
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">LIVE PREVIEW</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-sans space-y-1">
              <div className="text-[11px] text-slate-600 truncate flex items-center gap-1">
                <span>citysceneglobal.com</span>
                <span className="text-slate-400">›</span>
                <span className="text-slate-500 truncate">{formData.canonicalUrl || 'https://citysceneglobal.com'}</span>
              </div>

              <div className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer line-clamp-2 leading-tight">
                {formData.title || 'Page Title Placeholder'}
              </div>

              <div className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                {formData.description || 'Meta description text snippet will appear here when users search on Google...'}
              </div>
            </div>
            
            <p className="text-[11px] text-slate-400 italic">
              * Simulated representation of how search engines display title and snippet.
            </p>
          </div>

          {/* Live Open Graph / Social Media Preview Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <span>💬</span> Social Media Share Preview (Open Graph)
              </h3>
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">OG CARD</span>
            </div>

            <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-900 text-white shadow-sm">
              {/* Banner Image */}
              <div className="h-44 bg-slate-800 relative overflow-hidden flex items-center justify-center">
                {formData.ogImage ? (
                  <img
                    src={formData.ogImage}
                    alt="Open Graph Banner"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-xs text-slate-400">No Open Graph Image Configured</span>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-4 bg-slate-900 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                  CITYSCENEGLOBAL.COM
                </span>

                <div className="text-sm font-bold text-white line-clamp-1">
                  {formData.ogTitle || formData.title || 'Social Card Title'}
                </div>

                <div className="text-xs text-slate-300 line-clamp-2 leading-snug">
                  {formData.ogDescription || formData.description || 'Social Card Description...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
