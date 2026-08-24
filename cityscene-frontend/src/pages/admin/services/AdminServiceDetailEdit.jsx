import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getServiceById, updateService, deleteService } from '../../../services/serviceService';
import { uploadHomeMedia } from '../../../services/homeContentService';
import { getMediaUrl } from '../../../utils/imageUrl';
import { ArrowLeft, Save, Trash2, Plus, X, Image as ImageIcon } from 'lucide-react';

export default function AdminServiceDetailEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const [serviceData, setServiceData] = useState({
    id: id || '',
    title: '',
    displayTitle: '',
    path: `/services/${id}`,
    image: '',
    shortDesc: '',
    heroDesc: '',
    features: [],
    order: 0,
    isActive: true
  });

  const [newFeatureText, setNewFeatureText] = useState('');

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
          features: Array.isArray(data.features) ? data.features : []
        });
      } else {
        setMessage({ type: 'error', text: `Service with ID '${id}' not found.` });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error loading service details.' });
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const fileUrl = await uploadHomeMedia(file);
      setServiceData((prev) => ({ ...prev, image: fileUrl }));
      setMessage({ type: 'success', text: 'Service image uploaded successfully.' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Image upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setServiceData((prev) => ({
      ...prev,
      features: [...(prev.features || []), newFeatureText.trim()]
    }));
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index) => {
    setServiceData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== index)
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage(null);
      await updateService(serviceData.id || id, serviceData);
      setMessage({ type: 'success', text: 'Service updated successfully! Changes are live on the public website.' });
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: err.message || 'Failed to update service.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${serviceData.title || id}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteService(serviceData.id || id);
      navigate('/admin/services/grid', { replace: true });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to delete service.' });
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold">
        Loading Service Details for <span className="font-mono text-slate-900">{id}</span>...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <Link
            to="/admin/services/grid"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-orange-600 transition mb-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Services
          </Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>⚙️</span> Edit Service: <span className="text-orange-600">{serviceData.title || id}</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Editing unique service data for ID: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-800">{serviceData.id}</code>
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
        {/* Basic Meta Fields */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Service Title (Card Heading)</label>
            <input
              type="text"
              value={serviceData.title || ''}
              onChange={(e) => setServiceData({ ...serviceData, title: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
              placeholder="e.g. Mobile App Development"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Display Title (Hero Page Banner)</label>
            <input
              type="text"
              value={serviceData.displayTitle || ''}
              onChange={(e) => setServiceData({ ...serviceData, displayTitle: e.target.value })}
              className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg font-bold"
              placeholder="e.g. Mobile App Development Services"
            />
          </div>
        </div>

        {/* Cover Image Upload & URL */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Service Cover Image / Icon</label>
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="w-40 h-28 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-300 relative flex items-center justify-center">
              {serviceData.image ? (
                <img
                  src={getMediaUrl(serviceData.image)}
                  alt="Service preview"
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
                value={serviceData.image || ''}
                onChange={(e) => setServiceData({ ...serviceData, image: e.target.value })}
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white font-mono"
                placeholder="e.g. /uploads/image.jpg or https://..."
              />
              <label className="cursor-pointer px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition inline-flex items-center gap-1.5">
                <span>📷</span>
                <span>{uploading ? 'Uploading...' : 'Replace Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMediaUpload}
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
            value={serviceData.shortDesc || ''}
            onChange={(e) => setServiceData({ ...serviceData, shortDesc: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            placeholder="Brief overview displayed on card grid..."
            required
          />
        </div>

        {/* Full Hero Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Full Description (Detail Page Banner)</label>
          <textarea
            rows="4"
            value={serviceData.heroDesc || ''}
            onChange={(e) => setServiceData({ ...serviceData, heroDesc: e.target.value })}
            className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg"
            placeholder="Detailed overview shown on individual service page..."
          />
        </div>

        {/* Key Features List */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Key Features / Offerings</label>
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                placeholder="Add a new feature (e.g. Cross-Platform iOS & Android Apps)..."
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {(serviceData.features || []).map((feat, idx) => (
                <li key={idx} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800">
                  <span>• {feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-slate-400 hover:text-red-600 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </li>
              ))}
              {(!serviceData.features || serviceData.features.length === 0) && (
                <p className="text-xs text-slate-400 italic">No features added yet.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Display Order & Active Checkbox */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
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
              id="isActive"
              checked={!!serviceData.isActive}
              onChange={(e) => setServiceData({ ...serviceData, isActive: e.target.checked })}
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
            to="/admin/services/grid"
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
            {saving ? 'Saving Service Changes...' : 'Save Service Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
