import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, createProject, deleteProject } from '../../../services/projectService';
import { getMediaUrl } from '../../../utils/imageUrl';
import { Plus, Edit, Trash2, MapPin, Tag, Layers, RefreshCw } from 'lucide-react';
import ConfirmDeleteModal from '../../../components/admin/ConfirmDeleteModal';
import ImageInputField from '../../../components/admin/ImageInputField';
import { AdminLoadingState, AdminEmptyState } from '../../../components/admin/AdminStateFeedback';

export default function AdminPortfolioProjects() {
  const navigate = useNavigate();
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);

  // New Project Creation State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    slug: '',
    category: 'IT Solutions',
    location: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setMessage(null);
      const data = await getProjects(true);
      if (data) setProjectsList(data);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load projects.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNewProject = async (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    const cleanSlug = (newProject.slug || newProject.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
      setSaving(true);
      setMessage(null);
      await createProject({
        ...newProject,
        id: cleanSlug,
        slug: cleanSlug,
        order: projectsList.length + 1,
        isActive: true
      });
      setIsAddModalOpen(false);
      setNewProject({
        title: '',
        slug: '',
        category: 'IT Solutions',
        location: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
      });
      navigate(`/admin/projects/${cleanSlug}`);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to create new project.' });
    } finally {
      setSaving(false);
    }
  };

  const confirmDeleteProject = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await deleteProject(deleteTarget.id);
      setMessage({ type: 'success', text: `✓ Project "${deleteTarget.title}" permanently deleted.` });
      setDeleteTarget(null);
      loadProjects();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete project.' });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <AdminLoadingState message="Loading Portfolio Projects Management..." />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📂</span> Portfolio & Projects Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage all project cards displayed on the public website. Click any card to edit its unique details.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadProjects}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
            title="Refresh Projects List"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add New Project
          </button>
        </div>
      </div>

      {/* Alert Banner */}
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

      {/* Projects Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsList.map((proj) => {
          const projectId = proj.id || proj.slug || proj._id;
          return (
            <div
              key={projectId}
              onClick={() => navigate(`/admin/projects/${projectId}`)}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer relative"
            >
              {/* Cover Image */}
              <div className="h-52 w-full bg-slate-900 overflow-hidden relative">
                <img
                  src={getMediaUrl(proj.image)}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x250?text=Project+Cover';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Active Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow ${
                      proj.isActive !== false
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {proj.isActive !== false ? 'Active' : 'Draft'}
                  </span>
                </div>

                {/* Slug Tag */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/20">
                    /portfolio/{proj.slug || projectId}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 mb-1.5">
                    {proj.category && (
                      <span className="flex items-center gap-1 text-orange-600">
                        <Tag className="w-3 h-3" /> {proj.category}
                      </span>
                    )}
                    {proj.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {proj.location}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3 font-normal">
                    {proj.description || proj.summary || 'No description provided for this project card.'}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    Order: {proj.order || 0}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget({ id: projectId, title: proj.title });
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/projects/${projectId}`);
                      }}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition flex items-center gap-1 shadow"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {projectsList.length === 0 && (
        <AdminEmptyState
          title="No Project Cards found"
          description="Create your first portfolio project to display on the public website."
          actionText="Add New Project"
          onAction={() => setIsAddModalOpen(true)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDeleteProject}
        title="Delete Portfolio Project"
        itemName={deleteTarget?.title || 'Project'}
        isDeleting={deleting}
      />

      {/* Add New Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Add New Project Card</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                  placeholder="e.g. Commercial AI Infrastructure"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug (Optional)</label>
                <input
                  type="text"
                  value={newProject.slug}
                  onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                  placeholder="e.g. commercial-ai-infrastructure"
                />
                <p className="text-[10px] text-slate-400 mt-1">If left empty, auto-generated from title.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    placeholder="e.g. Enterprise Software"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg"
                    placeholder="e.g. Jaipur, India"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Description *</label>
                <textarea
                  rows="3"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  placeholder="Brief summary displayed on portfolio grid..."
                  required
                />
              </div>

              <ImageInputField
                label="Project Cover Image URL"
                value={newProject.image}
                onChange={(url) => setNewProject({ ...newProject, image: url })}
              />

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow transition disabled:opacity-50"
                >
                  {saving ? 'Creating...' : 'Create & Edit Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
