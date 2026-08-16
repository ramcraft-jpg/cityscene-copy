import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import { getServices, createService, updateService, deleteService } from '../../../services/serviceService';

export default function AdminServicesManagement() {
  const [activeTab, setActiveTab] = useState('cards'); // 'cards' | 'hero' | 'empowering'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  // Hero Section State
  const [heroData, setHeroData] = useState({
    subheading: 'WHAT WE DO',
    title: 'Professional Services Tailored for You',
    description: 'Helping businesses innovate and grow in the digital age.',
    buttonText: "Let's Talk",
    buttonLink: '/contact',
    bgImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1920&q=80',
    bgVideo: ''
  });

  // Empowering Section State
  const [empoweringData, setEmpoweringData] = useState({
    heading: 'Empowering Businesses with Innovation',
    description: 'At CityScene Global, we help businesses thrive through cutting-edge solutions. Our services empower companies to achieve sustainable growth, enhance customer experiences, and stay ahead in the digital era.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80'
  });

  // Services CRUD State
  const [servicesList, setServicesList] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [heroContent, empoweringContent, servicesData] = await Promise.all([
        getHomeSectionContent('whatwedo-hero').catch(() => null),
        getHomeSectionContent('whatwedo-innovation').catch(() => null),
        getServices(true).catch(() => [])
      ]);

      if (heroContent && heroContent.title) setHeroData(heroContent);
      if (empoweringContent && empoweringContent.heading) setEmpoweringData(empoweringContent);
      if (servicesData) setServicesList(servicesData);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load What We Do management data.' });
    } finally {
      setLoading(false);
    }
  };

  // Upload handler helper
  const handleMediaUpload = async (event, onSuccess) => {
    const file = event.target.files[0];
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

  // Hero Submit
  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('whatwedo-hero', heroData);
      setMessage({ type: 'success', text: 'What We Do Hero section updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update Hero section.' });
    } finally {
      setSaving(false);
    }
  };

  // Empowering Submit
  const handleEmpoweringSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateHomeSectionContent('whatwedo-innovation', empoweringData);
      setMessage({ type: 'success', text: 'Empowering Businesses section updated successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update section.' });
    } finally {
      setSaving(false);
    }
  };

  // Open Modal for Add
  const handleOpenAdd = () => {
    setIsAddMode(true);
    setSelectedService({
      title: '',
      displayTitle: '',
      id: '',
      shortDesc: '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      video: '',
      position: 'bottom-left',
      order: servicesList.length + 1,
      isActive: true,
      path: ''
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (srv) => {
    setIsAddMode(false);
    setSelectedService({ ...srv });
    setIsModalOpen(true);
  };

  // Save Service (Create or Update)
  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!selectedService.title) return;

    try {
      setSaving(true);
      setMessage(null);

      if (isAddMode) {
        await createService(selectedService);
        setMessage({ type: 'success', text: 'Service created successfully.' });
      } else {
        await updateService(selectedService.id || selectedService._id, selectedService);
        setMessage({ type: 'success', text: 'Service updated successfully.' });
      }

      setIsModalOpen(false);
      const updatedList = await getServices(true);
      setServicesList(updatedList);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to save service.' });
    } finally {
      setSaving(false);
    }
  };

  // Delete Service
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setSaving(true);
      setMessage(null);
      await deleteService(deleteTarget.id || deleteTarget._id);
      setMessage({ type: 'success', text: 'Service deleted successfully.' });
      setDeleteTarget(null);
      const updatedList = await getServices(true);
      setServicesList(updatedList);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete service.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading What We Do Management...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">WHAT WE DO / SERVICES MANAGEMENT</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage the complete content, hero banner, innovation spotlight, and service cards for the public What We Do page.
          </p>
        </div>
      </div>

      {/* Message Banner */}
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

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('cards')}
          className={`px-5 py-2.5 text-xs font-bold rounded-t-xl transition border-b-2 ${
            activeTab === 'cards'
              ? 'border-orange-500 text-orange-600 bg-white shadow-sm'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          ⚡ Service Cards Grid ({servicesList.length})
        </button>
        <button
          onClick={() => setActiveTab('hero')}
          className={`px-5 py-2.5 text-xs font-bold rounded-t-xl transition border-b-2 ${
            activeTab === 'hero'
              ? 'border-orange-500 text-orange-600 bg-white shadow-sm'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          🖼️ Hero Section
        </button>
        <button
          onClick={() => setActiveTab('empowering')}
          className={`px-5 py-2.5 text-xs font-bold rounded-t-xl transition border-b-2 ${
            activeTab === 'empowering'
              ? 'border-orange-500 text-orange-600 bg-white shadow-sm'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          🚀 Empowering Businesses Section
        </button>
      </div>

      {/* TAB 1: SERVICE CARDS MANAGEMENT */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-base font-bold text-slate-900">Services List ({servicesList.length})</h2>
              <p className="text-xs text-slate-500">Manage service cards, ordering, descriptions, images and active status.</p>
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-lg shadow transition"
            >
              + Add New Service
            </button>
          </div>

          {/* Services Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-900 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Image</th>
                  <th className="p-3.5">Title / Slug</th>
                  <th className="p-3.5">Position</th>
                  <th className="p-3.5 text-center">Order</th>
                  <th className="p-3.5 text-center">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {servicesList.map((srv) => (
                  <tr key={srv.id || srv._id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5">
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-200 border border-slate-300">
                        <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-slate-900">{srv.title}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{srv.id}</p>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-200">
                        {srv.position || 'bottom-left'}
                      </span>
                    </td>
                    <td className="p-3.5 text-center font-bold text-slate-700">{srv.order || 0}</td>
                    <td className="p-3.5 text-center">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          srv.isActive !== false
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {srv.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(srv)}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[11px] rounded transition shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteTarget(srv)}
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
        </div>
      )}

      {/* TAB 2: HERO MANAGEMENT */}
      {activeTab === 'hero' && (
        <form onSubmit={handleHeroSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">What We Do Hero Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Small Subheading</label>
              <input
                type="text"
                value={heroData.subheading || ''}
                onChange={(e) => setHeroData({ ...heroData, subheading: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                placeholder="WHAT WE DO"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Main Heading</label>
              <input
                type="text"
                value={heroData.title || ''}
                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                placeholder="Professional Services Tailored for You"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
            <textarea
              rows="3"
              value={heroData.description || ''}
              onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              placeholder="Helping businesses innovate..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Text</label>
              <input
                type="text"
                value={heroData.buttonText || ''}
                onChange={(e) => setHeroData({ ...heroData, buttonText: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Link</label>
              <input
                type="text"
                value={heroData.buttonLink || ''}
                onChange={(e) => setHeroData({ ...heroData, buttonLink: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Background Image */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Background Image</label>
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="w-36 h-20 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                <img src={heroData.bgImage} alt="Hero BG Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2 w-full">
                <input
                  type="text"
                  value={heroData.bgImage || ''}
                  onChange={(e) => setHeroData({ ...heroData, bgImage: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                />
                <label className="cursor-pointer px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition inline-block">
                  {uploading ? 'Uploading...' : 'Replace Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleMediaUpload(e, (url) => setHeroData({ ...heroData, bgImage: url }))}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Background Video */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Background Video (Optional)</label>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={heroData.bgVideo || ''}
                  onChange={(e) => setHeroData({ ...heroData, bgVideo: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                  placeholder="Video URL (optional)"
                />
                <label className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition shrink-0">
                  {uploading ? 'Uploading...' : 'Replace Video'}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleMediaUpload(e, (url) => setHeroData({ ...heroData, bgVideo: url }))}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition"
            >
              {saving ? 'Saving...' : 'Save Hero Changes'}
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: EMPOWERING SECTION MANAGEMENT */}
      {activeTab === 'empowering' && (
        <form onSubmit={handleEmpoweringSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Empowering Businesses Section Settings</h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Section Heading</label>
            <input
              type="text"
              value={empoweringData.heading || ''}
              onChange={(e) => setEmpoweringData({ ...empoweringData, heading: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
            <textarea
              rows="4"
              value={empoweringData.description || ''}
              onChange={(e) => setEmpoweringData({ ...empoweringData, description: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Section Image</label>
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="w-40 h-24 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                <img src={empoweringData.image} alt="Empowering Section Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2 w-full">
                <input
                  type="text"
                  value={empoweringData.image || ''}
                  onChange={(e) => setEmpoweringData({ ...empoweringData, image: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                />
                <label className="cursor-pointer px-3.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition inline-block">
                  {uploading ? 'Uploading...' : 'Replace Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleMediaUpload(e, (url) => setEmpoweringData({ ...empoweringData, image: url }))}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg transition"
            >
              {saving ? 'Saving...' : 'Save Section Changes'}
            </button>
          </div>
        </form>
      )}

      {/* CREATE / EDIT SERVICE MODAL */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 space-y-6 p-6 border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {isAddMode ? 'Add New Service' : `Edit Service: ${selectedService.title}`}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Title</label>
                  <input
                    type="text"
                    value={selectedService.title || ''}
                    onChange={(e) => setSelectedService({ ...selectedService, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                    placeholder="e.g. Mobile App Development"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Slug ID</label>
                  <input
                    type="text"
                    value={selectedService.id || ''}
                    onChange={(e) => setSelectedService({ ...selectedService, id: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                    placeholder="e.g. mobile-app-development"
                    required
                    disabled={!isAddMode}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Display Title</label>
                  <input
                    type="text"
                    value={selectedService.displayTitle || ''}
                    onChange={(e) => setSelectedService({ ...selectedService, displayTitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                    placeholder="e.g. Mobile App Development Services"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Text Position</label>
                  <select
                    value={selectedService.position || 'bottom-left'}
                    onChange={(e) => setSelectedService({ ...selectedService, position: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="bottom-left">bottom-left</option>
                    <option value="top-left">top-left</option>
                    <option value="bottom-right">bottom-right</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows="3"
                  value={selectedService.shortDesc || ''}
                  onChange={(e) => setSelectedService({ ...selectedService, shortDesc: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  placeholder="Short description for service cards..."
                  required
                />
              </div>

              {/* Service Card Image */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Card Image</label>
                <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                    <img src={selectedService.image} alt="Service preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1 w-full">
                    <input
                      type="text"
                      value={selectedService.image || ''}
                      onChange={(e) => setSelectedService({ ...selectedService, image: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white"
                    />
                    <label className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded inline-block">
                      {uploading ? 'Uploading...' : 'Replace Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleMediaUpload(e, (url) => setSelectedService({ ...selectedService, image: url }))}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Service Video */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Video (Optional)</label>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={selectedService.video || ''}
                      onChange={(e) => setSelectedService({ ...selectedService, video: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded bg-white font-mono"
                      placeholder="Video URL (optional)"
                    />
                    <label className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded shrink-0">
                      {uploading ? 'Uploading...' : 'Replace Video'}
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleMediaUpload(e, (url) => setSelectedService({ ...selectedService, video: url }))}
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
                    value={selectedService.order || 0}
                    onChange={(e) => setSelectedService({ ...selectedService, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={selectedService.isActive !== false ? 'true' : 'false'}
                    onChange={(e) => setSelectedService({ ...selectedService, isActive: e.target.value === 'true' })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="true">Active (Visible on Website)</option>
                    <option value="false">Inactive (Hidden from Website)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow transition"
                >
                  {saving ? 'Saving...' : isAddMode ? 'Create Service' : 'Save Changes'}
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
            <h3 className="text-lg font-bold text-slate-900">Delete Service</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Are you sure you want to delete <strong className="text-slate-900">{deleteTarget.title}</strong>? This will remove the service from MongoDB and the public website.
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
