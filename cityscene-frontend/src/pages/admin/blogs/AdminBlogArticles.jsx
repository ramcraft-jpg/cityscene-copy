import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../../services/blogService';
import AdminHeroMediaControl from '../../../components/admin/AdminHeroMediaControl';

export default function AdminBlogArticles() {
  const [gridHeader, setGridHeader] = useState({
    heading: 'Latest Articles'
  });

  const [blogsList, setBlogsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
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

  const handleOpenAdd = () => {
    setIsAddMode(true);
    setSelectedBlog({
      title: '',
      id: '',
      slug: '',
      category: 'Artificial Intelligence',
      author: 'Vishwambhar Singh',
      authorAvatar: '/assets/images/author-vishwambhar.png',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      video: '',
      summary: '',
      content: '',
      order: blogsList.length + 1,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setIsAddMode(false);
    setSelectedBlog({ ...b, originalId: b.id || b.slug || b._id });
    setIsModalOpen(true);
  };

  const handleSaveBlog = async (e) => {
    e.preventDefault();
    if (!selectedBlog.title) return;

    try {
      setSaving(true);
      setMessage(null);
      if (isAddMode) {
        await createBlog(selectedBlog);
        setMessage({ type: 'success', text: 'Blog article created successfully.' });
      } else {
        const targetId = selectedBlog.originalId || selectedBlog.id || selectedBlog.slug || selectedBlog._id;
        await updateBlog(targetId, selectedBlog);
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

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Blog Articles Management...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>📰</span> BlogArticles Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage Blog Articles section title and complete CRUD for blog posts.
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

      {/* Grid Header Form */}
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

      {/* Blogs CRUD Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900">Blog Posts ({blogsList.length})</h2>
          <p className="text-xs text-slate-500">Manage blog titles, cover images, categories, publish date, read time, and publish status.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg shadow transition"
        >
          + Add New Blog
        </button>
      </div>

      {/* Blogs Table */}
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
                    <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
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
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
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

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-6 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {isAddMode ? 'Add New Blog Article' : `Edit Blog: ${selectedBlog.title}`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Blog Title</label>
                  <input
                    type="text"
                    value={selectedBlog.title || ''}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                    placeholder="e.g. Pioneering AI Solutions"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Slug URL Identifier</label>
                  <input
                    type="text"
                    value={selectedBlog.slug || ''}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, slug: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                    placeholder="e.g. pioneering-ai-solutions"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={selectedBlog.category || ''}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                    placeholder="e.g. Artificial Intelligence"
                    required
                  />
                </div>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Publish Date</label>
                  <input
                    type="text"
                    value={selectedBlog.date || ''}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, date: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                    placeholder="e.g. October 24, 2024"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={selectedBlog.readTime || ''}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, readTime: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                    placeholder="e.g. 5 min read"
                  />
                </div>
              </div>

              {/* Author Avatar Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Author Avatar Image</label>
                <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-900 shrink-0 border border-slate-300">
                    <img src={selectedBlog.authorAvatar || '/assets/images/author-vishwambhar.png'} alt="Author Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1 w-full">
                    <input
                      type="text"
                      value={selectedBlog.authorAvatar || ''}
                      onChange={(e) => setSelectedBlog({ ...selectedBlog, authorAvatar: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white"
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Excerpt / Summary</label>
                <textarea
                  rows="2"
                  value={selectedBlog.summary || ''}
                  onChange={(e) => setSelectedBlog({ ...selectedBlog, summary: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  placeholder="Short card summary text displayed in blog grid..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Article Body Content</label>
                <textarea
                  rows="6"
                  value={selectedBlog.content || ''}
                  onChange={(e) => setSelectedBlog({ ...selectedBlog, content: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-normal"
                  placeholder="Complete blog article body..."
                  required
                />
              </div>

              {/* Background Media Management for Blog Header/Hero */}
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
                      setSelectedBlog((prev) => ({
                        ...prev,
                        video: fileUrl,
                        heroVideo: fileUrl,
                        backgroundVideo: fileUrl,
                        backgroundMediaType: 'video'
                      }));
                    } else {
                      setSelectedBlog((prev) => ({
                        ...prev,
                        image: fileUrl,
                        backgroundImage: fileUrl,
                        backgroundMediaType: 'image'
                      }));
                    }
                    setMessage({ type: 'success', text: 'Media uploaded successfully.' });
                  } catch (err) {
                    setMessage({ type: 'error', text: err.message || 'Media upload failed.' });
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Publish Status</label>
                  <select
                    value={selectedBlog.isActive !== false ? 'true' : 'false'}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, isActive: e.target.value === 'true' })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="true">Published (Visible on Website)</option>
                    <option value="false">Draft (Hidden from Website)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow"
                >
                  {saving ? 'Saving...' : isAddMode ? 'Publish Blog' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Delete Blog Article</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Are you sure you want to delete <strong className="text-slate-900">{deleteTarget.title}</strong>? This will remove the article from MongoDB and the public Blogs page.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={saving}
                className="px-5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow transition"
              >
                {saving ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
