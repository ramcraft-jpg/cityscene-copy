import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProjectBySlug, updateProject, deleteProject } from '../../../services/projectService';
import { uploadHomeMedia } from '../../../services/homeContentService';
import { getMediaUrl } from '../../../utils/imageUrl';
import { ArrowLeft, Save, Trash2, Plus, X, Image as ImageIcon } from 'lucide-react';

export default function AdminProjectDetailEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const [projectData, setProjectData] = useState({
    id: id || '',
    title: '',
    slug: id || '',
    category: 'IT Solutions',
    location: '',
    image: '',
    description: '',
    summary: '',
    systemOverview: '',
    capacity: '',
    clientName: '',
    technologies: [],
    gallery: [],
    order: 0,
    isActive: true
  });

  const [newTechText, setNewTechText] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const data = await getProjectBySlug(id);
      if (data) {
        setProjectData({
          ...data,
          technologies: Array.isArray(data.technologies) ? data.technologies : [],
          gallery: Array.isArray(data.gallery) ? data.gallery : []
        });
      } else {
        setMessage({ type: 'error', text: `Project with ID or Slug '${id}' not found.` });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error loading project details.' });
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e, fieldKey = 'image') => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const fileUrl = await uploadHomeMedia(file);
      if (fieldKey === 'gallery') {
        setProjectData((prev) => ({
          ...prev,
          gallery: [...(prev.gallery || []), fileUrl]
        }));
      } else {
        setProjectData((prev) => ({ ...prev, [fieldKey]: fileUrl }));
      }
      setMessage({ type: 'success', text: 'Media uploaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Media upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleAddTech = () => {
    if (!newTechText.trim()) return;
    setProjectData((prev) => ({
      ...prev,
      technologies: [...(prev.technologies || []), newTechText.trim()]
    }));
    setNewTechText('');
  };

  const handleRemoveTech = (index) => {
    setProjectData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, idx) => idx !== index)
    }));
  };

  const handleAddGallery = () => {
    if (!newGalleryUrl.trim()) return;
    setProjectData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), newGalleryUrl.trim()]
    }));
    setNewGalleryUrl('');
  };

  const handleRemoveGallery = (index) => {
    setProjectData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, idx) => idx !== index)
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateProject(projectData.id || id, projectData);
      setMessage({ type: 'success', text: 'Project updated successfully! Changes are live on the public website.' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.message || 'Failed to update project.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${projectData.title || id}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteProject(projectData.id || id);
      navigate('/admin/projects', { replace: true });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete project.' });
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold">
        Loading Project Details for <span className="font-mono text-slate-900">{id}</span>...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-orange-600 transition mb-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Projects
          </Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📁</span> Edit Project: <span className="text-orange-600">{projectData.title || id}</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Editing unique project data for ID / Slug: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">{projectData.slug || projectData.id}</code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      {/* Alert Message */}
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

      {/* Main Edit Form */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* Meta Fields: Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Project Title</label>
            <input
              type="text"
              value={projectData.title || ''}
              onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
              placeholder="e.g. Commercial Solar Energy Plant"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug</label>
            <input
              type="text"
              value={projectData.slug || ''}
              onChange={(e) => setProjectData({ ...projectData, slug: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
              placeholder="e.g. commercial-solar-energy-plant"
              required
            />
          </div>
        </div>

        {/* Category, Location, Client */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
            <input
              type="text"
              value={projectData.category || ''}
              onChange={(e) => setProjectData({ ...projectData, category: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              placeholder="e.g. Smart Infrastructure"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
            <input
              type="text"
              value={projectData.location || ''}
              onChange={(e) => setProjectData({ ...projectData, location: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              placeholder="e.g. Rajasthan, India"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Client Name</label>
            <input
              type="text"
              value={projectData.clientName || ''}
              onChange={(e) => setProjectData({ ...projectData, clientName: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              placeholder="e.g. Sunscope Capital"
            />
          </div>
        </div>

        {/* Cover Image Upload & URL */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Project Cover Image</label>
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="w-44 h-32 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300 relative flex items-center justify-center">
              {projectData.image ? (
                <img
                  src={getMediaUrl(projectData.image)}
                  alt="Project preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
              ) : (
                <div className="text-slate-400 text-xs font-medium flex flex-col items-center gap-1">
                  <ImageIcon className="w-5 h-5 text-slate-400" />
                  <span>No Image</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-2 w-full">
              <input
                type="text"
                value={projectData.image || ''}
                onChange={(e) => setProjectData({ ...projectData, image: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                placeholder="e.g. /uploads/project.jpg or https://..."
              />
              <label className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1.5">
                <span>📷</span>
                <span>{uploading ? 'Uploading...' : 'Replace Cover Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMediaUpload(e, 'image')}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Short Description (Card Summary)</label>
          <textarea
            rows="3"
            value={projectData.description || ''}
            onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            placeholder="Brief description displayed on portfolio grid cards..."
            required
          />
        </div>

        {/* System Overview / Full Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">System Overview / Details</label>
            <textarea
              rows="4"
              value={projectData.systemOverview || ''}
              onChange={(e) => setProjectData({ ...projectData, systemOverview: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              placeholder="Detailed technical system overview..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Capacity / Key Metric</label>
            <input
              type="text"
              value={projectData.capacity || ''}
              onChange={(e) => setProjectData({ ...projectData, capacity: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg mb-3"
              placeholder="e.g. 50MW Power Generation / 100K Users"
            />
            <label className="block text-xs font-bold text-slate-700 mb-1">Executive Summary</label>
            <textarea
              rows="2"
              value={projectData.summary || ''}
              onChange={(e) => setProjectData({ ...projectData, summary: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              placeholder="High level impact summary..."
            />
          </div>
        </div>

        {/* Technologies List */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Technologies Used</label>
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTechText}
                onChange={(e) => setNewTechText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                placeholder="Add technology (e.g. React, Node.js, IoT Sensors)..."
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <ul className="flex flex-wrap gap-2">
              {(projectData.technologies || []).map((tech, idx) => (
                <li key={idx} className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800">
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(idx)}
                    className="text-slate-400 hover:text-red-600 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
              {(!projectData.technologies || projectData.technologies.length === 0) && (
                <p className="text-xs text-slate-400 italic">No technologies added yet.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Gallery Images List */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Project Gallery Images</label>
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                placeholder="Image URL or path..."
              />
              <button
                type="button"
                onClick={handleAddGallery}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add URL
              </button>
              <label className="cursor-pointer px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1">
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMediaUpload(e, 'gallery')}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(projectData.gallery || []).map((imgUrl, idx) => (
                <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-300 group">
                  <img src={getMediaUrl(imgUrl)} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveGallery(idx)}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100 transition shadow"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Display Order & Active Checkbox */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Display Order Index</label>
            <input
              type="number"
              value={projectData.order ?? 0}
              onChange={(e) => setProjectData({ ...projectData, order: parseInt(e.target.value, 10) || 0 })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="isActive"
              checked={!!projectData.isActive}
              onChange={(e) => setProjectData({ ...projectData, isActive: e.target.checked })}
              className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
            />
            <label htmlFor="isActive" className="text-sm font-bold text-slate-800 cursor-pointer">
              Active / Visible on Public Website
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-200">
          <Link
            to="/admin/projects"
            className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving Project Changes...' : 'Save Project Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
