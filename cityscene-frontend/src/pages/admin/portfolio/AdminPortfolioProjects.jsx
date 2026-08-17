import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import { getProjects, createProject, updateProject, deleteProject } from '../../../services/projectService';
import AdminHeroMediaControl from '../../../components/admin/AdminHeroMediaControl';

export default function AdminPortfolioProjects() {
  const [gridHeader, setGridHeader] = useState({
    heading: 'Our Projects'
  });

  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  // Modal state & tab
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('card'); // 'card' | 'overview' | 'modules' | 'valueProps' | 'execution'
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [headerRes, projectsRes] = await Promise.all([
        getHomeSectionContent('portfolio-grid-header').catch(() => null),
        getProjects(true).catch(() => [])
      ]);

      if (headerRes && headerRes.heading) setGridHeader(headerRes);
      if (projectsRes) setProjectsList(projectsRes);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load portfolio projects list.' });
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
      await updateHomeSectionContent('portfolio-grid-header', gridHeader);
      setMessage({ type: 'success', text: 'Grid header updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update grid header.' });
    } finally {
      setSaving(false);
    }
  };

  const handleOpenAdd = () => {
    setIsAddMode(true);
    setModalTab('card');
    setSelectedProject({
      title: '',
      id: '',
      slug: '',
      category: 'AI & Smart Cities',
      client: 'Enterprise Client',
      duration: '6 Months',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      titleSystem: '',
      video: '',
      shortDesc: '',
      fullDesc: '',
      systemOverviewText: '',
      technologiesText: '',
      keyFeaturesText: '',
      modulesTitle: 'Sales & Delivery Modules',
      summaryNote: 'From lead capture to delivery confirmation, system ensures accuracy, speed, and transparency.',
      capabilities: [
        { title: 'Lead & Sales Management', description: 'Multi-channel lead capture, BANT scoring, and analytics.' },
        { title: 'Delivery & Logistics', description: 'Partial shipments, courier integrations, GPS tracking.' }
      ],
      valuePropositions: [
        { title: 'Unified Data Model', description: 'Single source of truth across sales, projects, and finance.' },
        { title: 'Automation Excellence', description: 'Eliminates repetitive tasks with intelligent workflow automation.' }
      ],
      executionTitle: 'Project Execution & Analytics',
      executionFeatures: [
        { title: 'Project Automation', description: 'Auto project creation, task templates, and milestones.' },
        { title: 'Task & Resource Management', description: 'Kanban boards, Gantt charts, skill-based allocation.' }
      ],
      liveLink: '#',
      order: projectsList.length + 1,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setIsAddMode(false);
    setModalTab('card');
    setSelectedProject({
      ...proj,
      shortDesc: proj.shortDesc || proj.description || '',
      systemOverviewText: Array.isArray(proj.systemOverview) ? proj.systemOverview.join('\n\n') : proj.systemOverview || '',
      technologiesText: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || '',
      keyFeaturesText: Array.isArray(proj.keyFeatures) ? proj.keyFeatures.join(', ') : proj.keyFeatures || '',
      capabilities: proj.capabilities || [],
      valuePropositions: proj.valuePropositions || [],
      executionFeatures: proj.executionFeatures || []
    });
    setIsModalOpen(true);
  };

  // Array item helper methods
  const handleUpdateItem = (fieldKey, index, key, value) => {
    const list = [...(selectedProject[fieldKey] || [])];
    if (!list[index]) list[index] = {};
    list[index][key] = value;
    setSelectedProject({ ...selectedProject, [fieldKey]: list });
  };

  const handleAddItem = (fieldKey, defaultObj) => {
    const list = [...(selectedProject[fieldKey] || []), defaultObj];
    setSelectedProject({ ...selectedProject, [fieldKey]: list });
  };

  const handleRemoveItem = (fieldKey, index) => {
    const list = (selectedProject[fieldKey] || []).filter((_, i) => i !== index);
    setSelectedProject({ ...selectedProject, [fieldKey]: list });
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!selectedProject.title) return;

    try {
      setSaving(true);
      setMessage(null);

      const payload = {
        ...selectedProject,
        technologies: selectedProject.technologiesText
          ? selectedProject.technologiesText.split(',').map((s) => s.trim()).filter(Boolean)
          : selectedProject.technologies || [],
        keyFeatures: selectedProject.keyFeaturesText
          ? selectedProject.keyFeaturesText.split(',').map((s) => s.trim()).filter(Boolean)
          : selectedProject.keyFeatures || [],
        systemOverview: selectedProject.systemOverviewText
          ? selectedProject.systemOverviewText.split('\n\n').map((s) => s.trim()).filter(Boolean)
          : selectedProject.systemOverview || [selectedProject.fullDesc || selectedProject.shortDesc]
      };

      if (isAddMode) {
        await createProject(payload);
        setMessage({ type: 'success', text: 'Project created successfully.' });
      } else {
        const targetId = selectedProject.id || selectedProject.slug || selectedProject._id;
        await updateProject(targetId, payload);
        setMessage({ type: 'success', text: 'Project updated successfully.' });
      }
      setIsModalOpen(false);
      loadAllData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to save project.' });
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
      await deleteProject(targetId);
      setMessage({ type: 'success', text: 'Project deleted successfully.' });
      setDeleteTarget(null);
      loadAllData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete project.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Portfolio Projects Management...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>🖼️</span> Portfolio Projects & Case Study Detail Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage both the Project Card (listing page) and Case Study Detail Page content (Hero, Modules, Value Propositions, Execution & Analytics) in a single database document.
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
            placeholder="Our Projects"
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

      {/* Projects CRUD Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900">Portfolio Projects & Case Studies ({projectsList.length})</h2>
          <p className="text-xs text-slate-500">Manage case studies, cover images, categories, technologies, modules, value props, and active status.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg shadow transition"
        >
          + Add New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-900 uppercase font-bold border-b border-slate-200">
            <tr>
              <th className="p-3.5">Cover</th>
              <th className="p-3.5">Title / Slug</th>
              <th className="p-3.5">Category / Client</th>
              <th className="p-3.5 text-center">Order</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {projectsList.map((proj) => (
              <tr key={proj.id || proj.slug || proj._id} className="hover:bg-slate-50 transition">
                <td className="p-3.5">
                  <div className="w-14 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-300">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="p-3.5">
                  <p className="font-bold text-slate-900">{proj.title}</p>
                  <p className="text-[11px] text-slate-400 font-mono">/portfolio/{proj.slug}</p>
                </td>
                <td className="p-3.5">
                  <span className="text-[10px] bg-orange-50 text-orange-700 font-bold px-2 py-0.5 rounded border border-orange-200">
                    {proj.category}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{proj.client}</p>
                </td>
                <td className="p-3.5 text-center font-bold text-slate-700">{proj.order || 0}</td>
                <td className="p-3.5 text-center">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      proj.isActive !== false
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {proj.isActive !== false ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] rounded transition shadow-sm"
                  >
                    Edit Card & Detail
                  </button>
                  <button
                    onClick={() => setDeleteTarget(proj)}
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
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-6 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isAddMode ? 'Add New Portfolio Case Study' : `Edit Project: ${selectedProject.title}`}
                </h3>
                <p className="text-[11px] text-slate-500">Manage Card Info, System Hero, Modules, Value Propositions, and Execution Analytics</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex flex-wrap border-b border-slate-200 gap-1 text-xs">
              <button
                type="button"
                onClick={() => setModalTab('card')}
                className={`px-3 py-2 font-bold rounded-t-lg transition border-b-2 ${
                  modalTab === 'card' ? 'border-orange-500 text-orange-600 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                1. Project Card Info
              </button>
              <button
                type="button"
                onClick={() => setModalTab('overview')}
                className={`px-3 py-2 font-bold rounded-t-lg transition border-b-2 ${
                  modalTab === 'overview' ? 'border-orange-500 text-orange-600 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                2. Hero & System Overview
              </button>
              <button
                type="button"
                onClick={() => setModalTab('modules')}
                className={`px-3 py-2 font-bold rounded-t-lg transition border-b-2 ${
                  modalTab === 'modules' ? 'border-orange-500 text-orange-600 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                3. System Modules ({selectedProject.capabilities?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setModalTab('valueProps')}
                className={`px-3 py-2 font-bold rounded-t-lg transition border-b-2 ${
                  modalTab === 'valueProps' ? 'border-orange-500 text-orange-600 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                4. Value Propositions ({selectedProject.valuePropositions?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setModalTab('execution')}
                className={`px-3 py-2 font-bold rounded-t-lg transition border-b-2 ${
                  modalTab === 'execution' ? 'border-orange-500 text-orange-600 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                5. Execution Analytics ({selectedProject.executionFeatures?.length || 0})
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              {/* TAB 1: CARD INFO */}
              {modalTab === 'card' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={selectedProject.title || ''}
                        onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="e.g. HealthConnect System"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Slug URL Identifier</label>
                      <input
                        type="text"
                        value={selectedProject.slug || ''}
                        onChange={(e) => setSelectedProject({ ...selectedProject, slug: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                        placeholder="e.g. healthconnect-system"
                        required
                        disabled={!isAddMode}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={selectedProject.category || ''}
                        onChange={(e) => setSelectedProject({ ...selectedProject, category: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="e.g. Healthcare Tech"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Client Name</label>
                      <input
                        type="text"
                        value={selectedProject.client || ''}
                        onChange={(e) => setSelectedProject({ ...selectedProject, client: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="e.g. HealthConnect Corp"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
                      <input
                        type="text"
                        value={selectedProject.duration || ''}
                        onChange={(e) => setSelectedProject({ ...selectedProject, duration: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="e.g. 6 Months"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Short Description (Card Hover Excerpt)</label>
                    <textarea
                      rows="2"
                      value={selectedProject.shortDesc || selectedProject.description || ''}
                      onChange={(e) => setSelectedProject({ ...selectedProject, shortDesc: e.target.value, description: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                      placeholder="Short summary displayed on project hover..."
                      required
                    />
                  </div>

                  {/* Cover Image */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Project Cover Image</label>
                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300">
                        <img src={selectedProject.image} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-1 w-full">
                        <input
                          type="text"
                          value={selectedProject.image || ''}
                          onChange={(e) => setSelectedProject({ ...selectedProject, image: e.target.value })}
                          className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white"
                        />
                        <label className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded inline-block">
                          {uploading ? 'Uploading...' : 'Replace Image'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleMediaUpload(e, (url) => setSelectedProject({ ...selectedProject, image: url }))}
                            disabled={uploading}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={selectedProject.order || 0}
                        onChange={(e) => setSelectedProject({ ...selectedProject, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                      <select
                        value={selectedProject.isActive !== false ? 'true' : 'false'}
                        onChange={(e) => setSelectedProject({ ...selectedProject, isActive: e.target.value === 'true' })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="true">Active (Visible on Website)</option>
                        <option value="false">Inactive (Hidden from Website)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HERO & SYSTEM OVERVIEW */}
              {modalTab === 'overview' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">System Display Title (e.g. HealthConnect System)</label>
                    <input
                      type="text"
                      value={selectedProject.titleSystem || ''}
                      onChange={(e) => setSelectedProject({ ...selectedProject, titleSystem: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                      placeholder="e.g. HealthConnect System"
                    />
                  </div>

                  {/* Background Media Management for Portfolio Detail Hero */}
                  <AdminHeroMediaControl
                    mediaType={selectedProject.backgroundMediaType || (selectedProject.heroVideo || selectedProject.video ? 'video' : 'image')}
                    imageUrl={selectedProject.heroImage || selectedProject.image || selectedProject.backgroundImage || ''}
                    videoUrl={selectedProject.heroVideo || selectedProject.video || selectedProject.backgroundVideo || ''}
                    onChangeMediaType={(type) => setSelectedProject({ ...selectedProject, backgroundMediaType: type })}
                    onChangeImage={(url) => setSelectedProject({ ...selectedProject, heroImage: url, backgroundImage: url })}
                    onChangeVideo={(url) => setSelectedProject({ ...selectedProject, heroVideo: url, backgroundVideo: url })}
                    uploading={uploading}
                    onUpload={async (file, type) => {
                      if (!file) return;
                      try {
                        setUploading(true);
                        const fileUrl = await uploadHomeMedia(file);
                        if (type === 'video') {
                          setSelectedProject((prev) => ({
                            ...prev,
                            heroVideo: fileUrl,
                            backgroundVideo: fileUrl,
                            backgroundMediaType: 'video'
                          }));
                        } else {
                          setSelectedProject((prev) => ({
                            ...prev,
                            heroImage: fileUrl,
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
                        setSelectedProject({ ...selectedProject, heroVideo: '', video: '', backgroundVideo: '', backgroundMediaType: 'image' });
                      } else {
                        setSelectedProject({ ...selectedProject, heroImage: '', backgroundImage: '' });
                      }
                    }}
                  />

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Description / System Overview (Paragraphs separated by double line breaks)</label>
                    <textarea
                      rows="4"
                      value={selectedProject.systemOverviewText || selectedProject.fullDesc || ''}
                      onChange={(e) => setSelectedProject({ ...selectedProject, systemOverviewText: e.target.value, fullDesc: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-normal"
                      placeholder="Detailed system overview paragraph 1...&#10;&#10;Detailed system overview paragraph 2..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Technologies Used (Comma-separated)</label>
                      <input
                        type="text"
                        value={selectedProject.technologiesText || ''}
                        onChange={(e) => setSelectedProject({ ...selectedProject, technologiesText: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                        placeholder="e.g. Python, PyTorch, React, WebSockets"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Live Demo / Request Demo Link</label>
                      <input
                        type="text"
                        value={selectedProject.liveLink || ''}
                        onChange={(e) => setSelectedProject({ ...selectedProject, liveLink: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Header Video URL (Optional)</label>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-2">
                      <input
                        type="text"
                        value={selectedProject.video || ''}
                        onChange={(e) => setSelectedProject({ ...selectedProject, video: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white font-mono"
                        placeholder="Video URL (optional)"
                      />
                      <label className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded shrink-0">
                        {uploading ? 'Uploading...' : 'Replace Video'}
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleMediaUpload(e, (url) => setSelectedProject({ ...selectedProject, video: url }))}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SYSTEM MODULES */}
              {modalTab === 'modules' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Modules Section Title</label>
                      <input
                        type="text"
                        value={selectedProject.modulesTitle || 'Sales & Delivery Modules'}
                        onChange={(e) => setSelectedProject({ ...selectedProject, modulesTitle: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                        placeholder="Sales & Delivery Modules"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Summary Note</label>
                      <input
                        type="text"
                        value={selectedProject.summaryNote || ''}
                        onChange={(e) => setSelectedProject({ ...selectedProject, summaryNote: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="From lead capture to delivery confirmation..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">System Modules ({selectedProject.capabilities?.length || 0})</h4>
                    <button
                      type="button"
                      onClick={() => handleAddItem('capabilities', { title: 'New System Module', description: 'Module capabilities description...' })}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition"
                    >
                      + Add Module
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(selectedProject.capabilities || []).map((cap, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Module #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem('capabilities', idx)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={cap.title || ''}
                          onChange={(e) => handleUpdateItem('capabilities', idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-bold bg-white"
                          placeholder="Module Title (e.g. Lead & Sales Management)"
                        />
                        <textarea
                          rows="2"
                          value={cap.description || ''}
                          onChange={(e) => handleUpdateItem('capabilities', idx, 'description', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                          placeholder="Module Description..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: VALUE PROPOSITIONS */}
              {modalTab === 'valueProps' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Core Value Propositions ({selectedProject.valuePropositions?.length || 0})</h4>
                    <button
                      type="button"
                      onClick={() => handleAddItem('valuePropositions', { title: 'New Value Proposition', description: 'Value proposition details...' })}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition"
                    >
                      + Add Value Proposition
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(selectedProject.valuePropositions || []).map((val, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Value Prop #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem('valuePropositions', idx)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={val.title || ''}
                          onChange={(e) => handleUpdateItem('valuePropositions', idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-bold bg-white"
                          placeholder="Title (e.g. Unified Data Model)"
                        />
                        <textarea
                          rows="2"
                          value={val.description || ''}
                          onChange={(e) => handleUpdateItem('valuePropositions', idx, 'description', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                          placeholder="Description..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: EXECUTION & ANALYTICS */}
              {modalTab === 'execution' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Execution Section Title</label>
                    <input
                      type="text"
                      value={selectedProject.executionTitle || 'Project Execution & Analytics'}
                      onChange={(e) => setSelectedProject({ ...selectedProject, executionTitle: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                      placeholder="Project Execution & Analytics"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Execution Capabilities ({selectedProject.executionFeatures?.length || 0})</h4>
                    <button
                      type="button"
                      onClick={() => handleAddItem('executionFeatures', { title: 'New Execution Feature', description: 'Execution feature details...' })}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition"
                    >
                      + Add Execution Feature
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(selectedProject.executionFeatures || []).map((feat, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Feature #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem('executionFeatures', idx)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={feat.title || ''}
                          onChange={(e) => handleUpdateItem('executionFeatures', idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-bold bg-white"
                          placeholder="Feature Title (e.g. Project Automation)"
                        />
                        <textarea
                          rows="2"
                          value={feat.description || ''}
                          onChange={(e) => handleUpdateItem('executionFeatures', idx, 'description', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                          placeholder="Feature Description..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                  {saving ? 'Saving...' : isAddMode ? 'Create Project' : 'Save Changes'}
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
            <h3 className="text-lg font-bold text-slate-900">Delete Portfolio Project</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Are you sure you want to delete <strong className="text-slate-900">{deleteTarget.title}</strong>?
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
