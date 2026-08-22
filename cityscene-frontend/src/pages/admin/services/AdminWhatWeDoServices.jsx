import React, { useState, useEffect } from 'react';
import { getHomeSectionContent, updateHomeSectionContent, uploadHomeMedia } from '../../../services/homeContentService';
import { getServices, createService, updateService, deleteService } from '../../../services/serviceService';
import AdminHeroMediaControl from '../../../components/admin/AdminHeroMediaControl';

export default function AdminWhatWeDoServices() {
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  // Modal State & Tab
  const [selectedService, setSelectedService] = useState(null);
  const [modalTab, setModalTab] = useState('card'); // 'card' | 'detail' | 'whyChoose' | 'expertise' | 'process' | 'faqs'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getServices(true);
      if (data) setServicesList(data);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to load service cards.' });
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

  const handleOpenAdd = () => {
    setIsAddMode(true);
    setModalTab('card');
    setSelectedService({
      title: '',
      displayTitle: '',
      id: '',
      path: '',
      shortDesc: '',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      heroDesc: '',
      introP1: '',
      introP2: '',
      whyChooseTitle: 'Why Choose Us?',
      whyChooseSubtitle: 'Empowering organizations with robust software solutions.',
      whyChooseCards: [
        { title: 'Cross-Platform Excellence', desc: 'React Native and Flutter apps with native performance.' },
        { title: 'Secure App Architecture', desc: 'Enterprise-grade security and compliance.' }
      ],
      expertiseTitle: 'Our Expertise',
      expertiseSubtitle: 'Delivering high quality capabilities across domains.',
      expertiseItems: [
        { title: 'iOS App Development', desc: 'Feature-rich apps for iPhone, iPad, and Apple Watch.' },
        { title: 'Android App Development', desc: 'High-performance Android applications.' }
      ],
      processTitle: 'Our App Development Process',
      processSteps: [
        { title: 'Consultation', desc: 'Idea validation and strategy planning.' },
        { title: 'UI / UX Design', desc: 'Modern, intuitive interfaces designed for engagement.' }
      ],
      faqs: [
        { q: 'Do you build both Android and iOS apps?', a: 'Yes, we specialize in both native and cross-platform app development.' },
        { q: 'Do you provide support after the app is launched?', a: 'Yes, we provide ongoing maintenance, support, and feature enhancements.' }
      ],
      video: '',
      position: 'bottom-left',
      order: servicesList.length + 1,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (srv) => {
    setIsAddMode(false);
    setModalTab('card');
    setSelectedService({
      ...srv,
      originalId: srv.id || srv._id,
      whyChooseCards: srv.whyChooseCards || [],
      expertiseItems: srv.expertiseItems || [],
      processSteps: srv.processSteps || [],
      faqs: srv.faqs || []
    });
    setIsModalOpen(true);
  };

  // Helper methods for array item editing
  const handleUpdateItem = (fieldKey, index, key, value) => {
    const list = [...(selectedService[fieldKey] || [])];
    if (!list[index]) list[index] = {};
    list[index][key] = value;
    setSelectedService({ ...selectedService, [fieldKey]: list });
  };

  const handleAddItem = (fieldKey, defaultObj) => {
    const list = [...(selectedService[fieldKey] || []), defaultObj];
    setSelectedService({ ...selectedService, [fieldKey]: list });
  };

  const handleRemoveItem = (fieldKey, index) => {
    const list = (selectedService[fieldKey] || []).filter((_, i) => i !== index);
    setSelectedService({ ...selectedService, [fieldKey]: list });
  };

  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!selectedService.title) return;

    try {
      setSaving(true);
      setMessage(null);

      const payload = {
        ...selectedService,
        displayTitle: selectedService.displayTitle || selectedService.title,
        heroDesc: selectedService.heroDesc || selectedService.shortDesc,
        heroImage: selectedService.heroImage || selectedService.image,
        path: selectedService.path || `/services/${selectedService.id}`
      };

      if (isAddMode) {
        await createService(payload);
        setMessage({ type: 'success', text: 'Service card & detail content created successfully.' });
      } else {
        const targetId = selectedService.originalId || selectedService.id || selectedService._id;
        await updateService(targetId, payload);
        setMessage({ type: 'success', text: 'Service card & detail content updated successfully.' });
      }

      setIsModalOpen(false);
      loadServices();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to save service.' });
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setSaving(true);
      setMessage(null);
      await deleteService(deleteTarget.id || deleteTarget._id);
      setMessage({ type: 'success', text: 'Service deleted successfully.' });
      setDeleteTarget(null);
      loadServices();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete service.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-semibold">Loading Services Management...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span>🛠️</span> WhatWeDoServices Grid & Detail Page Management
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Manage both the Service Card (listing page) and Individual Service Detail Page content (Hero, Why Choose Us, Expertise, Process Steps, FAQs) in a single database document.
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

      {/* Services Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base font-bold text-slate-900">Services Cards & Detail Pages ({servicesList.length})</h2>
          <p className="text-xs text-slate-500">Manage card info, detail hero, intro paragraphs, why choose us, expertise, process, FAQs, and active status.</p>
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
              <th className="p-3.5">Detail Page Link</th>
              <th className="p-3.5 text-center">Order</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {servicesList.map((srv) => (
              <tr key={srv.id || srv._id} className="hover:bg-slate-50 transition">
                <td className="p-3.5">
                  <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-300">
                    <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="p-3.5">
                  <p className="font-bold text-slate-900">{srv.title}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{srv.id}</p>
                </td>
                <td className="p-3.5 font-mono text-slate-600 text-[11px]">
                  /services/{srv.id}
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
                    Edit Card & Detail
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

      {/* CREATE / EDIT SERVICE MODAL */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-6 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isAddMode ? 'Add New Service' : `Edit Service: ${selectedService.title}`}
                </h3>
                <p className="text-[11px] text-slate-500">Manage Card Info, Detail Hero, Why Choose Us, Expertise, Process Steps, and FAQs</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
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
                1. Card Info
              </button>
              <button
                type="button"
                onClick={() => setModalTab('detail')}
                className={`px-3 py-2 font-bold rounded-t-lg transition border-b-2 ${
                  modalTab === 'detail' ? 'border-orange-500 text-orange-600 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                2. Detail Hero & Intro
              </button>
              <button
                type="button"
                onClick={() => setModalTab('whyChoose')}
                className={`px-3 py-2 font-bold rounded-t-lg transition border-b-2 ${
                  modalTab === 'whyChoose' ? 'border-orange-500 text-orange-600 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                3. Why Choose Us ({selectedService.whyChooseCards?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setModalTab('expertise')}
                className={`px-3 py-2 font-bold rounded-t-lg transition border-b-2 ${
                  modalTab === 'expertise' ? 'border-orange-500 text-orange-600 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                4. Expertise ({selectedService.expertiseItems?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setModalTab('process')}
                className={`px-3 py-2 font-bold rounded-t-lg transition border-b-2 ${
                  modalTab === 'process' ? 'border-orange-500 text-orange-600 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                5. Process Steps ({selectedService.processSteps?.length || 0})
              </button>
              <button
                type="button"
                onClick={() => setModalTab('faqs')}
                className={`px-3 py-2 font-bold rounded-t-lg transition border-b-2 ${
                  modalTab === 'faqs' ? 'border-orange-500 text-orange-600 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                6. FAQs ({selectedService.faqs?.length || 0})
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              {/* TAB 1: CARD INFO */}
              {modalTab === 'card' && (
                <div className="space-y-4">
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
                      <label className="block text-xs font-bold text-slate-700 mb-1">Slug ID (URL Route)</label>
                      <input
                        type="text"
                        value={selectedService.id || ''}
                        onChange={(e) => setSelectedService({ ...selectedService, id: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                        placeholder="e.g. mobile-app-development"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Short Description (Card Listing Excerpt)</label>
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">Service Card Cover Image</label>
                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300">
                        <img src={selectedService.image} alt="Service preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-1 w-full">
                        <input
                          type="text"
                          value={selectedService.image || ''}
                          onChange={(e) => setSelectedService({ ...selectedService, image: e.target.value })}
                          className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white"
                        />
                        <label className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded inline-block">
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
                </div>
              )}

              {/* TAB 2: DETAIL HERO & INTRO */}
              {modalTab === 'detail' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Detail Page Display Title</label>
                      <input
                        type="text"
                        value={selectedService.displayTitle || ''}
                        onChange={(e) => setSelectedService({ ...selectedService, displayTitle: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="e.g. Mobile App Development Services"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Detail Hero Description</label>
                    <textarea
                      rows="2"
                      value={selectedService.heroDesc || ''}
                      onChange={(e) => setSelectedService({ ...selectedService, heroDesc: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                      placeholder="Supporting text for detail hero..."
                    />
                  </div>

                  {/* Detail Hero Background Media Management */}
                  <AdminHeroMediaControl
                    mediaType={selectedService.backgroundMediaType || (selectedService.heroVideo || selectedService.backgroundVideo ? 'video' : 'image')}
                    imageUrl={selectedService.heroImage || selectedService.backgroundImage || ''}
                    videoUrl={selectedService.heroVideo || selectedService.backgroundVideo || ''}
                    onChangeMediaType={(type) => setSelectedService({ ...selectedService, backgroundMediaType: type })}
                    onChangeImage={(url) => setSelectedService({ ...selectedService, heroImage: url, backgroundImage: url })}
                    onChangeVideo={(url) => setSelectedService({ ...selectedService, heroVideo: url, backgroundVideo: url })}
                    uploading={uploading}
                    onUpload={async (file, type) => {
                      if (!file) return;
                      try {
                        setUploading(true);
                        const fileUrl = await uploadHomeMedia(file);
                        if (type === 'video') {
                          setSelectedService((prev) => ({
                            ...prev,
                            heroVideo: fileUrl,
                            backgroundVideo: fileUrl,
                            backgroundMediaType: 'video'
                          }));
                        } else {
                          setSelectedService((prev) => ({
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
                        setSelectedService({ ...selectedService, heroVideo: '', backgroundVideo: '', backgroundMediaType: 'image' });
                      } else {
                        setSelectedService({ ...selectedService, heroImage: '', backgroundImage: '' });
                      }
                    }}
                  />

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Introduction Paragraph 1</label>
                    <textarea
                      rows="3"
                      value={selectedService.introP1 || ''}
                      onChange={(e) => setSelectedService({ ...selectedService, introP1: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                      placeholder="Detailed introduction paragraph 1..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Introduction Paragraph 2</label>
                    <textarea
                      rows="3"
                      value={selectedService.introP2 || ''}
                      onChange={(e) => setSelectedService({ ...selectedService, introP2: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                      placeholder="Detailed introduction paragraph 2..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Service Video URL (Optional)</label>
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex items-center gap-2">
                      <input
                        type="text"
                        value={selectedService.video || ''}
                        onChange={(e) => setSelectedService({ ...selectedService, video: e.target.value })}
                        className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded bg-white font-mono"
                        placeholder="Video URL (optional)"
                      />
                      <label className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded shrink-0">
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
              )}

              {/* TAB 3: WHY CHOOSE US CARDS */}
              {modalTab === 'whyChoose' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label>
                      <input
                        type="text"
                        value={selectedService.whyChooseTitle || 'Why Choose Us?'}
                        onChange={(e) => setSelectedService({ ...selectedService, whyChooseTitle: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={selectedService.whyChooseSubtitle || ''}
                        onChange={(e) => setSelectedService({ ...selectedService, whyChooseSubtitle: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="Empowering organizations with robust software solutions."
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Why Choose Us Cards ({selectedService.whyChooseCards?.length || 0})</h4>
                    <button
                      type="button"
                      onClick={() => handleAddItem('whyChooseCards', { title: 'New Advantage', desc: 'Advantage description details...' })}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition"
                    >
                      + Add Card
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(selectedService.whyChooseCards || []).map((card, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Card #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem('whyChooseCards', idx)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={card.title || ''}
                          onChange={(e) => handleUpdateItem('whyChooseCards', idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-bold bg-white"
                          placeholder="Card Title (e.g. Cross-Platform Excellence)"
                        />
                        <textarea
                          rows="2"
                          value={card.desc || ''}
                          onChange={(e) => handleUpdateItem('whyChooseCards', idx, 'desc', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                          placeholder="Card Description..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: EXPERTISE ITEMS */}
              {modalTab === 'expertise' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label>
                      <input
                        type="text"
                        value={selectedService.expertiseTitle || 'Our Expertise'}
                        onChange={(e) => setSelectedService({ ...selectedService, expertiseTitle: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={selectedService.expertiseSubtitle || ''}
                        onChange={(e) => setSelectedService({ ...selectedService, expertiseSubtitle: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                        placeholder="Delivering high quality capabilities across domains."
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Expertise Capabilities ({selectedService.expertiseItems?.length || 0})</h4>
                    <button
                      type="button"
                      onClick={() => handleAddItem('expertiseItems', { title: 'New Expertise Area', desc: 'Capability details...' })}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition"
                    >
                      + Add Expertise Item
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(selectedService.expertiseItems || []).map((item, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Expertise #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem('expertiseItems', idx)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => handleUpdateItem('expertiseItems', idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-bold bg-white"
                          placeholder="Capability Title (e.g. iOS App Development)"
                        />
                        <textarea
                          rows="2"
                          value={item.desc || ''}
                          onChange={(e) => handleUpdateItem('expertiseItems', idx, 'desc', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                          placeholder="Capability Description..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PROCESS STEPS */}
              {modalTab === 'process' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Process Section Title</label>
                    <input
                      type="text"
                      value={selectedService.processTitle || 'Our Development Process'}
                      onChange={(e) => setSelectedService({ ...selectedService, processTitle: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Workflow Steps ({selectedService.processSteps?.length || 0})</h4>
                    <button
                      type="button"
                      onClick={() => handleAddItem('processSteps', { title: 'New Workflow Step', desc: 'Step details...' })}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition"
                    >
                      + Add Process Step
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(selectedService.processSteps || []).map((step, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">Step 0{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem('processSteps', idx)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={step.title || ''}
                          onChange={(e) => handleUpdateItem('processSteps', idx, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-bold bg-white"
                          placeholder="Step Title (e.g. Consultation, Testing & QA)"
                        />
                        <textarea
                          rows="2"
                          value={step.desc || ''}
                          onChange={(e) => handleUpdateItem('processSteps', idx, 'desc', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                          placeholder="Step Description..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: FAQS */}
              {modalTab === 'faqs' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Frequently Asked Questions ({selectedService.faqs?.length || 0})</h4>
                    <button
                      type="button"
                      onClick={() => handleAddItem('faqs', { q: 'Question text here?', a: 'Answer response details...' })}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition"
                    >
                      + Add FAQ
                    </button>
                  </div>

                  <div className="space-y-3">
                    {(selectedService.faqs || []).map((faq, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">FAQ #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem('faqs', idx)}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={faq.q || ''}
                          onChange={(e) => handleUpdateItem('faqs', idx, 'q', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg font-bold bg-white"
                          placeholder="Question (e.g. Do you build both Android and iOS apps?)"
                        />
                        <textarea
                          rows="2"
                          value={faq.a || ''}
                          onChange={(e) => handleUpdateItem('faqs', idx, 'a', e.target.value)}
                          className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                          placeholder="Answer response..."
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
