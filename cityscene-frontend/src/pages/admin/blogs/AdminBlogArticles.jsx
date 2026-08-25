import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../../services/blogService';
import { getMediaUrl } from '../../../utils/imageUrl';
import AdminHeroMediaControl from '../../../components/admin/AdminHeroMediaControl';
import ConfirmDeleteModal from '../../../components/admin/ConfirmDeleteModal';

export default function AdminBlogArticles() {
  const [gridHeader, setGridHeader] = useState({
    heading: 'Latest Articles'
  });

  const [blogsList, setBlogsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  // Modal & Tab states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' | 'content' | 'cta' | 'author' | 'seo'
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [headerRes, blogsRes] = await Promise.all([
        getHomeSectionContent('blog-grid-header').catch(() => null),
        getBlogs(true).catch(() => [])
      ]);

      if (headerRes && headerRes.heading) setGridHeader(headerRes);
      if (blogsRes) setBlogsList(blogsRes);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load blog articles.' });
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e, onSuccess) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const fileUrl = await uploadHomeMedia(file);
      onSuccess(fileUrl);
      setMessage({ type: 'success', text: 'Media uploaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Media upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveHeader = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('blog-grid-header', gridHeader);
      setMessage({ type: 'success', text: 'Grid header updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update grid header.' });
    } finally {
      setSaving(false);
    }
  };

  const generateSlugFromTitle = (titleText) => {
    if (!titleText) return '';
    return titleText
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleOpenAdd = () => {
    setIsAddMode(true);
    setActiveTab('basic');
    const defaultBlocks = [
      { id: `block-${Date.now()}-1`, type: 'paragraph', text: 'Enter main introductory paragraph for your article...' },
      { id: `block-${Date.now()}-2`, type: 'h2', text: 'Key Strategic Benefits' },
      { id: `block-${Date.now()}-3`, type: 'bullet_list', items: ['Increased operational efficiency', 'Enhanced customer experience', 'Accelerated ROI'] }
    ];

    setSelectedBlog({
      title: '',
      id: '',
      slug: '',
      category: 'IT Solutions',
      summary: '',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '4 min read',
      isActive: true,
      blocks: defaultBlocks,
      content: '',
      // CTA Fields
      ctaHeading: 'Optimize Your Website Today',
      ctaDescription: 'Partner with CityScene Global to transform your IT infrastructure and scale your digital capabilities.',
      ctaButtonText: 'Get Started',
      ctaButtonLink: '/contact',
      // Author Fields
      author: 'Vishwambhar Singh',
      authorAvatar: '/assets/images/author-vishwambhar.png',
      authorRole: 'Senior Tech Lead & Solution Architect',
      authorBio: 'Technology strategist and enterprise architect with 10+ years of experience leading digital transformation initiatives.',
      // SEO Fields
      seoTitle: '',
      seoDescription: '',
      focusKeyword: '',
      seoKeywords: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      order: blogsList.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setIsAddMode(false);
    setActiveTab('basic');

    // Parse blocks safely if stringified JSON
    let parsedBlocks = [];
    if (Array.isArray(b.blocks)) {
      parsedBlocks = b.blocks;
    } else if (typeof b.blocks === 'string' && b.blocks.trim()) {
      try {
        parsedBlocks = JSON.parse(b.blocks);
      } catch (e) {
        parsedBlocks = [];
      }
    }

    // Fallback block if empty
    if (parsedBlocks.length === 0 && (b.content || b.summary)) {
      parsedBlocks = [
        { id: `block-${Date.now()}-1`, type: 'paragraph', text: b.content ? b.content.replace(/<[^>]+>/g, '') : b.summary }
      ];
    }

    setSelectedBlog({
      ...b,
      blocks: parsedBlocks,
      authorRole: b.authorRole || 'Senior Tech Lead & Solution Architect',
      authorBio: b.authorBio || '',
      ctaHeading: b.ctaHeading || 'Optimize Your Website Today',
      ctaDescription: b.ctaDescription || '',
      ctaButtonText: b.ctaButtonText || 'Get Started',
      ctaButtonLink: b.ctaButtonLink || '/contact',
      seoTitle: b.seoTitle || b.title || '',
      seoDescription: b.seoDescription || b.summary || '',
      focusKeyword: b.focusKeyword || '',
      seoKeywords: b.seoKeywords || '',
      canonicalUrl: b.canonicalUrl || '',
      ogTitle: b.ogTitle || b.title || '',
      ogDescription: b.ogDescription || b.summary || '',
      ogImage: b.ogImage || b.image || '',
      originalId: b.id || b.slug || b._id
    });
    setIsModalOpen(true);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!selectedBlog.title) {
      setMessage({ type: 'error', text: 'Blog Title is required.' });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      // Auto-assign slug if missing
      const finalSlug = (selectedBlog.slug || generateSlugFromTitle(selectedBlog.title)).trim().toLowerCase();
      const blogPayload = {
        ...selectedBlog,
        slug: finalSlug,
        seoTitle: selectedBlog.seoTitle || selectedBlog.title,
        seoDescription: selectedBlog.seoDescription || selectedBlog.summary,
        ogTitle: selectedBlog.ogTitle || selectedBlog.title,
        ogDescription: selectedBlog.ogDescription || selectedBlog.summary,
        ogImage: selectedBlog.ogImage || selectedBlog.image
      };

      if (isAddMode) {
        await createBlog(blogPayload);
        setMessage({ type: 'success', text: 'Blog article created successfully.' });
      } else {
        const targetId = selectedBlog.originalId || selectedBlog.id || selectedBlog.slug || selectedBlog._id;
        await updateBlog(targetId, blogPayload);
        setMessage({ type: 'success', text: 'Blog article updated successfully.' });
      }
      setIsModalOpen(false);
      loadAllData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to save blog article.' });
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setSaving(true);
      setMessage(null);
      const targetId = deleteTarget.id || deleteTarget.slug || deleteTarget._id;
      await deleteBlog(targetId);
      setMessage({ type: 'success', text: 'Blog article deleted successfully.' });
      setDeleteTarget(null);
      loadAllData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete blog post.' });
    } finally {
      setSaving(false);
    }
  };

  // Block Editor Operations
  const handleAddBlock = (blockType) => {
    const newBlockId = `block-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    let newBlockObj = { id: newBlockId, type: blockType };

    switch (blockType) {
      case 'h2':
        newBlockObj.text = 'New Section Heading (H2)';
        break;
      case 'h3':
        newBlockObj.text = 'New Subheading (H3)';
        break;
      case 'bullet_list':
        newBlockObj.items = ['First bullet item', 'Second bullet item', 'Third bullet item'];
        break;
      case 'numbered_list':
        newBlockObj.items = ['Step 1: Planning', 'Step 2: Execution', 'Step 3: Optimization'];
        break;
      case 'image':
        newBlockObj.url = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
        newBlockObj.caption = 'Image caption description...';
        break;
      case 'quote':
        newBlockObj.text = 'Optimization is a continuous process that drives real transformation.';
        newBlockObj.author = 'Tech Innovation Digest';
        break;
      case 'callout':
        newBlockObj.text = 'Pro Tip: Ensure key conversational keywords are integrated into top headings.';
        break;
      case 'divider':
        break;
      case 'paragraph':
      default:
        newBlockObj.text = 'Enter text paragraph content...';
        break;
    }

    setSelectedBlog((prev) => ({
      ...prev,
      blocks: [...(prev.blocks || []), newBlockObj]
    }));
  };

  const handleUpdateBlock = (index, updatedBlock) => {
    setSelectedBlog((prev) => {
      const newBlocks = [...(prev.blocks || [])];
      newBlocks[index] = updatedBlock;
      return { ...prev, blocks: newBlocks };
    });
  };

  const handleDeleteBlock = (index) => {
    setSelectedBlog((prev) => {
      const newBlocks = [...(prev.blocks || [])];
      newBlocks.splice(index, 1);
      return { ...prev, blocks: newBlocks };
    });
  };

  const handleMoveBlock = (index, direction) => {
    setSelectedBlog((prev) => {
      const newBlocks = [...(prev.blocks || [])];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newBlocks.length) return prev;

      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[targetIndex];
      newBlocks[targetIndex] = temp;

      return { ...prev, blocks: newBlocks };
    });
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Blog Articles Management...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>📰</span> Blogs Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Create, edit, and configure complete blog articles with rich dynamic content blocks, CTA sections, author profiles, and SEO metadata.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-sm ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-xs underline font-normal">Dismiss</button>
        </div>
      )}

      {/* Grid Header Title Form */}
      <form onSubmit={handleSaveHeader} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Grid Header Title</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={gridHeader.heading || ''}
            onChange={(e) => setGridHeader({ ...gridHeader, heading: e.target.value })}
            className="flex-1 px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            placeholder="Latest Articles"
            required
          />
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-lg shadow transition"
          >
            Save Title
          </button>
        </div>
      </form>

      {/* Blogs Table Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900">Blog Posts ({blogsList.length})</h2>
          <p className="text-xs text-slate-500">Manage all public and draft blog posts, content structure, CTA, and SEO.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg shadow transition flex items-center gap-1.5"
        >
          <span>➕</span>
          <span>Add New Blog</span>
        </button>
      </div>

      {/* Blogs List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-900 uppercase font-bold border-b border-slate-200">
            <tr>
              <th className="p-3.5">Cover</th>
              <th className="p-3.5">Title / Slug</th>
              <th className="p-3.5">Category / Author</th>
              <th className="p-3.5">Date / Read Time</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {blogsList.map((b) => (
              <tr key={b.id || b.slug || b._id} className="hover:bg-slate-50 transition">
                <td className="p-3.5">
                  <div className="w-14 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-300">
                    <img src={getMediaUrl(b.image)} alt={b.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="p-3.5 max-w-xs">
                  <p className="font-bold text-slate-900 line-clamp-1">{b.title}</p>
                  <p className="text-[11px] text-slate-400 font-mono">/blog/{b.slug}</p>
                </td>
                <td className="p-3.5">
                  <span className="text-[10px] bg-orange-50 text-orange-700 font-bold px-2 py-0.5 rounded border border-orange-200">
                    {b.category}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{b.author || 'CityScene Tech Team'}</p>
                </td>
                <td className="p-3.5">
                  <p className="font-semibold text-slate-800">{b.date}</p>
                  <p className="text-[11px] text-slate-400">{b.readTime}</p>
                </td>
                <td className="p-3.5 text-center">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      b.isActive !== false
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {b.isActive !== false ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] rounded transition shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteTarget(b)}
                    className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-[11px] rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FULL BLOG EDITOR MODAL */}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {isAddMode ? 'Create New Blog Article' : `Editing Blog: ${selectedBlog.title}`}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Slug: /blog/{selectedBlog.slug || 'autogenerated-slug'}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xl p-1"
              >
                ✕
              </button>
            </div>

            {/* TAB NAVIGATION BAR */}
            <div className="flex items-center gap-1 px-6 pt-3 bg-slate-100/60 border-b border-slate-200 overflow-x-auto shrink-0">
              {[
                { id: 'basic', label: '📋 Basic Information' },
                { id: 'content', label: `📝 Content Editor (${(selectedBlog.blocks || []).length} blocks)` },
                { id: 'cta', label: '🚀 CTA Section' },
                { id: 'author', label: '👤 Author Info' },
                { id: 'seo', label: '🔍 SEO Settings' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-t border-x shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-white text-orange-600 border-slate-300 border-b-white -mb-px shadow-sm'
                      : 'bg-transparent text-slate-600 hover:text-slate-900 border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* MODAL BODY (TAB CONTENT) */}
            <form onSubmit={handleSaveBlog} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto flex-1 space-y-6">

                {/* TAB 1: BASIC INFORMATION */}
                {activeTab === 'basic' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Blog Title *</label>
                        <input
                          type="text"
                          value={selectedBlog.title || ''}
                          onChange={(e) => {
                            const newTitle = e.target.value;
                            setSelectedBlog((prev) => ({
                              ...prev,
                              title: newTitle,
                              slug: isAddMode ? generateSlugFromTitle(newTitle) : prev.slug
                            }));
                          }}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                          placeholder="e.g. How to Optimize Your Website for Voice Search & AI Assistants"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug *</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={selectedBlog.slug || ''}
                            onChange={(e) => setSelectedBlog({ ...selectedBlog, slug: e.target.value })}
                            className="flex-1 px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            placeholder="how-to-optimize-your-website-for-voice-search-ai-assistants"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setSelectedBlog({ ...selectedBlog, slug: generateSlugFromTitle(selectedBlog.title) })}
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg shrink-0"
                            title="Auto-generate from title"
                          >
                            Auto
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Blog Category</label>
                        <input
                          type="text"
                          value={selectedBlog.category || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, category: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                          placeholder="e.g. IT Solutions"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Publish Date</label>
                        <input
                          type="text"
                          value={selectedBlog.date || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, date: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                          placeholder="e.g. February 7, 2025"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Read Time</label>
                        <input
                          type="text"
                          value={selectedBlog.readTime || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, readTime: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                          placeholder="e.g. 3 min read"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Short Description / Excerpt</label>
                      <textarea
                        rows="3"
                        value={selectedBlog.summary || ''}
                        onChange={(e) => setSelectedBlog({ ...selectedBlog, summary: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        placeholder="Brief summary shown on blog cards and search engines..."
                        required
                      />
                    </div>

                    {/* Hero Media Control */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Featured Hero Cover Image / Video</label>
                      <AdminHeroMediaControl
                        mediaType={selectedBlog.backgroundMediaType || (selectedBlog.heroVideo || selectedBlog.video ? 'video' : 'image')}
                        imageUrl={selectedBlog.image || selectedBlog.backgroundImage || ''}
                        videoUrl={selectedBlog.video || selectedBlog.heroVideo || selectedBlog.backgroundVideo || ''}
                        onChangeMediaType={(type) => setSelectedBlog({ ...selectedBlog, backgroundMediaType: type })}
                        onChangeImage={(url) => setSelectedBlog({ ...selectedBlog, image: url, backgroundImage: url })}
                        onChangeVideo={(url) => setSelectedBlog({ ...selectedBlog, video: url, heroVideo: url, backgroundVideo: url })}
                        uploading={uploading}
                        onUpload={async (file, type) => {
                          if (!file) return;
                          try {
                            setUploading(true);
                            const fileUrl = await uploadHomeMedia(file);
                            if (type === 'video') {
                              setSelectedBlog((prev) => ({ ...prev, video: fileUrl, heroVideo: fileUrl, backgroundVideo: fileUrl, backgroundMediaType: 'video' }));
                            } else {
                              setSelectedBlog((prev) => ({ ...prev, image: fileUrl, backgroundImage: fileUrl, backgroundMediaType: 'image' }));
                            }
                            setMessage({ type: 'success', text: 'Featured media uploaded successfully.' });
                          } catch (err) {
                            setMessage({ type: 'error', text: err.message || 'Upload failed.' });
                          } finally {
                            setUploading(false);
                          }
                        }}
                        onRemoveMedia={(type) => {
                          if (type === 'video') {
                            setSelectedBlog({ ...selectedBlog, video: '', heroVideo: '', backgroundVideo: '', backgroundMediaType: 'image' });
                          } else {
                            setSelectedBlog({ ...selectedBlog, image: '', backgroundImage: '' });
                          }
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                        <input
                          type="number"
                          value={selectedBlog.order || 0}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, order: parseInt(e.target.value) || 0 })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Blog Status</label>
                        <select
                          value={selectedBlog.isActive !== false ? 'true' : 'false'}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, isActive: e.target.value === 'true' })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white font-bold"
                        >
                          <option value="true">🟢 Published (Visible on Public Website)</option>
                          <option value="false">🟡 Draft (Hidden from Public Website)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: DYNAMIC CONTENT BLOCK EDITOR */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Content Block Builder</h4>
                        <p className="text-[11px] text-slate-500">Add, edit, delete, and reorder dynamic content blocks for this article.</p>
                      </div>

                      {/* Add Block Dropdown / Quick Buttons */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button type="button" onClick={() => handleAddBlock('paragraph')} className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded-lg">
                          + Paragraph
                        </button>
                        <button type="button" onClick={() => handleAddBlock('h2')} className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded-lg">
                          + H2 Heading
                        </button>
                        <button type="button" onClick={() => handleAddBlock('h3')} className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded-lg">
                          + H3 Subheading
                        </button>
                        <button type="button" onClick={() => handleAddBlock('bullet_list')} className="px-2.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-bold rounded-lg">
                          + Bullet List
                        </button>
                        <button type="button" onClick={() => handleAddBlock('numbered_list')} className="px-2.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-bold rounded-lg">
                          + Numbered List
                        </button>
                        <button type="button" onClick={() => handleAddBlock('image')} className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg">
                          + Image
                        </button>
                        <button type="button" onClick={() => handleAddBlock('quote')} className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold rounded-lg">
                          + Quote
                        </button>
                        <button type="button" onClick={() => handleAddBlock('callout')} className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg">
                          + Callout
                        </button>
                        <button type="button" onClick={() => handleAddBlock('divider')} className="px-2.5 py-1.5 bg-slate-600 hover:bg-slate-700 text-white text-[11px] font-bold rounded-lg">
                          + Divider
                        </button>
                      </div>
                    </div>

                    {/* Block List */}
                    {(!selectedBlog.blocks || selectedBlog.blocks.length === 0) ? (
                      <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
                        <p className="text-sm font-semibold">No content blocks added yet.</p>
                        <p className="text-xs mt-1">Click any button above to add paragraphs, headings, lists, images, quotes, or callouts.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedBlog.blocks.map((block, idx) => (
                          <div key={block.id || idx} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3 relative group">
                            {/* Block Header Controls */}
                            <div className="flex items-center justify-between bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-mono font-bold text-slate-400">#{idx + 1}</span>
                                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">
                                  {block.type}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => handleMoveBlock(idx, 'up')}
                                  disabled={idx === 0}
                                  className="px-2 py-0.5 text-xs bg-slate-200 hover:bg-slate-300 disabled:opacity-30 rounded font-bold"
                                  title="Move Up"
                                >
                                  ↑
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleMoveBlock(idx, 'down')}
                                  disabled={idx === selectedBlog.blocks.length - 1}
                                  className="px-2 py-0.5 text-xs bg-slate-200 hover:bg-slate-300 disabled:opacity-30 rounded font-bold"
                                  title="Move Down"
                                >
                                  ↓
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteBlock(idx)}
                                  className="px-2 py-0.5 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded font-bold ml-2"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>

                            {/* Block Type Fields */}
                            {block.type === 'h2' && (
                              <div>
                                <label className="block text-[11px] font-bold text-slate-600 mb-1">H2 Heading Text</label>
                                <input
                                  type="text"
                                  value={block.text || ''}
                                  onChange={(e) => handleUpdateBlock(idx, { ...block, text: e.target.value })}
                                  className="w-full px-3 py-1.5 text-sm font-bold text-slate-900 border border-slate-300 rounded-lg"
                                  placeholder="Why Voice Search Optimization Matters"
                                />
                              </div>
                            )}

                            {block.type === 'h3' && (
                              <div>
                                <label className="block text-[11px] font-bold text-slate-600 mb-1">H3 Subheading Text</label>
                                <input
                                  type="text"
                                  value={block.text || ''}
                                  onChange={(e) => handleUpdateBlock(idx, { ...block, text: e.target.value })}
                                  className="w-full px-3 py-1.5 text-sm font-semibold text-slate-800 border border-slate-300 rounded-lg"
                                  placeholder="Focus on Conversational Keywords"
                                />
                              </div>
                            )}

                            {(block.type === 'bullet_list' || block.type === 'numbered_list') && (
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <label className="block text-[11px] font-bold text-slate-600">
                                    {block.type === 'bullet_list' ? 'Bullet Items (One per line)' : 'Numbered Steps (One per line)'}
                                  </label>
                                </div>
                                <textarea
                                  rows="3"
                                  value={Array.isArray(block.items) ? block.items.join('\n') : (block.text || '')}
                                  onChange={(e) => {
                                    const lines = e.target.value.split('\n');
                                    handleUpdateBlock(idx, { ...block, items: lines, text: e.target.value });
                                  }}
                                  className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg"
                                  placeholder="Item 1&#10;Item 2&#10;Item 3"
                                />
                              </div>
                            )}

                            {block.type === 'image' && (
                              <div className="space-y-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Image URL</label>
                                    <input
                                      type="text"
                                      value={block.url || block.image || ''}
                                      onChange={(e) => handleUpdateBlock(idx, { ...block, url: e.target.value })}
                                      className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded-lg"
                                      placeholder="https://..."
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Or Upload Image File</label>
                                    <label className="cursor-pointer px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg inline-flex items-center gap-1">
                                      <span>📤 Upload Image</span>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleMediaUpload(e, (url) => handleUpdateBlock(idx, { ...block, url }))}
                                        disabled={uploading}
                                        className="hidden"
                                      />
                                    </label>
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Caption / Alt Description</label>
                                  <input
                                    type="text"
                                    value={block.caption || ''}
                                    onChange={(e) => handleUpdateBlock(idx, { ...block, caption: e.target.value })}
                                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                                    placeholder="Descriptive image caption..."
                                  />
                                </div>
                              </div>
                            )}

                            {block.type === 'quote' && (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="md:col-span-2">
                                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Quote Text</label>
                                  <textarea
                                    rows="2"
                                    value={block.text || ''}
                                    onChange={(e) => handleUpdateBlock(idx, { ...block, text: e.target.value })}
                                    className="w-full px-3 py-1.5 text-xs italic border border-slate-300 rounded-lg"
                                    placeholder="Featured quotation..."
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Author / Source Attribution</label>
                                  <input
                                    type="text"
                                    value={block.author || ''}
                                    onChange={(e) => handleUpdateBlock(idx, { ...block, author: e.target.value })}
                                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                                    placeholder="e.g. Industry Expert"
                                  />
                                </div>
                              </div>
                            )}

                            {block.type === 'callout' && (
                              <div>
                                <label className="block text-[11px] font-bold text-slate-600 mb-1">Callout Box Text</label>
                                <textarea
                                  rows="2"
                                  value={block.text || ''}
                                  onChange={(e) => handleUpdateBlock(idx, { ...block, text: e.target.value })}
                                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                                  placeholder="Highlighted tip or notice text..."
                                />
                              </div>
                            )}

                            {block.type === 'divider' && (
                              <div className="py-2 text-center text-xs text-slate-400 font-mono">
                                ——— Horizontal Divider Line ———
                              </div>
                            )}

                            {(block.type === 'paragraph' || block.type === 'text_paragraph' || !['h2', 'h3', 'bullet_list', 'numbered_list', 'image', 'quote', 'callout', 'divider'].includes(block.type)) && (
                              <div>
                                <label className="block text-[11px] font-bold text-slate-600 mb-1">Paragraph Text</label>
                                <textarea
                                  rows="3"
                                  value={block.text || ''}
                                  onChange={(e) => handleUpdateBlock(idx, { ...block, text: e.target.value })}
                                  className="w-full px-3 py-1.5 text-xs leading-relaxed border border-slate-300 rounded-lg"
                                  placeholder="Enter main text paragraph content..."
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: CTA SECTION */}
                {activeTab === 'cta' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">End-of-Article Call-To-Action (CTA)</h4>
                      <p className="text-[11px] text-slate-500">Configure the conversion card displayed at the bottom of this blog article.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CTA Heading</label>
                      <input
                        type="text"
                        value={selectedBlog.ctaHeading || ''}
                        onChange={(e) => setSelectedBlog({ ...selectedBlog, ctaHeading: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="e.g. Optimize Your Website Today"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CTA Description</label>
                      <textarea
                        rows="3"
                        value={selectedBlog.ctaDescription || ''}
                        onChange={(e) => setSelectedBlog({ ...selectedBlog, ctaDescription: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="Partner with CityScene Global to transform your IT infrastructure..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Text</label>
                        <input
                          type="text"
                          value={selectedBlog.ctaButtonText || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, ctaButtonText: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                          placeholder="e.g. Get Started"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Link</label>
                        <input
                          type="text"
                          value={selectedBlog.ctaButtonLink || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, ctaButtonLink: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                          placeholder="e.g. /contact"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: AUTHOR INFORMATION */}
                {activeTab === 'author' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Author Profile Settings</h4>
                      <p className="text-[11px] text-slate-500">Configure author details displayed at the bottom of the article.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Author Name</label>
                        <input
                          type="text"
                          value={selectedBlog.author || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, author: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                          placeholder="e.g. Vishwambhar Singh"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Author Designation / Role</label>
                        <input
                          type="text"
                          value={selectedBlog.authorRole || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, authorRole: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                          placeholder="e.g. Senior Tech Lead & Solution Architect"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Author Avatar Profile Image</label>
                      <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-900 shrink-0 border border-slate-300">
                          <img src={getMediaUrl(selectedBlog.authorAvatar || '/assets/images/author-vishwambhar.png')} alt="Author Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-1 w-full">
                          <input
                            type="text"
                            value={selectedBlog.authorAvatar || ''}
                            onChange={(e) => setSelectedBlog({ ...selectedBlog, authorAvatar: e.target.value })}
                            className="w-full px-3 py-1.5 text-xs font-mono border border-slate-300 rounded bg-white"
                            placeholder="/assets/images/author-vishwambhar.png"
                          />
                          <label className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded inline-block">
                            {uploading ? 'Uploading...' : 'Replace Avatar Image'}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleMediaUpload(e, (url) => setSelectedBlog({ ...selectedBlog, authorAvatar: url }))}
                              disabled={uploading}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Author Bio (Optional)</label>
                      <textarea
                        rows="3"
                        value={selectedBlog.authorBio || ''}
                        onChange={(e) => setSelectedBlog({ ...selectedBlog, authorBio: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="Brief bio describing author's background and expertise..."
                      />
                    </div>
                  </div>
                )}

                {/* TAB 5: SEO SETTINGS */}
                {activeTab === 'seo' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Search Engine Optimization (SEO) & Open Graph</h4>
                      <p className="text-[11px] text-slate-500">Configure page title, meta description, keywords, and social sharing metadata.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">SEO Title</label>
                        <input
                          type="text"
                          value={selectedBlog.seoTitle || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, seoTitle: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                          placeholder="Defaults to Blog Title if left empty"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Focus Keyword</label>
                        <input
                          type="text"
                          value={selectedBlog.focusKeyword || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, focusKeyword: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                          placeholder="e.g. voice search optimization"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description</label>
                      <textarea
                        rows="2"
                        value={selectedBlog.seoDescription || ''}
                        onChange={(e) => setSelectedBlog({ ...selectedBlog, seoDescription: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="Summarize the article in 150-160 characters for search results..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">SEO Keywords (Comma Separated)</label>
                        <input
                          type="text"
                          value={selectedBlog.seoKeywords || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, seoKeywords: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                          placeholder="e.g. voice search, AI assistants, SEO, IT solutions"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Canonical URL (Optional)</label>
                        <input
                          type="text"
                          value={selectedBlog.canonicalUrl || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, canonicalUrl: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                          placeholder="https://citysceneglobal.com/blog/..."
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-4 space-y-4">
                      <h4 className="text-xs font-bold text-slate-800">Open Graph Social Meta (Facebook / LinkedIn / Twitter)</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Open Graph Title</label>
                          <input
                            type="text"
                            value={selectedBlog.ogTitle || ''}
                            onChange={(e) => setSelectedBlog({ ...selectedBlog, ogTitle: e.target.value })}
                            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                            placeholder="OG Title..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Open Graph Image URL</label>
                          <input
                            type="text"
                            value={selectedBlog.ogImage || ''}
                            onChange={(e) => setSelectedBlog({ ...selectedBlog, ogImage: e.target.value })}
                            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                            placeholder="https://..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Open Graph Description</label>
                        <textarea
                          rows="2"
                          value={selectedBlog.ogDescription || ''}
                          onChange={(e) => setSelectedBlog({ ...selectedBlog, ogDescription: e.target.value })}
                          className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                          placeholder="OG Description..."
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* MODAL FOOTER */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
                <div className="text-xs text-slate-500 font-mono">
                  {selectedBlog.isActive !== false ? '🟢 Status: Published' : '🟡 Status: Draft'}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-md transition disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : isAddMode ? 'Publish Article' : 'Save All Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Blog Article"
        itemName={deleteTarget?.title || 'Article'}
        isDeleting={saving}
      />
    </div>
  );
}
