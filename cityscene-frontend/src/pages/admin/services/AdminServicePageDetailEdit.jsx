import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getServiceById, updateService, deleteService } from '../../../services/serviceService';
import { uploadHomeMedia } from '../../../services/homeContentService';
import { getMediaUrl } from '../../../utils/imageUrl';
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  X,
  Image as ImageIcon,
  Video as VideoIcon,
  Layers,
  Layout,
  HelpCircle,
  CheckCircle2,
  Edit2,
  ExternalLink
} from 'lucide-react';

export default function AdminServicePageDetailEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' | 'cardMedia' | 'intro' | 'whyChoose' | 'expertise' | 'process' | 'faqs' | 'meta'

  const [serviceData, setServiceData] = useState({
    id: id || '',
    title: '',
    displayTitle: '',
    path: `/services/${id}`,
    image: '',
    cardImage: '',
    heroImage: '',
    contentImage: '',
    whyChooseUsBackgroundImage: '',
    whyChooseImage: '',
    video: '',
    heroVideo: '',
    backgroundMediaType: 'image',
    shortDesc: '',
    heroDesc: '',
    introP1: '',
    introP2: '',
    whyChooseTitle: 'Why Choose Us?',
    whyChooseSubtitle: 'Empowering organizations with robust software solutions.',
    whyChooseCards: [],
    expertiseTitle: 'Our Expertise',
    expertiseSubtitle: 'Delivering high quality capabilities across domains.',
    expertiseItems: [],
    processTitle: 'Our App Development Process',
    processSteps: [],
    faqs: [],
    order: 0,
    isActive: true
  });

  // Individual Card Edit Modal States
  const [editingCard, setEditingCard] = useState(null); // { type: 'whyChoose'|'expertise'|'process'|'faq', index: number|null, item: {} }

  useEffect(() => {
    if (id) {
      fetchService();
    }
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const data = await getServiceById(id);
      if (data) {
        setServiceData({
          ...data,
          cardImage: data.cardImage || data.image || '',
          heroImage: data.heroImage || '',
          contentImage: data.contentImage || '',
          whyChooseUsBackgroundImage: data.whyChooseUsBackgroundImage || data.whyChooseImage || '',
          whyChooseCards: Array.isArray(data.whyChooseCards) ? data.whyChooseCards : [],
          expertiseItems: Array.isArray(data.expertiseItems) ? data.expertiseItems : [],
          processSteps: Array.isArray(data.processSteps) ? data.processSteps : [],
          faqs: Array.isArray(data.faqs) ? data.faqs : []
        });
      } else {
        setMessage({ type: 'error', text: `Service Page with ID '${id}' not found.` });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error loading service page details.' });
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e, fieldKey = 'heroImage') => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const fileUrl = await uploadHomeMedia(file);
      setServiceData((prev) => {
        const next = { ...prev, [fieldKey]: fileUrl };
        if (fieldKey === 'cardImage') {
          next.image = fileUrl;
        }
        if (fieldKey === 'whyChooseUsBackgroundImage') {
          next.whyChooseImage = fileUrl;
        }
        return next;
      });
      setMessage({ type: 'success', text: `Media file uploaded successfully for ${fieldKey}.` });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Media upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleSaveAll = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateService(serviceData.id || id, serviceData);
      setMessage({ type: 'success', text: 'Service page updated successfully! Changes are live on the public website.' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.message || 'Failed to update service page.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async () => {
    if (!window.confirm(`Are you sure you want to delete service "${serviceData.title || id}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteService(serviceData.id || id);
      navigate('/admin/services/pages', { replace: true });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete service.' });
    }
  };

  // Card CRUD Actions
  const handleSaveCardModal = () => {
    if (!editingCard) return;
    const { type, index, item } = editingCard;

    if (type === 'whyChoose') {
      const list = [...(serviceData.whyChooseCards || [])];
      if (index !== null) list[index] = item;
      else list.push(item);
      setServiceData({ ...serviceData, whyChooseCards: list });
    } else if (type === 'expertise') {
      const list = [...(serviceData.expertiseItems || [])];
      if (index !== null) list[index] = item;
      else list.push(item);
      setServiceData({ ...serviceData, expertiseItems: list });
    } else if (type === 'process') {
      const list = [...(serviceData.processSteps || [])];
      if (index !== null) list[index] = item;
      else list.push(item);
      setServiceData({ ...serviceData, processSteps: list });
    } else if (type === 'faq') {
      const list = [...(serviceData.faqs || [])];
      if (index !== null) list[index] = item;
      else list.push(item);
      setServiceData({ ...serviceData, faqs: list });
    }

    setEditingCard(null);
  };

  const handleRemoveCard = (type, index) => {
    if (type === 'whyChoose') {
      setServiceData((prev) => ({ ...prev, whyChooseCards: prev.whyChooseCards.filter((_, i) => i !== index) }));
    } else if (type === 'expertise') {
      setServiceData((prev) => ({ ...prev, expertiseItems: prev.expertiseItems.filter((_, i) => i !== index) }));
    } else if (type === 'process') {
      setServiceData((prev) => ({ ...prev, processSteps: prev.processSteps.filter((_, i) => i !== index) }));
    } else if (type === 'faq') {
      setServiceData((prev) => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== index) }));
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold">
        Loading Service Page Details for <span className="font-mono text-slate-900">{id}</span>...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <Link
            to="/admin/services/pages"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-orange-600 transition mb-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Service Detail Pages List
          </Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>⚙️</span> Managing Page: <span className="text-orange-600">{serviceData.displayTitle || serviceData.title || id}</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <span>ID / Slug:</span> <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">{serviceData.id}</code>
            <a
              href={`/services/${serviceData.id}`}
              target="_blank"
              rel="noreferrer"
              className="text-orange-600 hover:underline flex items-center gap-1 text-[11px] font-bold"
            >
              <span>View Public Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDeleteService}
            className="px-3.5 py-2 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Delete Page
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Page Changes'}</span>
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

      {/* Section Navigation Tabs */}
      <div className="flex overflow-x-auto bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm gap-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'hero' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-orange-400" /> Hero Banner
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cardMedia')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'cardMedia' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-teal-400" /> Service Card Image
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('intro')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'intro' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Edit2 className="w-4 h-4 text-blue-400" /> Detail Content & Image
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('whyChoose')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'whyChoose' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layout className="w-4 h-4 text-emerald-400" /> Why Choose Us
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('expertise')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'expertise' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-purple-400" /> Expertise ({serviceData.expertiseItems?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('process')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'process' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" /> Process ({serviceData.processSteps?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('faqs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'faqs' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-rose-400" /> FAQs ({serviceData.faqs?.length || 0})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('meta')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'meta' ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Main Tab Panels */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {/* 1. HERO BANNER TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span>🖼️</span> Hero Banner Image & Media Controls
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Title</label>
                <input
                  type="text"
                  value={serviceData.title || ''}
                  onChange={(e) => setServiceData({ ...serviceData, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                  placeholder="e.g. Custom Software Development"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Display Title (Hero Banner Heading)</label>
                <input
                  type="text"
                  value={serviceData.displayTitle || ''}
                  onChange={(e) => setServiceData({ ...serviceData, displayTitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                  placeholder="e.g. Custom Software Development Services"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hero Banner Description</label>
              <textarea
                rows="3"
                value={serviceData.heroDesc || ''}
                onChange={(e) => setServiceData({ ...serviceData, heroDesc: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                placeholder="Hero banner description displayed under title..."
              />
            </div>

            {/* Media Type Switcher */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Background Media Mode</label>
              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="mediaType"
                    value="image"
                    checked={serviceData.backgroundMediaType !== 'video'}
                    onChange={() => setServiceData({ ...serviceData, backgroundMediaType: 'image' })}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span>Static Image Cover</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="mediaType"
                    value="video"
                    checked={serviceData.backgroundMediaType === 'video'}
                    onChange={() => setServiceData({ ...serviceData, backgroundMediaType: 'video' })}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span>Background Video Loop</span>
                </label>
              </div>
            </div>

            {/* Dedicated Hero Image Control */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">Hero Banner Image (heroImage)</label>
                <span className="text-[11px] text-orange-600 font-semibold">Affects ONLY detail page Hero banner</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="w-44 h-32 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300 relative flex items-center justify-center">
                  {serviceData.heroImage ? (
                    <img
                      src={getMediaUrl(serviceData.heroImage)}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Hero+Image+Not+Found';
                      }}
                    />
                  ) : (
                    <span className="text-slate-400 text-xs">No Hero Image</span>
                  )}
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <input
                    type="text"
                    value={serviceData.heroImage || ''}
                    onChange={(e) => setServiceData({ ...serviceData, heroImage: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                    placeholder="e.g. /uploads/hero-image.jpg"
                  />
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-orange-400" />
                      <span>{uploading ? 'Uploading...' : 'Upload/Replace Hero Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleMediaUpload(e, 'heroImage')}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Control */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Hero Video Loop URL (Optional)</label>
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex-1 space-y-2 w-full">
                  <input
                    type="text"
                    value={serviceData.heroVideo || serviceData.video || ''}
                    onChange={(e) => setServiceData({ ...serviceData, heroVideo: e.target.value, video: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                    placeholder="e.g. /uploads/video.mp4 or https://..."
                  />
                  <label className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1.5">
                    <VideoIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span>{uploading ? 'Uploading...' : 'Upload Video MP4'}</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleMediaUpload(e, 'heroVideo')}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SERVICE CARD MEDIA TAB */}
        {activeTab === 'cardMedia' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span>🃏</span> Service Card Media Controls (cardImage)
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              This image is used ONLY for the service cards displayed on the <strong>/services</strong> page and the <strong>Home Page</strong> "Our Services" section.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Short Description for Cards</label>
              <textarea
                rows="2"
                value={serviceData.shortDesc || ''}
                onChange={(e) => setServiceData({ ...serviceData, shortDesc: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                placeholder="Short summary displayed on service cards..."
              />
            </div>

            {/* Dedicated Card Image Control */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">Service Card Image (cardImage)</label>
                <span className="text-[11px] text-teal-600 font-semibold">Affects ONLY /services & Home cards</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="w-44 h-32 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300 relative flex items-center justify-center">
                  {(serviceData.cardImage || serviceData.image) ? (
                    <img
                      src={getMediaUrl(serviceData.cardImage || serviceData.image)}
                      alt="Card preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Card+Image+Not+Found';
                      }}
                    />
                  ) : (
                    <span className="text-slate-400 text-xs">No Card Image</span>
                  )}
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <input
                    type="text"
                    value={serviceData.cardImage || serviceData.image || ''}
                    onChange={(e) => setServiceData({ ...serviceData, cardImage: e.target.value, image: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                    placeholder="e.g. /uploads/card-image.jpg"
                  />
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-teal-400" />
                      <span>{uploading ? 'Uploading...' : 'Upload/Replace Card Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleMediaUpload(e, 'cardImage')}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. DETAIL CONTENT & IMAGE TAB */}
        {activeTab === 'intro' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span>📝</span> Detail Page Inner Content & Image (contentImage)
            </h2>

            {/* Dedicated Content Image Control */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">Service Detail Content Image (contentImage)</label>
                <span className="text-[11px] text-blue-600 font-semibold">Affects ONLY detail page inner content section</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-44 h-28 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300 relative flex items-center justify-center">
                  {serviceData.contentImage ? (
                    <img
                      src={getMediaUrl(serviceData.contentImage)}
                      alt="Content preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Content+Image+Not+Found';
                      }}
                    />
                  ) : (
                    <span className="text-slate-400 text-xs italic">No Content Image</span>
                  )}
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <input
                    type="text"
                    value={serviceData.contentImage || ''}
                    onChange={(e) => setServiceData({ ...serviceData, contentImage: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                    placeholder="e.g. /uploads/content-image.jpg or https://..."
                  />
                  <label className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span>{uploading ? 'Uploading...' : 'Upload/Replace Content Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleMediaUpload(e, 'contentImage')}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Intro Paragraph 1</label>
              <textarea
                rows="4"
                value={serviceData.introP1 || ''}
                onChange={(e) => setServiceData({ ...serviceData, introP1: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                placeholder="Primary intro paragraph describing the service..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Intro Paragraph 2</label>
              <textarea
                rows="4"
                value={serviceData.introP2 || ''}
                onChange={(e) => setServiceData({ ...serviceData, introP2: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                placeholder="Secondary intro paragraph highlighting value proposition..."
              />
            </div>
          </div>
        )}

        {/* 4. WHY CHOOSE US CARDS TAB */}
        {activeTab === 'whyChoose' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>💡</span> Why Choose Us Section & Background Image
                </h2>
                <p className="text-xs text-slate-500">Manage section background image, titles, and individual feature cards.</p>
              </div>

              <button
                type="button"
                onClick={() => setEditingCard({ type: 'whyChoose', index: null, item: { title: '', desc: '', icon: '' } })}
                className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Card
              </button>
            </div>

            {/* Why Choose Us Dedicated Background Image Control */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">Why Choose Us Background Image (whyChooseUsBackgroundImage)</label>
                <span className="text-[11px] text-emerald-600 font-semibold">Affects ONLY Why Choose Us background</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-44 h-24 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300 relative flex items-center justify-center">
                  {(serviceData.whyChooseUsBackgroundImage || serviceData.whyChooseImage) ? (
                    <img
                      src={getMediaUrl(serviceData.whyChooseUsBackgroundImage || serviceData.whyChooseImage)}
                      alt="Why Choose Us Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Bg+Image+Not+Found';
                      }}
                    />
                  ) : (
                    <span className="text-slate-400 text-xs font-medium">No Background Image</span>
                  )}
                </div>
                <div className="flex-1 space-y-2 w-full">
                  <input
                    type="text"
                    value={serviceData.whyChooseUsBackgroundImage || serviceData.whyChooseImage || ''}
                    onChange={(e) => setServiceData({ ...serviceData, whyChooseUsBackgroundImage: e.target.value, whyChooseImage: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                    placeholder="e.g. /uploads/why-choose-bg.jpg or https://..."
                  />
                  <label className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{uploading ? 'Uploading...' : 'Upload/Replace Section Background'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleMediaUpload(e, 'whyChooseUsBackgroundImage')}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={serviceData.whyChooseTitle || ''}
                  onChange={(e) => setServiceData({ ...serviceData, whyChooseTitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                  placeholder="e.g. Why Choose Us?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Section Subtitle</label>
                <input
                  type="text"
                  value={serviceData.whyChooseSubtitle || ''}
                  onChange={(e) => setServiceData({ ...serviceData, whyChooseSubtitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  placeholder="e.g. Empowering organizations with robust software solutions."
                />
              </div>
            </div>

            {/* Cards List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {(serviceData.whyChooseCards || []).map((card, idx) => (
                <div
                  key={idx}
                  onClick={() => setEditingCard({ type: 'whyChoose', index: idx, item: { ...card } })}
                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-orange-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3 group relative"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-700">
                        Card #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCard('whyChoose', idx);
                        }}
                        className="text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition">
                      {card.title || 'Untitled Card'}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {card.desc || 'No description.'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-end text-xs font-bold text-orange-600">
                    <span>Edit Card →</span>
                  </div>
                </div>
              ))}
            </div>

            {(!serviceData.whyChooseCards || serviceData.whyChooseCards.length === 0) && (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400 text-xs italic">
                No Why Choose Us cards added yet. Click "+ Add Card" above to create one.
              </div>
            )}
          </div>
        )}

        {/* 4. EXPERTISE CARDS TAB */}
        {activeTab === 'expertise' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>⭐</span> Our Expertise Section Cards ({serviceData.expertiseItems?.length || 0})
                </h2>
                <p className="text-xs text-slate-500">Manage capabilities and expertise cards displayed on page.</p>
              </div>

              <button
                type="button"
                onClick={() => setEditingCard({ type: 'expertise', index: null, item: { title: '', desc: '' } })}
                className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Expertise Card
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={serviceData.expertiseTitle || ''}
                  onChange={(e) => setServiceData({ ...serviceData, expertiseTitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                  placeholder="e.g. Our Expertise"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Section Subtitle</label>
                <input
                  type="text"
                  value={serviceData.expertiseSubtitle || ''}
                  onChange={(e) => setServiceData({ ...serviceData, expertiseSubtitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                  placeholder="e.g. Delivering high quality capabilities across domains."
                />
              </div>
            </div>

            {/* Expertise Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {(serviceData.expertiseItems || []).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setEditingCard({ type: 'expertise', index: idx, item: { ...item } })}
                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold bg-slate-200 px-2 py-0.5 rounded text-slate-700">
                        Item #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCard('expertise', idx);
                        }}
                        className="text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-600 transition">
                      {item.title || 'Untitled Capability'}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.desc || 'No description.'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-end text-xs font-bold text-purple-600">
                    <span>Edit Capability →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. PROCESS STEPS TAB */}
        {activeTab === 'process' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>🔄</span> Process Steps Section ({serviceData.processSteps?.length || 0})
                </h2>
                <p className="text-xs text-slate-500">Manage step-by-step engineering workflows.</p>
              </div>

              <button
                type="button"
                onClick={() => setEditingCard({ type: 'process', index: null, item: { title: '', desc: '' } })}
                className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Process Step
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Process Section Title</label>
              <input
                type="text"
                value={serviceData.processTitle || ''}
                onChange={(e) => setServiceData({ ...serviceData, processTitle: e.target.value })}
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                placeholder="e.g. Our App Development Process"
              />
            </div>

            {/* Process Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {(serviceData.processSteps || []).map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setEditingCard({ type: 'process', index: idx, item: { ...step } })}
                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-amber-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black text-amber-500 font-mono">
                        0{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCard('process', idx);
                        }}
                        className="text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition">
                      {step.title || 'Untitled Step'}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {step.desc || 'No step description.'}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-end text-xs font-bold text-amber-600">
                    <span>Edit Step →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. FAQS TAB */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>❓</span> FAQ Q&A Items ({serviceData.faqs?.length || 0})
                </h2>
                <p className="text-xs text-slate-500">Manage questions and answers displayed at the bottom of the page.</p>
              </div>

              <button
                type="button"
                onClick={() => setEditingCard({ type: 'faq', index: null, item: { q: '', a: '' } })}
                className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add FAQ Q&A
              </button>
            </div>

            {/* FAQs List */}
            <div className="space-y-3">
              {(serviceData.faqs || []).map((faq, idx) => (
                <div
                  key={idx}
                  onClick={() => setEditingCard({ type: 'faq', index: idx, item: { ...faq } })}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-rose-500 hover:shadow transition cursor-pointer flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1 flex-1">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition flex items-center gap-2">
                      <span className="text-rose-500">Q{idx + 1}:</span> {faq.q || 'Untitled Question'}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {faq.a || 'No answer provided.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveCard('faq', idx);
                    }}
                    className="text-slate-400 hover:text-red-600 transition p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. META SETTINGS TAB */}
        {activeTab === 'meta' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span>⚙️</span> Page Meta & Visibility Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Service Identifier / ID</label>
                <input
                  type="text"
                  value={serviceData.id || ''}
                  disabled
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg bg-slate-100 font-mono text-slate-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Path</label>
                <input
                  type="text"
                  value={serviceData.path || `/services/${serviceData.id}`}
                  onChange={(e) => setServiceData({ ...serviceData, path: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                  placeholder="/services/mobile-app-development"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Display Order Index</label>
                <input
                  type="number"
                  value={serviceData.order ?? 0}
                  onChange={(e) => setServiceData({ ...serviceData, order: parseInt(e.target.value, 10) || 0 })}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={!!serviceData.isActive}
                  onChange={(e) => setServiceData({ ...serviceData, isActive: e.target.checked })}
                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <label htmlFor="isActiveToggle" className="text-sm font-bold text-slate-800 cursor-pointer">
                  Active / Published on Public Website
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CARD EDIT MODAL */}
      {editingCard && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                {editingCard.index !== null ? 'Edit' : 'Add'} {editingCard.type.toUpperCase()} Card
              </h2>
              <button
                onClick={() => setEditingCard(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {editingCard.type === 'faq' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Question</label>
                    <input
                      type="text"
                      value={editingCard.item.q || ''}
                      onChange={(e) => setEditingCard({ ...editingCard, item: { ...editingCard.item, q: e.target.value } })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                      placeholder="e.g. Do you build both Android and iOS apps?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Answer</label>
                    <textarea
                      rows="4"
                      value={editingCard.item.a || ''}
                      onChange={(e) => setEditingCard({ ...editingCard, item: { ...editingCard.item, a: e.target.value } })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                      placeholder="Detailed answer text..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={editingCard.item.title || ''}
                      onChange={(e) => setEditingCard({ ...editingCard, item: { ...editingCard.item, title: e.target.value } })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
                      placeholder="e.g. Cross-Platform Excellence"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows="3"
                      value={editingCard.item.desc || ''}
                      onChange={(e) => setEditingCard({ ...editingCard, item: { ...editingCard.item, desc: e.target.value } })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
                      placeholder="Card description text..."
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingCard(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveCardModal}
                className="px-6 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow"
              >
                Save Card Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
